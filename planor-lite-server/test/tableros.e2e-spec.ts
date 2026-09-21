import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request, { Response } from 'supertest';
import type { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

// Representa una respuesta JSON cuya estructura se valida antes de usarla.
interface RespuestaJson {
  [clave: string]: unknown;
}

// Comprueba que un dato recibido desde la API sea un objeto JSON válido.
function esRespuestaJson(
  valorDesconocido: unknown,
): valorDesconocido is RespuestaJson {
  return (
    typeof valorDesconocido === 'object' &&
    valorDesconocido !== null &&
    !Array.isArray(valorDesconocido)
  );
}

// Convierte el texto de una respuesta HTTP en un objeto JSON seguro.
function obtenerRespuestaJson(respuestaHttp: Response): RespuestaJson {
  const cuerpoDesconocido: unknown = JSON.parse(respuestaHttp.text);

  if (!esRespuestaJson(cuerpoDesconocido)) {
    throw new Error('La respuesta HTTP no contiene un objeto JSON válido');
  }

  return cuerpoDesconocido;
}

// Convierte el texto de una respuesta HTTP en una lista JSON segura.
function obtenerListaJson(respuestaHttp: Response): unknown[] {
  const cuerpoDesconocido: unknown = JSON.parse(respuestaHttp.text);

  if (!Array.isArray(cuerpoDesconocido)) {
    throw new Error('La respuesta HTTP no contiene una lista JSON válida');
  }

  return cuerpoDesconocido;
}

// Obtiene una propiedad de texto después de comprobar que sea string.
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

// Obtiene una propiedad numérica después de comprobar que sea number.
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

// Permite comprobar si un tablero aparece o desaparece de una lista.
function listaIncluyeIdentificador(
  listaDeRespuestas: unknown[],
  identificadorEsperado: number,
): boolean {
  for (const elementoDesconocido of listaDeRespuestas) {
    if (esRespuestaJson(elementoDesconocido)) {
      const identificadorActual: unknown = elementoDesconocido.idTablero;

      if (identificadorActual === identificadorEsperado) {
        return true;
      }
    }
  }

  return false;
}

// Extrae los nombres de los estados para validar los cuatro estados automáticos.
function obtenerNombresDeEstados(listaDeEstados: unknown[]): string[] {
  const nombresDeEstados: string[] = [];

  for (const estadoDesconocido of listaDeEstados) {
    if (!esRespuestaJson(estadoDesconocido)) {
      throw new Error('Un estado no contiene un objeto JSON válido');
    }

    nombresDeEstados.push(
      obtenerCadenaDeRespuesta(estadoDesconocido, 'nombreEstado'),
    );
  }

  return nombresDeEstados;
}

// Pruebas de integración: recorren API, servicios y base de datos de pruebas.
describe('Tableros (e2e)', () => {
  // Aplicación NestJS a la que Supertest envía solicitudes HTTP.
  let aplicacion: INestApplication<App>;
  // Se usan dos usuarios para comprobar que los tableros son privados.
  let tokenUsuarioPropietario: string;
  let tokenUsuarioSecundario: string;
  let correoUsuarioPropietario: string;
  let correoUsuarioSecundario: string;
  let identificadorTableroPropietario: number;
  let identificadorTableroSecundario: number;

  // Prepara la aplicación y crea dos usuarios temporales con correos únicos.
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

    // La marca de tiempo evita que dos ejecuciones usen el mismo correo.
    const marcaTemporal: number = Date.now();
    correoUsuarioPropietario = `tableros.propietario.${marcaTemporal}@example.com`;
    correoUsuarioSecundario = `tableros.secundario.${marcaTemporal}@example.com`;
    tokenUsuarioPropietario = await crearUsuarioYObtenerToken(
      aplicacion,
      correoUsuarioPropietario,
    );
    tokenUsuarioSecundario = await crearUsuarioYObtenerToken(
      aplicacion,
      correoUsuarioSecundario,
    );
    identificadorTableroPropietario = 0;
    identificadorTableroSecundario = 0;
  });

  // Limpia los datos de prueba para no dejar usuarios o tableros activos.
  afterAll(async (): Promise<void> => {
    if (identificadorTableroPropietario > 0) {
      await request(aplicacion.getHttpServer())
        .delete(`/api/v1/tableros/${identificadorTableroPropietario}`)
        .set('Authorization', `Bearer ${tokenUsuarioPropietario}`);
    }

    if (identificadorTableroSecundario > 0) {
      await request(aplicacion.getHttpServer())
        .delete(`/api/v1/tableros/${identificadorTableroSecundario}`)
        .set('Authorization', `Bearer ${tokenUsuarioSecundario}`);
    }

    await eliminarUsuarioPrueba(
      aplicacion,
      tokenUsuarioPropietario,
      'Planor2026!',
    );
    await eliminarUsuarioPrueba(
      aplicacion,
      tokenUsuarioSecundario,
      'Planor2026!',
    );
    await aplicacion.close();
  });

  // Verifica autenticación y validaciones antes de crear información.
  it('debe rechazar la creación sin JWT y con datos no permitidos', async (): Promise<void> => {
    await request(aplicacion.getHttpServer())
      .post('/api/v1/tableros')
      .send({ nombreTablero: 'Tablero sin sesión' })
      .expect(401);

    await request(aplicacion.getHttpServer())
      .post('/api/v1/tableros')
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .send({
        nombreTablero: 'Tablero con estados manuales',
        estados: [],
      })
      .expect(400);

    // El requisito permite 1000 caracteres; esta descripción contiene 1001.
    const descripcionExcesiva: string = 'a'.repeat(1001);

    await request(aplicacion.getHttpServer())
      .post('/api/v1/tableros')
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .send({
        nombreTablero: 'Tablero con descripción inválida',
        descripcionTablero: descripcionExcesiva,
      })
      .expect(400);
  });

  // Valida el flujo exitoso: crear, evitar duplicados y consultar el tablero propio.
  it('debe crear y consultar un tablero propio con cuatro estados iniciales', async (): Promise<void> => {
    const respuestaCreacion: Response = await request(
      aplicacion.getHttpServer(),
    )
      .post('/api/v1/tableros')
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .send({
        nombreTablero: 'Tablero de pruebas',
        descripcionTablero: 'Tablero creado por una prueba automatizada.',
      })
      .expect(201);

    const cuerpoCreacion: RespuestaJson =
      obtenerRespuestaJson(respuestaCreacion);
    identificadorTableroPropietario = obtenerNumeroDeRespuesta(
      cuerpoCreacion,
      'idTablero',
    );
    expect(obtenerCadenaDeRespuesta(cuerpoCreacion, 'nombreTablero')).toBe(
      'Tablero de pruebas',
    );

    await request(aplicacion.getHttpServer())
      .post('/api/v1/tableros')
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .send({ nombreTablero: 'Tablero de pruebas' })
      .expect(400);

    const respuestaEstados: Response = await request(aplicacion.getHttpServer())
      .get(`/api/v1/estados/${identificadorTableroPropietario}`)
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .expect(200);

    const listaDeEstados: unknown[] = obtenerListaJson(respuestaEstados);
    const nombresDeEstados: string[] = obtenerNombresDeEstados(listaDeEstados);

    expect(nombresDeEstados).toEqual([
      'Pendiente',
      'En_ejecucion',
      'Terminado',
      'Aprobado',
    ]);

    const respuestaListaPropia: Response = await request(
      aplicacion.getHttpServer(),
    )
      .get('/api/v1/tableros/usuario')
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .expect(200);

    expect(
      listaIncluyeIdentificador(
        obtenerListaJson(respuestaListaPropia),
        identificadorTableroPropietario,
      ),
    ).toBe(true);

    await request(aplicacion.getHttpServer())
      .get(`/api/v1/tableros/${identificadorTableroPropietario}`)
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .expect(200);
  });

  // El usuario secundario no debe acceder a los recursos del propietario.
  it('debe impedir que otro usuario consulte, edite o elimine un tablero ajeno', async (): Promise<void> => {
    const respuestaCreacionSecundaria: Response = await request(
      aplicacion.getHttpServer(),
    )
      .post('/api/v1/tableros')
      .set('Authorization', `Bearer ${tokenUsuarioSecundario}`)
      .send({ nombreTablero: 'Tablero secundario' })
      .expect(201);

    const cuerpoCreacionSecundaria: RespuestaJson = obtenerRespuestaJson(
      respuestaCreacionSecundaria,
    );
    identificadorTableroSecundario = obtenerNumeroDeRespuesta(
      cuerpoCreacionSecundaria,
      'idTablero',
    );

    await request(aplicacion.getHttpServer())
      .get(`/api/v1/tableros/${identificadorTableroPropietario}`)
      .set('Authorization', `Bearer ${tokenUsuarioSecundario}`)
      .expect(403);

    await request(aplicacion.getHttpServer())
      .patch(`/api/v1/tableros/${identificadorTableroPropietario}`)
      .set('Authorization', `Bearer ${tokenUsuarioSecundario}`)
      .send({ nombreTablero: 'Intento no autorizado' })
      .expect(403);

    await request(aplicacion.getHttpServer())
      .delete(`/api/v1/tableros/${identificadorTableroPropietario}`)
      .set('Authorization', `Bearer ${tokenUsuarioSecundario}`)
      .expect(403);

    const respuestaEdicion: Response = await request(aplicacion.getHttpServer())
      .patch(`/api/v1/tableros/${identificadorTableroPropietario}`)
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .send({
        nombreTablero: 'Tablero actualizado',
        descripcionTablero: 'Descripción actualizada.',
      })
      .expect(200);

    const cuerpoEdicion: RespuestaJson = obtenerRespuestaJson(respuestaEdicion);
    expect(obtenerCadenaDeRespuesta(cuerpoEdicion, 'nombreTablero')).toBe(
      'Tablero actualizado',
    );

    await request(aplicacion.getHttpServer())
      .delete(`/api/v1/tableros/${identificadorTableroPropietario}`)
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .expect(200);

    const respuestaListaPosterior: Response = await request(
      aplicacion.getHttpServer(),
    )
      .get('/api/v1/tableros/usuario')
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .expect(200);

    expect(
      listaIncluyeIdentificador(
        obtenerListaJson(respuestaListaPosterior),
        identificadorTableroPropietario,
      ),
    ).toBe(false);
  });
});

