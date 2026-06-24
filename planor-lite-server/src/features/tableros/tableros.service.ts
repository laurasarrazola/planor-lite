import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CrearTableroDto } from './dto/crear-tablero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tableros } from './entities/tablero.entity';
import { EntityManager, Repository, DataSource } from 'typeorm';
import { Usuarios } from '../usuarios/entity/usuario.entity';
import { ActualizarTableroDto } from './dto/actualizar-tablero.dto';

@Injectable()
export class TablerosService {
  constructor(
    @InjectRepository(Tableros)
    private readonly tablerosRepository: Repository<Tableros>,
    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
    private readonly dataSource: DataSource,
  ) {}

  /* ========== CREAR TABLEROS ========== */
  /**
   *  @param {crearTableroDto} crearTableroDto - información del tablero.
   * @returns {Promise<Tableros>}  - Promesa que se resuelve con el tablero creado.
   */
  async crearTablero(
    crearTableroDto: CrearTableroDto, // DTO con los datos enviados por el cliente
    idSolicitante: number, // id del usuario autenticado extraído del token
  ): Promise<Tableros> {
    // Buscar en la BD al usuario que solicita crear el tablero
    const propietario = await this.usuariosRepository.findOneBy({
      idUsuario: idSolicitante,
    });

    // Validación: el usuario debe existir y estar activo
    if (!propietario || propietario.usuarioActivo === false) {
      throw new NotFoundException('Propietario no encontrado o inactivo');
    }

    // Verificar que no exista un tablero con el mismo nombre para este propietario
    const tableroExistente = await this.tablerosRepository.findOne({
      where: {
        nombreTablero: crearTableroDto.nombreTablero,
        tableroActivo: true,
        propietario: { idUsuario: idSolicitante },
      },
    });
    // Si ya existe, error de BadRequestException con mensaje claro para el cliente
    if (tableroExistente) {
      throw new BadRequestException(
        'Ya existe un tablero con ese nombre para este usuario',
      );
    }

    // Crear el tablero
    const tableroGuardado = await this.dataSource.transaction(
      async (manager: EntityManager) => {
        // Obtener el repositorio enlazado a esta transacción
        const repo = manager.getRepository(Tableros);

        // Crear la entidad en memoria (no la guarda aún en BD)
        const nuevo = repo.create({
          nombreTablero: crearTableroDto.nombreTablero,
          descripcionTablero: crearTableroDto.descripcionTablero ?? null,
        });

        // Asociar el propietario (relación ManyToOne)
        nuevo.propietario = propietario;

        // Guardar el nuevo tablero en la BD (INSERT)
        const saved = await repo.save(nuevo);

        //crear los 4 estados iniciales del tablero
        const estadosIniciales = [
          { nombreEstado: 'Pendiente', posicionEstado: 0, tablero: saved },
          { nombreEstado: 'En_ejecucion', posicionEstado: 1, tablero: saved },
          { nombreEstado: 'Terminado', posicionEstado: 2, tablero: saved },
          { nombreEstado: 'Aprobado', posicionEstado: 3, tablero: saved },
        ];

        // Obtener el repositorio de Estados
        const repoEstados = manager.getRepository('EstadosKanban');

        // Insertar los estados iniciales
        await repoEstados.save(estadosIniciales);

        // Devolver la entidad guardada desde la transacción
        return saved;
      },
    );

    // Consultar el tablero recién creado incluyendo las relaciones necesarias (propietario)
    return (await this.tablerosRepository.findOne({
      where: { idTablero: tableroGuardado.idTablero },
      relations: ['propietario'],
    })) as Tableros;
  }

  /* ========== OBTENER TABLEROS ========== */
  /**
   * @param {void} - No recibe parámetros.
   * @returns {Promise<Tableros[]>} - Promesa que se resuelve con un array de tableros.
   */
  async obtenerTableros(): Promise<Tableros[]> {
    return await this.tablerosRepository.find({ relations: ['propietario'] });
  }

  /* ========== OBTENER TABLERO POR USUARIO ========== */
  /**
   * @param {number} idPropietario - ID del propietario de los tableros a obtener.
   * @returns {Promise<Tableros[]>} - Promesa que se resuelve con un array de tableros del propietario.
   */
  async obtenerTablerosUsuario(idPropietario: number): Promise<Tableros[]> {
    return await this.tablerosRepository.find({
      where: { propietario: { idUsuario: idPropietario } },
      relations: ['propietario'],
    });
  }

  /* ========== OBTENER DETALLES DE UN TABLERO ========== */
  /**
   * @param {number} idTablero - ID del tablero a obtener.
   * @returns {Promise<Tableros>} - Promesa que se resuelve con el tablero encontrado.
   */
  async obtenerDetallesTablero(
    idTablero: number,
    idUsuario: number,
  ): Promise<Tableros> {
    const tableroPropio = await this.tablerosRepository.findOne({
      where: { idTablero, propietario: { idUsuario } },
      relations: ['propietario'],
    });
    if (tableroPropio) return tableroPropio;

    // si no es propietario, verificar si el tablero existe
    const existe = await this.tablerosRepository.findOne({
      where: { idTablero },
    });
    if (!existe) throw new NotFoundException('Tablero no encontrado');

    // existe pero no es propietario
    throw new ForbiddenException('No tienes permiso para ver este tablero');
  }

  /* ========== EDITAR UN TABLERO ========== */
  /**
   * @param {number} idTablero - ID del tablero a editar.
   * @param {ActualizarTableroDto} actualizarTableroDto - Información actualizada del tablero.
   * @returns {Promise<Tableros>} - Promesa que se resuelve con el tablero actualizado.
   */
  async editarTablero(
    idTablero: number,
    actualizarTableroDto: ActualizarTableroDto,
    idUsuario: number,
  ): Promise<Tableros> {
    const tableroPropio = await this.tablerosRepository.findOne({
      where: { idTablero, propietario: { idUsuario } },
      relations: ['propietario'],
    });
    if (!tableroPropio)
      throw new ForbiddenException(
        'Sólo es posible modificar tableros propios',
      );

    if (actualizarTableroDto.nombreTablero !== undefined) {
      tableroPropio.nombreTablero = actualizarTableroDto.nombreTablero;
    }
    if (actualizarTableroDto.descripcionTablero !== undefined) {
      tableroPropio.descripcionTablero =
        actualizarTableroDto.descripcionTablero;
    }

    const cambios = {
      nombreTablero: actualizarTableroDto.nombreTablero,
      descripcionTablero: actualizarTableroDto.descripcionTablero,
    };
    await this.tablerosRepository.update(idTablero, cambios);
    return this.obtenerDetallesTablero(idTablero, idUsuario);
  }

  /* ========== ELIMINAR UN TABLERO ========== */
  /**
   * @param {number} idTablero - ID del tablero a eliminar.
   * @param {number} idUsuario - ID del usuario que solicita la eliminación.
   * @returns {Promise<void>} - Promesa que se resuelve cuando el tablero es eliminado.
   */
  async eliminarTablero(
    idTablero: number,
    idUsuario: number,
  ): Promise<{ message: string }> {
    const tableroPropio = await this.tablerosRepository.findOne({
      where: { idTablero, propietario: { idUsuario } },
    });
    if (!tableroPropio) {
      throw new ForbiddenException('Sólo es posible eliminar tableros propios');
    }

    if (tableroPropio.tableroActivo === false) {
      throw new BadRequestException('El tablero ya ha sido eliminado');
    }

    tableroPropio.tableroActivo = false;
    await this.tablerosRepository.save(tableroPropio);
    return { message: 'Tablero eliminado exitosamente' };
  }
}
