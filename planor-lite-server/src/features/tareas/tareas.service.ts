import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { Tareas } from './entities/tarea.entity';
import { CrearTareaDto } from './dto/crear-tarea.dto';
import { EstadosKanban } from '../estados/entities/estado.entity';
import { Tableros } from '../tableros/entities/tablero.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';

@Injectable()
export class TareasService {
  constructor(private readonly dataSource: DataSource) {}
  /* ========== CREAR TAREA ========== */
  /**
   * @param {CrearTareaDto} crearTareaDto - Información de la tarea a crear.
   * @param {number} idSolicitante - Identificador del usuario autenticado.
   * @param {number} idTablero - Identificador del tablero donde se creará la tarea.
   * @returns {Promise} - Promesa que se resuelve con la tarea creada.
   */
  async crearTarea(
    crearTareaDto: CrearTareaDto,
    idSolicitante: number,
    idTablero: number,
  ): Promise<Tareas> {
    return await this.dataSource.transaction(
      async (administradorTransaccion: EntityManager): Promise<Tareas> => {
        const repositorioTareas =
          administradorTransaccion.getRepository(Tareas);

        const repositorioEstados =
          administradorTransaccion.getRepository(EstadosKanban);

        const repositorioTableros =
          administradorTransaccion.getRepository(Tableros);

        // Buscar tablero activo del propietario
        const tableroEncontrado: Tableros | null =
          await repositorioTableros.findOne({
            where: {
              idTablero,
              propietario: {
                idUsuario: idSolicitante,
              },
              tableroActivo: true,
            },
          });

        // Validar que el tablero exista y esté activo
        if (!tableroEncontrado) {
          throw new NotFoundException('No se encontró el tablero solicitado.');
        }

        // Buscar el estado dentro del tablero
        const estadoEncontrado: EstadosKanban | null =
          await repositorioEstados.findOne({
            where: {
              idEstadoKanban: crearTareaDto.idEstadoKanban,
              estadoActivo: true,
              tablero: {
                idTablero: tableroEncontrado.idTablero,
              },
            },
          });

        // Validar que el estado exista y pertenezca al tablero
        if (!estadoEncontrado) {
          throw new NotFoundException('No se encontró el estado solicitado.');
        }

        // Validar que no exista otra tarea activa con el mismo título
        const tareaExistente: Tareas | null = await repositorioTareas.findOne({
          where: {
            titulo: crearTareaDto.titulo,
            tareaActiva: true,
            estadoKanban: {
              idEstadoKanban: estadoEncontrado.idEstadoKanban,
            },
          },
        });

        if (tareaExistente) {
          throw new ConflictException(
            'Ya existe una tarea activa con ese título en este estado.',
          );
        }

        // Contar únicamente las tareas activas del estado
        const cantidadTareasActivas: number = await repositorioTareas.count({
          where: {
            tareaActiva: true,
            estadoKanban: {
              idEstadoKanban: estadoEncontrado.idEstadoKanban,
            },
          },
        });

        // Validar límite máximo de tareas por estado
        if (cantidadTareasActivas >= 100) {
          throw new ConflictException(
            'El estado ya tiene el máximo de 100 tareas permitidas.',
          );
        }

        // Buscar la última tarea para calcular el siguiente orden
        const ultimaTarea: Tareas | null = await repositorioTareas.findOne({
          where: {
            tareaActiva: true,
            estadoKanban: {
              idEstadoKanban: estadoEncontrado.idEstadoKanban,
            },
          },
          order: {
            ordenEnEstado: 'DESC',
          },
        });

        // Determinar el orden final de la nueva tarea
        let ordenFinal: number;

        if (ultimaTarea !== null) {
          ordenFinal = ultimaTarea.ordenEnEstado + 1;
        } else {
          ordenFinal = 1;
        }

        // Crear entidad
        const nuevaTarea: Tareas = repositorioTareas.create({
          titulo: crearTareaDto.titulo,
          descripcion: crearTareaDto.descripcion,
          prioridad: crearTareaDto.prioridad,
          fechaVencimientoTarea: crearTareaDto.fechaVencimientoTarea,
          ordenEnEstado: ordenFinal,
          tareaActiva: true,
          estadoKanban: estadoEncontrado,
        });

        // Guardar tarea
        return await repositorioTareas.save(nuevaTarea);
      },
    );
  }
}
