import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { CrearEstadoDto } from './dto/crear-estado.dto';
// import { ActualizarEstadoDto } from './dto/actualizar-estado.dto';
import { EstadosKanban } from './entities/estado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { Usuarios } from '../usuarios/entity/usuario.entity';
import { Tableros } from '../tableros/entities/tablero.entity';
import { EditarEstadoDto } from './dto/editar-estado.dto';
import { EliminarEstadoDto } from './dto/eliminar-estado.dto';

@Injectable()
export class EstadosKanbanService {
  constructor(
    // Inyectar el repositorio de EstadosKanban para interactuar con la base de datos
    @InjectRepository(EstadosKanban)
    private readonly estadosRepository: Repository<EstadosKanban>,
    //Inyectar el repositorio de Tableros para interactuar con la base de datos
    @InjectRepository(Tableros)
    private readonly tablerosRepository: Repository<Tableros>,
    //Inyectar el repositorio de Usuarios para interactuar con la base de datos
    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
    private readonly dataSource: DataSource,
  ) {}

  /* ========== CREAR ESTADO ========== */
  /**
   * @param {CrearEstadoDto} crearEstadoDto - información del estado a crear.
   * @returns {Promise<EstadosKanban>} - Promesa que se resuelve con el estado creado.
   **/
  async crearEstado(
    crearEstadoDto: CrearEstadoDto,
    idSolicitante: number,
    idTablero: number,
  ): Promise<EstadosKanban> {
    return await this.dataSource.transaction(
      async (
        administradorTransaccion: EntityManager,
      ): Promise<EstadosKanban> => {
        const repositorioEstados =
          administradorTransaccion.getRepository(EstadosKanban);

        // Obtener el repositorio de Tableros dentro de la transacción
        const repositorioTableros =
          administradorTransaccion.getRepository(Tableros);

        // Buscar tablero activo del propietario
        const tableroEncontrado: Tableros | null =
          await repositorioTableros.findOne({
            where: {
              idTablero: idTablero,
              propietario: {
                idUsuario: idSolicitante,
              },
              tableroActivo: true,
            },
          });

        // Validar que el tablero exista y esté activo
        if (!tableroEncontrado) {
          throw new NotFoundException('No se encontró el tablero solicitado');
        }

        // Validar nombre único dentro del tablero
        const estadoExistente: EstadosKanban | null =
          await repositorioEstados.findOne({
            where: {
              nombreEstado: crearEstadoDto.nombreEstado,
              estadoActivo: true,
              tablero: {
                idTablero: tableroEncontrado.idTablero,
              },
            },
          });

        if (estadoExistente) {
          throw new ConflictException(
            'Ya existe un estado con ese nombre en el tablero',
          );
        }

        // Contar únicamente los estados activos
        const cantidadEstadosActivos: number = await repositorioEstados.count({
          where: {
            estadoActivo: true,
            tablero: {
              idTablero: tableroEncontrado.idTablero,
            },
          },
        });

        // Validar límite máximo de estados activos
        if (cantidadEstadosActivos >= 10) {
          throw new BadRequestException(
            'El tablero ya tiene el máximo de 10 estados permitidos',
          );
        }

        // Reasigna posiciones de estados tras eliminar uno para evitar huecos en la numeración.
        const ultimoEstado: EstadosKanban | null =
          await repositorioEstados.findOne({
            where: {
              estadoActivo: true,
              tablero: {
                idTablero: tableroEncontrado.idTablero,
              },
            },
            order: {
              posicionEstado: 'DESC',
            },
          });

        // Determinar la posición final del siguiente estado activo.
        let posicionEstadoFinal: number;

        if (ultimoEstado !== null) {
          posicionEstadoFinal = ultimoEstado.posicionEstado + 1;
        } else {
          posicionEstadoFinal = 1;
        }

        // Crear entidad
        const nuevoEstado: EstadosKanban = repositorioEstados.create({
          nombreEstado: crearEstadoDto.nombreEstado,
          posicionEstado: posicionEstadoFinal,
          tablero: tableroEncontrado,
          estadoActivo: true,
        });

        // Guardar estado
        return await repositorioEstados.save(nuevoEstado);
      },
    );
  }

