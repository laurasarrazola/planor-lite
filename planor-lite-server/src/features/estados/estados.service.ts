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
   * */
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

        // Contar estados activos
        const cantidadEstadosActivos: number = await repositorioEstados.count({
          where: {
            tablero: {
              idTablero: tableroEncontrado.idTablero,
            },
            estadoActivo: true,
          },
        });

        // Validar límite máximo
        if (cantidadEstadosActivos >= 10) {
          throw new BadRequestException(
            'El tablero ya tiene el máximo de 10 estados permitidos',
          );
        }

        // Calcular posición automática
        const posicionEstadoFinal: number = cantidadEstadosActivos + 1;

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
}
