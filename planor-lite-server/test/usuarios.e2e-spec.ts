import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request, { Response } from 'supertest';
import type { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

interface RespuestaJson {
  [clave: string]: unknown;
}

function esRespuestaJson(
  valorDesconocido: unknown,
): valorDesconocido is RespuestaJson {
  return (
    typeof valorDesconocido === 'object' &&
    valorDesconocido !== null &&
    !Array.isArray(valorDesconocido)
  );
}

function obtenerRespuestaJson(respuestaHttp: Response): RespuestaJson {
  const cuerpoDesconocido: unknown = JSON.parse(respuestaHttp.text);

  if (!esRespuestaJson(cuerpoDesconocido)) {
    throw new Error('La respuesta HTTP no contiene un objeto JSON válido');
  }

  return cuerpoDesconocido;
}

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

function esperarMilisegundos(cantidadMilisegundos: number): Promise<void> {
  return new Promise((resolverPromesa) => {
    setTimeout(resolverPromesa, cantidadMilisegundos);
  });
}

describe('Usuarios (e2e)', () => {
  let aplicacion: INestApplication<App>;
  let correoUsuarioPrueba: string;
  let tokenSesionInicial: string;
  let tokenSesionParaEliminacion: string;
  let identificadorUsuarioPrueba: number;

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

  afterAll(async (): Promise<void> => {
    await aplicacion.close();
  });

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

  it('debe rechazar el acceso al perfil sin JWT y con JWT inválido', async (): Promise<void> => {
    await request(aplicacion.getHttpServer())
      .get('/api/v1/usuarios/perfil')
      .expect(401);

    await request(aplicacion.getHttpServer())
      .get('/api/v1/usuarios/perfil')
      .set('Authorization', 'Bearer token-invalido')
      .expect(401);
  });

  it('debe completar el flujo funcional de usuarios', async (): Promise<void> => {
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

    await request(aplicacion.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        email: correoUsuarioPrueba,
        contrasena: 'ContrasenaIncorrecta2026!',
      })
      .expect(401);

    const respuestaLogin: Response = await request(aplicacion.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        email: correoUsuarioPrueba,
        contrasena: 'Planor2026!',
      })
      .expect(201);

    const cuerpoLogin: RespuestaJson = obtenerRespuestaJson(respuestaLogin);
    tokenSesionInicial = obtenerCadenaDeRespuesta(cuerpoLogin, 'token');

    expect(obtenerCadenaDeRespuesta(cuerpoLogin, 'email')).toBe(
      correoUsuarioPrueba,
    );
    expect(obtenerNumeroDeRespuesta(cuerpoLogin, 'idUsuario')).toBe(
      identificadorUsuarioPrueba,
    );
    expect(
      Object.prototype.hasOwnProperty.call(cuerpoLogin, 'contrasena'),
    ).toBe(false);

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

    await request(aplicacion.getHttpServer())
      .post('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${tokenSesionInicial}`)
      .expect(201);

    await request(aplicacion.getHttpServer())
      .get('/api/v1/usuarios/perfil')
      .set('Authorization', `Bearer ${tokenSesionInicial}`)
      .expect(401);

    await esperarMilisegundos(1100);

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

    await esperarMilisegundos(1100);

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

    await request(aplicacion.getHttpServer())
      .get('/api/v1/usuarios/perfil')
      .set('Authorization', `Bearer ${tokenSesionRecuperada}`)
      .expect(200);
  });
});