  /* ========== OBTENER ESTADOS DE UN TABLERO ========== */
  /**
   * @param {number} idTablero - ID del tablero.
   * @param {number} idSolicitante - ID del usuario solicitante.
   * @returns {Promise<EstadosKanban[]>} - Promesa que se resuelve con los estados del tablero.
   **/
  async obtenerEstadosTablero(
    idTablero: number,
    idSolicitante: number,
  ): Promise<EstadosKanban[]> {
    // Buscar tablero activo del propietario
    const tableroEncontrado: Tableros | null =
      await this.tablerosRepository.findOne({
        where: {
          idTablero: idTablero,
          propietario: {
            idUsuario: idSolicitante,
          },
          tableroActivo: true,
        },
      });

    // Validar que el tablero exista y esté activo
    if (!tableroEncontrado) {
      throw new NotFoundException('No se encontró el tablero solicitado');
    }

    // Obtener los estados del tablero
    return await this.estadosRepository.find({
      where: {
        tablero: {
          idTablero: tableroEncontrado.idTablero,
        },
        estadoActivo: true,
      },
      order: {
        posicionEstado: 'ASC',
      },
    });
  }

  /* ========== EDITAR ESTADO ========== */
  /**
   * @param {number} idEstado - ID del estado.
   * @param {EditarEstadoDto} editarEstadoDto - Datos a modificar.
   * @param {number} idSolicitante - Usuario autenticado.
   * @returns {Promise<EstadosKanban>}
   */

  async editarEstado(
    idEstado: number,
    editarEstadoDto: EditarEstadoDto,
    idSolicitante: number,
  ): Promise<EstadosKanban> {
    // Iniciar transacción para asegurar que todas las operaciones se realicen de manera atómica
    return await this.dataSource.transaction(
      // La función de transacción recibe un administrador de transacción que permite realizar operaciones dentro de la transacción
      async (
        administradorTransaccion: EntityManager,
      ): Promise<EstadosKanban> => {
        const repositorioEstados =
          administradorTransaccion.getRepository(EstadosKanban);

        // Buscar estado junto con su tablero
        const estadoEncontrado: EstadosKanban | null =
          await repositorioEstados.findOne({
            where: {
              idEstadoKanban: idEstado,
              estadoActivo: true,
              tablero: {
                propietario: {
                  idUsuario: idSolicitante,
                },
                tableroActivo: true,
              },
            },
            //relations especifica las relaciones que se deben cargar junto con la entidad principal.
            relations: ['tablero', 'tablero.propietario'],
          });

        // Validar existencia y propiedad
        if (!estadoEncontrado) {
          throw new NotFoundException('No se encontró el estado solicitado');
        }

        /***** VALIDAR NOMBRE *****/
        if (editarEstadoDto.nombreEstado !== undefined) {
          const estadoConMismoNombre: EstadosKanban | null =
            await repositorioEstados.findOne({
              where: {
                nombreEstado: editarEstadoDto.nombreEstado,
                estadoActivo: true,
                tablero: {
                  idTablero: estadoEncontrado.tablero.idTablero,
                },
              },
            });

          if (
            estadoConMismoNombre &&
            estadoConMismoNombre.idEstadoKanban !==
              estadoEncontrado.idEstadoKanban
          ) {
            throw new ConflictException(
              'Ya existe un estado con ese nombre en el tablero',
            );
          }
          estadoEncontrado.nombreEstado = editarEstadoDto.nombreEstado;
        }

        /***** CAMBIAR POSICIÓN *****/
        if (editarEstadoDto.posicionEstado !== undefined) {
          const posicionActual: number = estadoEncontrado.posicionEstado;
          const nuevaPosicion: number = editarEstadoDto.posicionEstado;

          const cantidadEstados: number = await repositorioEstados.count({
            where: {
              estadoActivo: true,
              tablero: {
                idTablero: estadoEncontrado.tablero.idTablero,
              },
            },
          });

          if (nuevaPosicion < 1 || nuevaPosicion > cantidadEstados) {
            throw new BadRequestException('Posición inválida');
          }

          if (nuevaPosicion !== posicionActual) {
            // Obtener todos los estados del tablero
            const estados = await repositorioEstados.find({
              where: {
                estadoActivo: true,
                tablero: {
                  idTablero: estadoEncontrado.tablero.idTablero,
                },
              },
              order: {
                posicionEstado: 'ASC',
              },
            });

            // PASO 1: Mover TODOS los estados a una zona temporal
            for (const estado of estados) {
              await repositorioEstados.update(estado.idEstadoKanban, {
                posicionEstado: estado.posicionEstado + 100,
              });
            }

            // PASO 2: Construir el orden final
            const estadosReordenados = estados.filter(
              (estado) =>
                estado.idEstadoKanban !== estadoEncontrado.idEstadoKanban,
            );

            estadosReordenados.splice(nuevaPosicion - 1, 0, estadoEncontrado);

            // PASO 3: Asignar posiciones definitivas
            for (let indice = 0; indice < estadosReordenados.length; indice++) {
              await repositorioEstados.update(
                estadosReordenados[indice].idEstadoKanban,
                {
                  posicionEstado: indice + 1,
                },
              );
            }

            // Actualizar objeto en memoria
            estadoEncontrado.posicionEstado = nuevaPosicion;
          }
        }

        // Guardar cambios
        return await repositorioEstados.save(estadoEncontrado);
      },
    );
  }

