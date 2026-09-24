// INestApplication representa la aplicación NestJS creada para ejecutar pruebas de integración. ValidationPipe aplica en las pruebas las mismas validaciones globales que usa la aplicación real.
import { INestApplication, ValidationPipe } from '@nestjs/common';
// Test y TestingModule permiten crear una instancia de AppModule sin iniciar el servidor manualmente.
import { Test, TestingModule } from '@nestjs/testing';
// Supertest envía solicitudes HTTP a la aplicación de prueba y Response tipa las respuestas recibidas.
import request, { Response } from 'supertest';
// App representa el tipo del servidor HTTP que Supertest necesita para ejecutar las solicitudes.
import type { App } from 'supertest/types';
// AppModule reúne los módulos reales de Planor que serán evaluados en esta prueba.
import { AppModule } from '../src/app.module';

// Esta interfaz representa un objeto JSON cuya estructura se valida antes de usar sus propiedades. Se utiliza unknown para evitar asumir que una respuesta externa tiene un tipo seguro.
interface RespuestaJson {
  [clave: string]: unknown;
}

// Verifica que un valor desconocido sea un objeto JSON válido y no un arreglo ni un valor nulo.
function esRespuestaJson(
  valorDesconocido: unknown,
): valorDesconocido is RespuestaJson {
  return (
    typeof valorDesconocido === 'object' &&
    valorDesconocido !== null &&
    !Array.isArray(valorDesconocido)
  );
}

// Convierte el texto de una respuesta HTTP en un objeto JSON validado.
// Si la API devuelve una respuesta distinta a un objeto JSON, la prueba finaliza con un error claro.
function obtenerRespuestaJson(respuestaHttp: Response): RespuestaJson {
  const cuerpoDesconocido: unknown = JSON.parse(respuestaHttp.text);

  if (!esRespuestaJson(cuerpoDesconocido)) {
    throw new Error('La respuesta HTTP no contiene un objeto JSON válido');
  }

  return cuerpoDesconocido;
}

// Obtiene una propiedad de texto desde la respuesta validada.
// Este método evita acceder a valores desconocidos sin comprobar primero su tipo.
function obtenerCadenaDeRespuesta(
  respuestaJson: RespuestaJson,
  nombrePropiedad: string,
): string {
  const valorRespuesta: unknown = respuestaJson[nombrePropiedad];

  if (typeof valorRespuesta !== 'string') {
    throw new Error(`La propiedad ${nombrePropiedad} no es una cadena`);
  }

  return valorRespuesta;
}

// Obtiene una propiedad numérica desde la respuesta validada.
// Se usa, por ejemplo, para validar el identificador del usuario creado.
function obtenerNumeroDeRespuesta(
  respuestaJson: RespuestaJson,
  nombrePropiedad: string,
): number {
  const valorRespuesta: unknown = respuestaJson[nombrePropiedad];

  if (typeof valorRespuesta !== 'number') {
    throw new Error(`La propiedad ${nombrePropiedad} no es un número`);
  }

  return valorRespuesta;
}

// Espera una cantidad controlada de milisegundos durante la prueba.
// El JWT actual usa una precisión de segundos; esta espera evita reutilizar un token generado en el mismo segundo.
function esperarMilisegundos(cantidadMilisegundos: number): Promise<void> {
  return new Promise((resolverPromesa) => {
    setTimeout(resolverPromesa, cantidadMilisegundos);
  });
}

