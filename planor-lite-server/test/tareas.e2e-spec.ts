import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request, { Response } from 'supertest';
import type { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

// Objeto JSON validado antes de utilizar sus propiedades.
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

function obtenerListaJson(respuestaHttp: Response): unknown[] {
  const cuerpoDesconocido: unknown = JSON.parse(respuestaHttp.text);

  if (!Array.isArray(cuerpoDesconocido)) {
    throw new Error('La respuesta HTTP no contiene una lista JSON válida');
  }

  return cuerpoDesconocido;
}

function obtenerNumero(
  respuestaJson: RespuestaJson,
  propiedad: string,
): number {
  const valorDesconocido: unknown = respuestaJson[propiedad];

  if (typeof valorDesconocido !== 'number') {
    throw new Error(`La propiedad ${propiedad} no es numérica`);
  }

  return valorDesconocido;
}

function obtenerCadena(
  respuestaJson: RespuestaJson,
  propiedad: string,
): string {
  const valorDesconocido: unknown = respuestaJson[propiedad];

  if (typeof valorDesconocido !== 'string') {
    throw new Error(`La propiedad ${propiedad} no es texto`);
  }

  return valorDesconocido;
}

function buscarIdentificadorEstado(
  listaEstados: unknown[],
  nombreEstadoEsperado: string,
): number {
  for (const estadoDesconocido of listaEstados) {
    if (esRespuestaJson(estadoDesconocido)) {
      const nombreEstado: string = obtenerCadena(
        estadoDesconocido,
        'nombreEstado',
      );

      if (nombreEstado === nombreEstadoEsperado) {
        return obtenerNumero(estadoDesconocido, 'idEstadoKanban');
      }
    }
  }

  throw new Error(`No se encontró el estado ${nombreEstadoEsperado}`);
}

// Estas pruebas recorren el flujo completo desde HTTP hasta la base de datos.
describe('Tareas (e2e)', () => {
  let aplicacion: INestApplication<App>;
  let tokenUsuarioPropietario: string;
  let tokenUsuarioSecundario: string;
  let identificadorTableroPropietario: number;
  let identificadorTableroSecundario: number;
  let identificadorEstadoPendiente: number;
  let identificadorEstadoEnEjecucion: number;
  let identificadorTareaUno: number;
  let identificadorTareaDos: number;
  let identificadorTareaTres: number;

  // Prepara dos usuarios y un tablero para cada uno.
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
    tokenUsuarioPropietario = await crearUsuarioYObtenerToken(
      aplicacion,
      `tareas.propietario.${marcaTemporal}@example.com`,
    );
    tokenUsuarioSecundario = await crearUsuarioYObtenerToken(
      aplicacion,
      `tareas.secundario.${marcaTemporal}@example.com`,
    );

    identificadorTableroPropietario = await crearTableroYObtenerIdentificador(
      aplicacion,
      tokenUsuarioPropietario,
      'Tablero de tareas propietario',
    );
    identificadorTableroSecundario = await crearTableroYObtenerIdentificador(
      aplicacion,
      tokenUsuarioSecundario,
      'Tablero de tareas secundario',
    );

    const respuestaEstados: Response = await request(aplicacion.getHttpServer())
      .get(`/api/v1/estados/${identificadorTableroPropietario}`)
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .expect(200);

    const listaEstados: unknown[] = obtenerListaJson(respuestaEstados);
    identificadorEstadoPendiente = buscarIdentificadorEstado(
      listaEstados,
      'Pendiente',
    );
    identificadorEstadoEnEjecucion = buscarIdentificadorEstado(
      listaEstados,
      'En_ejecucion',
    );
    identificadorTareaUno = 0;
    identificadorTareaDos = 0;
    identificadorTareaTres = 0;
  });

  // Elimina lógicamente los tableros y usuarios temporales al finalizar.
  afterAll(async (): Promise<void> => {
    await eliminarTableroYUsuarioPrueba(
      aplicacion,
      tokenUsuarioPropietario,
      identificadorTableroPropietario,
    );
    await eliminarTableroYUsuarioPrueba(
      aplicacion,
      tokenUsuarioSecundario,
      identificadorTableroSecundario,
    );
    await aplicacion.close();
  });

  // Comprueba JWT, prioridad y fecha de vencimiento antes de crear tareas.
  it('debe rechazar la creación sin JWT y con datos inválidos', async (): Promise<void> => {
    await request(aplicacion.getHttpServer())
      .post(`/api/v1/tareas/${identificadorTableroPropietario}`)
      .send({
        idEstadoKanban: identificadorEstadoPendiente,
        titulo: 'Tarea sin sesión',
      })
      .expect(401);

    await request(aplicacion.getHttpServer())
      .post(`/api/v1/tareas/${identificadorTableroPropietario}`)
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .send({
        idEstadoKanban: identificadorEstadoPendiente,
        titulo: 'Tarea con prioridad inválida',
        prioridad: 'Urgente',
      })
      .expect(400);

    await request(aplicacion.getHttpServer())
      .post(`/api/v1/tareas/${identificadorTableroPropietario}`)
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .send({
        idEstadoKanban: identificadorEstadoPendiente,
        titulo: 'Tarea con fecha vencida',
        fechaVencimientoTarea: '2020-01-01T00:00:00.000Z',
      })
      .expect(400);
  });

  // Crea tareas, verifica orden automático y evita títulos repetidos en todo el tablero.
  it('debe crear tareas y consultar tareas por estado y por tablero', async (): Promise<void> => {
    const respuestaTareaUno: Response = await crearTarea(
      aplicacion,
      tokenUsuarioPropietario,
      identificadorTableroPropietario,
      identificadorEstadoPendiente,
      'Preparar presentación',
    );
    const cuerpoTareaUno: RespuestaJson =
      obtenerRespuestaJson(respuestaTareaUno);
    identificadorTareaUno = obtenerNumero(cuerpoTareaUno, 'idTarea');
    expect(obtenerNumero(cuerpoTareaUno, 'ordenEnEstado')).toBe(1);

    const respuestaTareaDos: Response = await crearTarea(
      aplicacion,
      tokenUsuarioPropietario,
      identificadorTableroPropietario,
      identificadorEstadoPendiente,
      'Revisar requisitos',
    );
    const cuerpoTareaDos: RespuestaJson =
      obtenerRespuestaJson(respuestaTareaDos);
    identificadorTareaDos = obtenerNumero(cuerpoTareaDos, 'idTarea');
    expect(obtenerNumero(cuerpoTareaDos, 'ordenEnEstado')).toBe(2);

    await request(aplicacion.getHttpServer())
      .post(`/api/v1/tareas/${identificadorTableroPropietario}`)
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .send({
        idEstadoKanban: identificadorEstadoPendiente,
        titulo: 'Preparar presentación',
      })
      .expect(409);

    await request(aplicacion.getHttpServer())
      .post(`/api/v1/tareas/${identificadorTableroPropietario}`)
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .send({
        idEstadoKanban: identificadorEstadoEnEjecucion,
        titulo: 'Preparar presentación',
      })
      .expect(409);

    const respuestaTareaTres: Response = await crearTarea(
      aplicacion,
      tokenUsuarioPropietario,
      identificadorTableroPropietario,
      identificadorEstadoEnEjecucion,
      'Ejecutar presentación',
    );
    const cuerpoTareaTres: RespuestaJson =
      obtenerRespuestaJson(respuestaTareaTres);
    identificadorTareaTres = obtenerNumero(cuerpoTareaTres, 'idTarea');

    const respuestaTareasPorEstado: Response = await request(
      aplicacion.getHttpServer(),
    )
      .get(`/api/v1/tareas/estado/${identificadorEstadoPendiente}`)
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .expect(200);

    const tareasPorEstado: unknown[] = obtenerListaJson(
      respuestaTareasPorEstado,
    );
    expect(tareasPorEstado).toHaveLength(2);

    const primeraTareaPorEstado = tareasPorEstado[0];
    if (!esRespuestaJson(primeraTareaPorEstado)) {
      throw new Error('La tarea consultada no tiene estructura JSON válida');
    }
    expect(obtenerNumero(primeraTareaPorEstado, 'ordenEnEstado')).toBe(1);

    const respuestaTareasPorTablero: Response = await request(
      aplicacion.getHttpServer(),
    )
      .get(`/api/v1/tareas/tablero/${identificadorTableroPropietario}`)
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .expect(200);

    expect(obtenerListaJson(respuestaTareasPorTablero)).toHaveLength(3);
  });

  // Verifica detalle, edición, movimiento, reordenamiento, eliminación y aislamiento.
  it('debe administrar únicamente tareas propias', async (): Promise<void> => {
    await request(aplicacion.getHttpServer())
      .get(`/api/v1/tareas/${identificadorTareaUno}`)
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .expect(200);

    await request(aplicacion.getHttpServer())
      .get(`/api/v1/tareas/${identificadorTareaUno}`)
      .set('Authorization', `Bearer ${tokenUsuarioSecundario}`)
      .expect(404);

    await request(aplicacion.getHttpServer())
      .patch(`/api/v1/tareas/${identificadorTareaUno}`)
      .set('Authorization', `Bearer ${tokenUsuarioSecundario}`)
      .send({ titulo: 'Edición no autorizada' })
      .expect(404);

    await request(aplicacion.getHttpServer())
      .delete(`/api/v1/tareas/${identificadorTareaUno}`)
      .set('Authorization', `Bearer ${tokenUsuarioSecundario}`)
      .expect(404);

    const respuestaEdicion: Response = await request(aplicacion.getHttpServer())
      .patch(`/api/v1/tareas/${identificadorTareaUno}`)
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .send({
        descripcion: 'Descripción actualizada.',
        prioridad: 'Alta',
      })
      .expect(200);

    const cuerpoEdicion: RespuestaJson = obtenerRespuestaJson(respuestaEdicion);
    expect(obtenerCadena(cuerpoEdicion, 'descripcion')).toBe(
      'Descripción actualizada.',
    );

    const respuestaMovimiento: Response = await request(
      aplicacion.getHttpServer(),
    )
      .patch(`/api/v1/tareas/${identificadorTareaDos}/mover`)
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .send({
        idEstadoKanban: identificadorEstadoEnEjecucion,
        ordenEnEstado: 1,
      })
      .expect(200);

    const cuerpoMovimiento: RespuestaJson =
      obtenerRespuestaJson(respuestaMovimiento);
    const estadoMovimiento: unknown = cuerpoMovimiento.estado;
    if (!esRespuestaJson(estadoMovimiento)) {
      throw new Error('La tarea movida no contiene estado válido');
    }
    expect(obtenerNumero(estadoMovimiento, 'idEstadoKanban')).toBe(
      identificadorEstadoEnEjecucion,
    );

    const respuestaReordenamiento: Response = await request(
      aplicacion.getHttpServer(),
    )
      .patch(`/api/v1/tareas/${identificadorTareaTres}/reordenar`)
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .send({ ordenEnEstado: 1 })
      .expect(200);

    expect(
      obtenerNumero(
        obtenerRespuestaJson(respuestaReordenamiento),
        'ordenEnEstado',
      ),
    ).toBe(1);

    await request(aplicacion.getHttpServer())
      .delete(`/api/v1/tareas/${identificadorTareaUno}`)
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .expect(200);

    await request(aplicacion.getHttpServer())
      .get(`/api/v1/tareas/${identificadorTareaUno}`)
      .set('Authorization', `Bearer ${tokenUsuarioPropietario}`)
      .expect(404);
  });
});