// Registra un usuario temporal e inicia sesión para obtener su JWT.
async function crearUsuarioYObtenerToken(
  aplicacion: INestApplication<App>,
  correoUsuarioPrueba: string,
): Promise<string> {
  await request(aplicacion.getHttpServer())
    .post('/api/v1/usuarios')
    .send({
      nombreUsuario: 'Prueba',
      apellidoUsuario: 'Tableros',
      email: correoUsuarioPrueba,
      contrasena: 'Planor2026!',
      confirmarContrasena: 'Planor2026!',
    })
    .expect(201);

  const respuestaLogin: Response = await request(aplicacion.getHttpServer())
    .post('/api/v1/auth/login')
    .send({
      email: correoUsuarioPrueba,
      contrasena: 'Planor2026!',
    })
    .expect(201);

  return obtenerCadenaDeRespuesta(
    obtenerRespuestaJson(respuestaLogin),
    'token',
  );
}

// Elimina lógicamente un usuario temporal con el endpoint real de Usuarios.
async function eliminarUsuarioPrueba(
  aplicacion: INestApplication<App>,
  tokenUsuarioPrueba: string,
  contrasenaUsuarioPrueba: string,
): Promise<void> {
  await request(aplicacion.getHttpServer())
    .delete('/api/v1/usuarios/eliminar')
    .set('Authorization', `Bearer ${tokenUsuarioPrueba}`)
    .send({ contrasenaActual: contrasenaUsuarioPrueba })
    .expect(200);
}