// Agrupa todas las pruebas de integración relacionadas con el módulo Usuarios.
// "e2e" significa end-to-end: se evalúa el recorrido desde la solicitud HTTP hasta la base de datos.
describe('Usuarios (e2e)', () => {
  // Instancia de la aplicación NestJS que Supertest utilizará para enviar solicitudes HTTP.
  let aplicacion: INestApplication<App>;
  // Datos que se comparten entre las pruebas del flujo funcional completo.
  let correoUsuarioPrueba: string;
  let tokenSesionInicial: string;
  let tokenSesionParaEliminacion: string;
  let identificadorUsuarioPrueba: number;

  // Se ejecuta una sola vez antes de todos los casos de prueba de Usuarios.
  // Crea la aplicación con los módulos reales y configura el mismo prefijo y validaciones del entorno normal.
  beforeAll(async (): Promise<void> => {
    process.env.NODE_ENV = 'test';

    const moduloDePrueba: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    aplicacion = moduloDePrueba.createNestApplication();
    aplicacion.setGlobalPrefix('api/v1');
    aplicacion.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await aplicacion.init();

    const marcaTemporal: number = Date.now();
    correoUsuarioPrueba = `prueba.usuarios.${marcaTemporal}@example.com`;
    tokenSesionInicial = '';
    tokenSesionParaEliminacion = '';
    identificadorUsuarioPrueba = 0;
  });

  // Se ejecuta una sola vez al finalizar todas las pruebas.
  // Cierra las conexiones abiertas por NestJS para que Jest finalice correctamente.
  afterAll(async (): Promise<void> => {
    await aplicacion.close();
  });

  // Comprueba que el DTO de registro rechace datos con formato inválido antes de crear un usuario.
  it('debe rechazar un registro con datos inválidos', async (): Promise<void> => {
    await request(aplicacion.getHttpServer())
      .post('/api/v1/usuarios')
      .send({
        nombreUsuario: 'Prueba',
        apellidoUsuario: 'Planor',
        email: 'correo-no-valido',
        contrasena: 'Planor2026!',
        confirmarContrasena: 'Planor2026!',
      })
      .expect(400);
  });

  // Comprueba que una ruta privada no pueda ser consultada sin token o con un token que no es válido.
  it('debe rechazar el acceso al perfil sin JWT y con JWT inválido', async (): Promise<void> => {
    await request(aplicacion.getHttpServer())
      .get('/api/v1/usuarios/perfil')
      .expect(401);

    await request(aplicacion.getHttpServer())
      .get('/api/v1/usuarios/perfil')
      .set('Authorization', 'Bearer token-invalido')
      .expect(401);

    // El listado heredado de usuarios queda reservado para administradores.
    await request(aplicacion.getHttpServer())
      .get('/api/v1/usuarios')
      .expect(401);
  });

  // Ejecuta el flujo completo del módulo Usuarios.
  // Un solo recorrido permite comprobar varios requisitos relacionados sin crear pruebas redundantes.
  it('debe completar el flujo funcional de usuarios', async (): Promise<void> => {
    // RF-USU-01: registra un usuario de prueba con un correo único.
    const respuestaRegistro: Response = await request(
      aplicacion.getHttpServer(),
    )
      .post('/api/v1/usuarios')
      .send({
        nombreUsuario: 'Prueba',
        apellidoUsuario: 'Planor',
        email: correoUsuarioPrueba,
        contrasena: 'Planor2026!',
        confirmarContrasena: 'Planor2026!',
      })
      .expect(201);

    const cuerpoRegistro: RespuestaJson =
      obtenerRespuestaJson(respuestaRegistro);
    identificadorUsuarioPrueba = obtenerNumeroDeRespuesta(
      cuerpoRegistro,
      'idUsuario',
    );

    expect(obtenerCadenaDeRespuesta(cuerpoRegistro, 'email')).toBe(
      correoUsuarioPrueba,
    );
    expect(
      Object.prototype.hasOwnProperty.call(cuerpoRegistro, 'contrasena'),
    ).toBe(false);

    // RF-USU-01: confirma que no se puede registrar dos veces el mismo correo.
    await request(aplicacion.getHttpServer())
      .post('/api/v1/usuarios')
      .send({
        nombreUsuario: 'Prueba',
        apellidoUsuario: 'Planor',
        email: correoUsuarioPrueba,
        contrasena: 'Planor2026!',
        confirmarContrasena: 'Planor2026!',
      })
      .expect(400);

    // RF-USU-03: comprueba que una contraseña incorrecta no permite iniciar sesión.
    await request(aplicacion.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        email: correoUsuarioPrueba,
        contrasena: 'ContrasenaIncorrecta2026!',
      })
      .expect(401);

    // RF-USU-03: inicia sesión con credenciales válidas y obtiene el JWT para las rutas protegidas.
    const respuestaLogin: Response = await request(aplicacion.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        email: correoUsuarioPrueba,
        contrasena: 'Planor2026!',
      })
      .expect(201);

    const cuerpoLogin: RespuestaJson = obtenerRespuestaJson(respuestaLogin);
    tokenSesionInicial = obtenerCadenaDeRespuesta(cuerpoLogin, 'token');

    // Una cuenta con rol usuario no puede consultar la lista general de usuarios.
    await request(aplicacion.getHttpServer())
      .get('/api/v1/usuarios')
      .set('Authorization', `Bearer ${tokenSesionInicial}`)
      .expect(403);

    expect(obtenerCadenaDeRespuesta(cuerpoLogin, 'email')).toBe(
      correoUsuarioPrueba,
    );
    expect(obtenerNumeroDeRespuesta(cuerpoLogin, 'idUsuario')).toBe(
      identificadorUsuarioPrueba,
    );
    expect(
      Object.prototype.hasOwnProperty.call(cuerpoLogin, 'contrasena'),
    ).toBe(false);

    // RF-USU-06: consulta el perfil usando el token emitido durante el inicio de sesión.
    const respuestaPerfil: Response = await request(aplicacion.getHttpServer())
      .get('/api/v1/usuarios/perfil')
      .set('Authorization', `Bearer ${tokenSesionInicial}`)
      .expect(200);

    const cuerpoPerfil: RespuestaJson = obtenerRespuestaJson(respuestaPerfil);

    expect(obtenerCadenaDeRespuesta(cuerpoPerfil, 'email')).toBe(
      correoUsuarioPrueba,
    );
    expect(
      Object.prototype.hasOwnProperty.call(cuerpoPerfil, 'contrasena'),
    ).toBe(false);

    // RF-USU-07: actualiza únicamente los datos permitidos del perfil propio.
    const respuestaActualizacion: Response = await request(
      aplicacion.getHttpServer(),
    )
      .patch('/api/v1/usuarios/me')
      .set('Authorization', `Bearer ${tokenSesionInicial}`)
      .send({
        nombreUsuario: 'UsuarioPrueba',
        apellidoUsuario: 'Actualizado',
      })
      .expect(200);

    const cuerpoActualizacion: RespuestaJson = obtenerRespuestaJson(
      respuestaActualizacion,
    );

    expect(obtenerCadenaDeRespuesta(cuerpoActualizacion, 'nombreUsuario')).toBe(
      'UsuarioPrueba',
    );
    expect(
      obtenerCadenaDeRespuesta(cuerpoActualizacion, 'apellidoUsuario'),
    ).toBe('Actualizado');

    // RF-USU-04: cierra la sesión e invalida el token actual en la base de datos.
    await request(aplicacion.getHttpServer())
      .post('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${tokenSesionInicial}`)
      .expect(201);

    await request(aplicacion.getHttpServer())
      .get('/api/v1/usuarios/perfil')
      .set('Authorization', `Bearer ${tokenSesionInicial}`)
      .expect(401);

    // Se espera para obtener un JWT diferente al token que ya fue invalidado mediante logout.
    await esperarMilisegundos(1100);

    // Se inicia una nueva sesión para ejecutar la eliminación lógica con credenciales válidas.
    const respuestaLoginParaEliminacion: Response = await request(
      aplicacion.getHttpServer(),
    )
      .post('/api/v1/auth/login')
      .send({
        email: correoUsuarioPrueba,
        contrasena: 'Planor2026!',
      })
      .expect(201);

    const cuerpoLoginParaEliminacion: RespuestaJson = obtenerRespuestaJson(
      respuestaLoginParaEliminacion,
    );
    tokenSesionParaEliminacion = obtenerCadenaDeRespuesta(
      cuerpoLoginParaEliminacion,
      'token',
    );

    // RF-USU-09: elimina lógicamente el perfil usando la contraseña actual.
    await request(aplicacion.getHttpServer())
      .delete('/api/v1/usuarios/eliminar')
      .set('Authorization', `Bearer ${tokenSesionParaEliminacion}`)
      .send({
        contrasenaActual: 'Planor2026!',
      })
      .expect(200);

    await request(aplicacion.getHttpServer())
      .get('/api/v1/usuarios/perfil')
      .set('Authorization', `Bearer ${tokenSesionParaEliminacion}`)
      .expect(401);

    // Se espera antes de recuperar la cuenta para obtener un JWT nuevo.
    await esperarMilisegundos(1100);

    // RF-USU-09: inicia sesión con una cuenta eliminada para reactivarla de forma lógica.
    const respuestaRecuperacionSesion: Response = await request(
      aplicacion.getHttpServer(),
    )
      .post('/api/v1/auth/login')
      .send({
        email: correoUsuarioPrueba,
        contrasena: 'Planor2026!',
      })
      .expect(201);

    const cuerpoRecuperacionSesion: RespuestaJson = obtenerRespuestaJson(
      respuestaRecuperacionSesion,
    );
    const tokenSesionRecuperada: string = obtenerCadenaDeRespuesta(
      cuerpoRecuperacionSesion,
      'token',
    );

    // Confirma que la cuenta recuperada vuelve a tener acceso al perfil privado.
    await request(aplicacion.getHttpServer())
      .get('/api/v1/usuarios/perfil')
      .set('Authorization', `Bearer ${tokenSesionRecuperada}`)
      .expect(200);
  });
});