  /* ========== ELIMINAR ESTADO ========== */
  /**
   * @param {number} idEstado - ID del estado a eliminar.
   * @param {EliminarEstadoDto} eliminarEstadoDto - Confirmación y posible reasignación.
   * @param {number} idSolicitante - Usuario autenticado.
   * @returns {Promise<void>}
   */
  async eliminarEstado(
    idEstado: number,
    eliminarEstadoDto: EliminarEstadoDto,
    idSolicitante: number,
  ): Promise<EstadosKanban> {
    //Se verifica que el valor de "confirmar" sea true para proceder con la eliminación del estado.
    if (eliminarEstadoDto.confirmar !== true) {
      throw new BadRequestException(
        'Debes confirmar la eliminación para continuar',
      );
    }

    // Iniciar transacción para asegurar que todas las operaciones se realicen de manera atómica
    return await this.dataSource.transaction(
      // La función de transacción recibe un administrador de transacción que permite realizar operaciones dentro de la transacción
      async (manager: EntityManager): Promise<EstadosKanban> => {
        // Obtener el repositorio de EstadosKanban dentro de la transacción
        const estadosRepo = manager.getRepository(EstadosKanban);

        // Buscar el estado a eliminar junto con su tablero y propietario
        const estadoEncontrado = await estadosRepo.findOne({
          where: {
            idEstadoKanban: idEstado,
            estadoActivo: true,
            tablero: {
              propietario: {
                idUsuario: idSolicitante,
              },
              tableroActivo: true,
            },
          },
          //relations especifica las relaciones que se deben cargar junto con la entidad principal.
          relations: ['tablero', 'tablero.propietario'],
        });

        // Validar existencia y propiedad del estado
        if (!estadoEncontrado) {
          throw new NotFoundException('No se encontró el estado solicitado');
        }

        // Contar la cantidad de estados activos en el tablero para asegurarse de que no se elimine el último estado activo
        const cantidadEstadosActivos = await estadosRepo.count({
          where: {
            estadoActivo: true,
            tablero: {
              idTablero: estadoEncontrado.tablero.idTablero,
            },
          },
        });

        // Validar que no sea el último estado activo para evitar dejar el tablero sin estados
        if (cantidadEstadosActivos <= 1) {
          throw new ConflictException(
            'No se puede eliminar el último estado del tablero',
          );
        }

        //PENDIENTE: Validar si se proporciona un idEstadoDestino para reasignar tareas.
        if (eliminarEstadoDto.idEstadoDestino !== undefined) {
          throw new BadRequestException(
            'La reasignación de tareas aún no está conectada al módulo de tareas',
          );
        }

        // Marcar el estado como inactivo en lugar de eliminarlo físicamente
        estadoEncontrado.estadoActivo = false;
        await estadosRepo.save(estadoEncontrado);

        // Obtener los estados activos restantes
        const estadosActivos = await estadosRepo.find({
          where: {
            estadoActivo: true,
            tablero: {
              idTablero: estadoEncontrado.tablero.idTablero,
            },
          },
          order: {
            posicionEstado: 'ASC',
          },
        });

        // Mover temporalmente las posiciones para evitar conflictos
        for (const estado of estadosActivos) {
          await estadosRepo.update(estado.idEstadoKanban, {
            posicionEstado: estado.posicionEstado + 100,
          });
        }

        // Asignar nuevamente posiciones consecutivas de manera que no queden huecos en la numeración de los estados activos
        for (let i = 0; i < estadosActivos.length; i++) {
          await estadosRepo.update(estadosActivos[i].idEstadoKanban, {
            posicionEstado: i + 1,
          });
        }

        // Retornar el estado eliminado (inactivo) para confirmar la operación
        return estadoEncontrado;
      },
    );
  }
}