// Crea un usuario temporal y devuelve el token JWT de su sesión.
async function crearUsuarioYObtenerToken(
  aplicacion: INestApplication<App>,
  correoUsuarioPrueba: string,
): Promise<string> {
  await request(aplicacion.getHttpServer())
    .post('/api/v1/usuarios')
    .send({
      nombreUsuario: 'Prueba',
      apellidoUsuario: 'Tareas',
      email: correoUsuarioPrueba,
      contrasena: 'Planor2026!',
      confirmarContrasena: 'Planor2026!',
    })
    .expect(201);

  const respuestaLogin: Response = await request(aplicacion.getHttpServer())
    .post('/api/v1/auth/login')
    .send({ email: correoUsuarioPrueba, contrasena: 'Planor2026!' })
    .expect(201);

  return obtenerCadena(obtenerRespuestaJson(respuestaLogin), 'token');
}

// Crea un tablero para obtener estados Kanban independientes por usuario.
async function crearTableroYObtenerIdentificador(
  aplicacion: INestApplication<App>,
  tokenUsuario: string,
  nombreTablero: string,
): Promise<number> {
  const respuestaTablero: Response = await request(aplicacion.getHttpServer())
    .post('/api/v1/tableros')
    .set('Authorization', `Bearer ${tokenUsuario}`)
    .send({ nombreTablero })
    .expect(201);

  return obtenerNumero(obtenerRespuestaJson(respuestaTablero), 'idTablero');
}

// Envía una tarea válida; los casos inválidos se prueban directamente arriba.
async function crearTarea(
  aplicacion: INestApplication<App>,
  tokenUsuario: string,
  idTablero: number,
  idEstadoKanban: number,
  tituloTarea: string,
): Promise<Response> {
  return await request(aplicacion.getHttpServer())
    .post(`/api/v1/tareas/${idTablero}`)
    .set('Authorization', `Bearer ${tokenUsuario}`)
    .send({
      idEstadoKanban,
      titulo: tituloTarea,
      prioridad: 'Media',
    })
    .expect(201);
}

// Deja inactivos los datos creados durante la prueba.
async function eliminarTableroYUsuarioPrueba(
  aplicacion: INestApplication<App>,
  tokenUsuario: string,
  idTablero: number,
): Promise<void> {
  await request(aplicacion.getHttpServer())
    .delete(`/api/v1/tableros/${idTablero}`)
    .set('Authorization', `Bearer ${tokenUsuario}`)
    .expect(200);

  await request(aplicacion.getHttpServer())
    .delete('/api/v1/usuarios/eliminar')
    .set('Authorization', `Bearer ${tokenUsuario}`)
    .send({ contrasenaActual: 'Planor2026!' })
    .expect(200);
}
