import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { Tareas } from './entities/tarea.entity';
import { CrearTareaDto } from './dto/crear-tarea.dto';
import { EditarTareaDto } from './dto/editar-tarea.dto';
import { EstadosKanban } from '../estados/entities/estado.entity';
import { Tableros } from '../tableros/entities/tablero.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { RespuestaTareaDto } from './dto/respuesta-tarea.dto';

@Injectable()
export class TareasService {
  constructor(private readonly dataSource: DataSource) {}
  /* ========== MÉTODO REUTILIZABLE PARA CONSTRUIR LA RESPUESTA DE LA TAREA ========== */
  /**
   * Construye un objeto con la información pública de la tarea.
   * @param {Tareas} tarea - Entidad de la tarea obtenida desde la base de datos.
   * @returns {RespuestaTareaDto} Objeto con los datos de la tarea.
   */
  private construirRespuestaTarea(tarea: Tareas): RespuestaTareaDto {
    return {
      idTarea: tarea.idTarea,
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      prioridad: tarea.prioridad,
      fechaVencimientoTarea: tarea.fechaVencimientoTarea,
      ordenEnEstado: tarea.ordenEnEstado,
      estado: {
        idEstadoKanban: tarea.estadoKanban.idEstadoKanban,
        nombreEstado: tarea.estadoKanban.nombreEstado,
      },
    };
  }

  /* ========== METODO REUTILIZABLE PARA OBTENER TABLERO ACTIVO ========== */
  /**
   * Busca un tablero activo que pertenezca al usuario autenticado.
   * @param administradorTransaccion Administrador de la transacción.
   * @param idSolicitante Identificador del usuario autenticado.
   * @param idTablero Identificador del tablero.
   * @returns Tablero encontrado.
   */
  private async obtenerTableroActivo(
    administradorTransaccion: EntityManager,
    idSolicitante: number,
    idTablero: number,
  ): Promise<Tableros> {
    const repositorioTableros =
      administradorTransaccion.getRepository(Tableros);

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

    if (!tableroEncontrado) {
      throw new NotFoundException('No se encontró el tablero solicitado.');
    }

    return tableroEncontrado;
  }

  /*========= METODO REUTILIZABLE PARA BUSCAR Y VALIDAR ESTADO ========== */
  /**
   * Busca un estado activo que pertenezca al tablero indicado.
   * @param administradorTransaccion Administrador de la transacción.
   * @param idEstadoKanban Identificador del estado.
   * @param idTablero Identificador del tablero.
   * @returns Estado encontrado.
   */
  private async obtenerEstadoActivo(
    administradorTransaccion: EntityManager,
    idEstadoKanban: number,
    idTablero: number,
  ): Promise<EstadosKanban> {
    const repositorioEstados =
      administradorTransaccion.getRepository(EstadosKanban);

    const estadoEncontrado: EstadosKanban | null =
      await repositorioEstados.findOne({
        where: {
          idEstadoKanban,
          estadoActivo: true,
          tablero: {
            idTablero,
          },
        },
      });

    if (!estadoEncontrado) {
      throw new NotFoundException('No se encontró el estado solicitado.');
    }

    return estadoEncontrado;
  }

  /* ========== MÉTODO REUTILIZABLE PARA VALIDAR TÍTULO ÚNICO EN EL TABLERO ========== */
  /**
   * Valida que no exista otra tarea activa con el mismo título en el tablero.
   * @param administradorTransaccion Administrador de la transacción.
   * @param titulo Título de la tarea.
   * @param idTablero Identificador del tablero.
   * @param idTarea Ignorar esta tarea durante la validación (opcional).
   */
  private async validarTituloUnico(
    administradorTransaccion: EntityManager,
    titulo: string,
    idTablero: number,
    idTarea?: number,
  ): Promise<void> {
    // Obtener el repositorio de tareas.
    const repositorioTareas = administradorTransaccion.getRepository(Tareas);

    // Construir la consulta de búsqueda.
    const constructorConsulta = repositorioTareas
      .createQueryBuilder('tarea')
      .leftJoin('tarea.estadoKanban', 'estado')
      .where('tarea.tareaActiva = true')
      .andWhere('estado.IdTablero = :idTablero', {
        idTablero,
      })
      .andWhere('tarea.titulo = :titulo', {
        titulo,
      });

    // Ignorar la misma tarea durante la edición.
    if (idTarea) {
      constructorConsulta.andWhere('tarea.idTarea <> :idTarea', {
        idTarea,
      });
    }

    // Buscar una tarea con el mismo título.
    const tareaExistente = await constructorConsulta.getOne();

    // Detener la operación si ya existe.
    if (tareaExistente) {
      throw new ConflictException(
        'Ya existe una tarea activa con ese título en el tablero.',
      );
    }
  }

  /* ========== MÉTODO REUTILIZABLE PARA OBTENER UNA TAREA ACTIVA DEL TABLERO ========== */
  /**
   * Busca una tarea activa por su identificador.
   * @param administradorTransaccion Administrador de la transacción.
   * @param idTarea Identificador de la tarea.
   * @param idTablero Identificador del tablero.
   * @returns Tarea encontrada.
   */
  private async obtenerTareaActiva(
    administradorTransaccion: EntityManager,
    idTarea: number,
  ): Promise<Tareas> {
    const repositorioTareas = administradorTransaccion.getRepository(Tareas);

    const tareaEncontrada = await repositorioTareas.findOne({
      where: {
        idTarea,
        tareaActiva: true,
      },
      relations: {
        estadoKanban: {
          tablero: true,
        },
      },
    });

    if (!tareaEncontrada) {
      throw new NotFoundException('No se encontró la tarea solicitada.');
    }

    return tareaEncontrada;
  }

  // /* ========== MÉTODO REUTILIZABLE PARA VALIDAR LÍMITE DE 100 TAREAS ========== */
  // /**
  //  * Valida que el estado no haya alcanzado el límite de tareas.
  //  * @param administradorTransaccion Administrador de la transacción.
  //  * @param idEstadoKanban Identificador del estado.
  //  * @throws ConflictException si el estado ya tiene 100 tareas activas.
  //  */
  // private async validarLimiteTareasEstado(
  //   administradorTransaccion: EntityManager,
  //   idEstadoKanban: number,
  // ): Promise<void> {
  //   const repositorioTareas = administradorTransaccion.getRepository(Tareas);

  //   const cantidadTareas = await repositorioTareas.count({
  //     where: {
  //       tareaActiva: true,
  //       estadoKanban: {
  //         idEstadoKanban,
  //       },
  //     },
  //   });

  //   if (cantidadTareas >= 100) {
  //     throw new ConflictException(
  //       'El estado ya tiene el máximo de 100 tareas permitidas.',
  //     );
  //   }
  // }

  /* ========== MÉTODO REUTILIZABLE PARA OBTENER EL SIGUIENTE ORDEN DE TAREA ========== */
  /**
   * Obtiene el siguiente orden disponible dentro del estado.
   */
  private async obtenerSiguienteOrden(
    administradorTransaccion: EntityManager,
    idEstadoKanban: number,
  ): Promise<number> {
    const repositorioTareas = administradorTransaccion.getRepository(Tareas);

    const ultimaTarea = await repositorioTareas.findOne({
      where: {
        tareaActiva: true,
        estadoKanban: {
          idEstadoKanban,
        },
      },
      order: {
        ordenEnEstado: 'DESC',
      },
    });

    if (ultimaTarea) {
      return ultimaTarea.ordenEnEstado + 1;
    }

    return 1;
  }

  /* ========== MÉTODO REUTILIZABLE PARA REORGANIZAR EL ORDEN DE LAS TAREAS ========== */
  /**
   * Reorganiza el orden consecutivo de las tareas activas de un estado.
   * @param administradorTransaccion Administrador de la transacción.
   * @param idEstadoKanban Identificador del estado.
   */
  private async reorganizarOrdenTareasEstado(
    administradorTransaccion: EntityManager,
    idEstadoKanban: number,
  ): Promise<void> {
    const repositorioTareas = administradorTransaccion.getRepository(Tareas);

    const tareas = await repositorioTareas.find({
      where: {
        tareaActiva: true,
        estadoKanban: {
          idEstadoKanban,
        },
      },
      order: {
        ordenEnEstado: 'ASC',
      },
    });

    // Reorganizar el orden de las tareas de manera consecutiva con base en su posición actual. Esto asegura que no haya huecos en la numeración del orden de las tareas dentro del estado.
    for (let i = 0; i < tareas.length; i++) {
      tareas[i].ordenEnEstado = i + 1;
    }

    await repositorioTareas.save(tareas);
  }

  /* ========== MÉTODO REUTILIZABLE PARA CAMBIAR LA POSICIÓN DE UNA TAREA ========== */
  /**
   * Reubica una tarea dentro del mismo estado o hacia otro estado.
   * Ajusta automáticamente el orden del resto de tareas.
   * @param administradorTransaccion Administrador de la transacción.
   * @param tareaEncontrada Tarea que será movida.
   * @param estadoDestino Estado donde quedará la tarea.
   * @param nuevoOrden Posición solicitada.
   */
  private async moverTarea(
    administradorTransaccion: EntityManager,
    tareaEncontrada: Tareas,
    estadoDestino: EstadosKanban,
    nuevoOrden: number,
  ): Promise<void> {
    // Obtener el repositorio de tareas.
    const repositorioTareas = administradorTransaccion.getRepository(Tareas);

    // Guardar el estado origen antes de modificar la tarea.
    const idEstadoOrigen = tareaEncontrada.estadoKanban.idEstadoKanban;

    // Obtener las tareas activas del estado destino.
    const tareasDestino = await repositorioTareas.find({
      where: {
        tareaActiva: true,
        estadoKanban: {
          idEstadoKanban: estadoDestino.idEstadoKanban,
        },
      },
      order: {
        ordenEnEstado: 'ASC',
      },
    });

    // Excluir la tarea para evitar duplicarla en la lista.
    const tareasSinMover = tareasDestino.filter(
      (tarea) => tarea.idTarea !== tareaEncontrada.idTarea,
    );

    // Si el orden solicitado es menor a 1, ubicar la tarea al inicio.
    if (nuevoOrden < 1) {
      nuevoOrden = 1;
    }

    // Si el orden supera el máximo, ubicar la tarea al final.
    if (nuevoOrden > tareasSinMover.length + 1) {
      nuevoOrden = tareasSinMover.length + 1;
    }

    // Insertar la tarea en la posición solicitada.
    tareasSinMover.splice(nuevoOrden - 1, 0, tareaEncontrada);

    // Recalcular el orden consecutivo de todas las tareas.
    for (let i = 0; i < tareasSinMover.length; i++) {
      tareasSinMover[i].ordenEnEstado = i + 1;
      tareasSinMover[i].estadoKanban = estadoDestino;
    }

    // Guardar el nuevo orden del estado destino.
    await repositorioTareas.save(tareasSinMover);

    // Reorganizar el estado origen si la tarea cambió de estado.
    if (idEstadoOrigen !== estadoDestino.idEstadoKanban) {
      await this.reorganizarOrdenTareasEstado(
        administradorTransaccion,
        idEstadoOrigen,
      );
    }
  }

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
    // se utiliza una transacción para garantizar la consistencia de los datos durante la creación de la tarea.
    return await this.dataSource.transaction(
      async (administradorTransaccion: EntityManager): Promise<Tareas> => {
        const repositorioTareas =
          administradorTransaccion.getRepository(Tareas);

        // Traer el tablero activo del propietario desde el método reutilizable obtenerTableroActivo.
        await this.obtenerTableroActivo(
          administradorTransaccion,
          idSolicitante,
          idTablero,
        );

        // Traer el estado activo desde el método reutilizable obtenerEstadoActivo.
        const estadoEncontrado: EstadosKanban = await this.obtenerEstadoActivo(
          administradorTransaccion,
          crearTareaDto.idEstadoKanban,
          idTablero,
        );

        // Traer la validación de duplicidad de título desde el método reutlizable validarTituloUnico.
        await this.validarTituloUnico(
          administradorTransaccion,
          crearTareaDto.titulo,
          idTablero,
        );

        // Traer la validación de límite de tareas desde el método reutlizable validarLimiteTareasEstado.
        // await this.validarLimiteTareasEstado(
        //   administradorTransaccion,
        //   estadoEncontrado.idEstadoKanban,
        // );

        // Traer el siguiente orden de tarea desde el método reutlizable obtenerSiguienteOrden.
        const ordenFinal: number = await this.obtenerSiguienteOrden(
          administradorTransaccion,
          estadoEncontrado.idEstadoKanban,
        );

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

  /* ========== VER TAREAS POR ESTADO ========== */
  /**
  *@param idEstadoKanban - Identificador del estado Kanban.
  @param idSolicitante - Identificador del usuario autenticado.
  @param idTablero - Identificador del tablero donde se encuentran las tareas.
  @returns {Promise}
*/

  async verTareasPorEstado(
    idEstadoKanban: number,
    idSolicitante: number,
    idTablero: number,
  ): Promise<RespuestaTareaDto[]> {
    return await this.dataSource.transaction(
      async (
        administradorTransaccion: EntityManager,
      ): Promise<RespuestaTareaDto[]> => {
        // Traer el repositorio de tareas
        const repositorioTareas =
          administradorTransaccion.getRepository(Tareas);

        // Traer el tablero activo del propietario desde el método reutilizable obtenerTableroActivo.
        await this.obtenerTableroActivo(
          administradorTransaccion,
          idSolicitante,
          idTablero,
        );

        // Traer el estado activo desde el método reutilizable obtenerEstadoActivo.
        const estadoEncontrado = await this.obtenerEstadoActivo(
          administradorTransaccion,
          idEstadoKanban,
          idTablero,
        );

        const tareas = await repositorioTareas.find({
          where: {
            tareaActiva: true,
            estadoKanban: {
              idEstadoKanban: estadoEncontrado.idEstadoKanban,
            },
          },
          relations: {
            estadoKanban: true,
          },
          order: {
            ordenEnEstado: 'ASC',
          },
        });

        return tareas.map((tarea) => this.construirRespuestaTarea(tarea));
      },
    );
  }

  /* ========== VER TAREAS DEL TABLERO ========== */
  /**
   * Obtiene todas las tareas activas pertenecientes a un tablero.
   * @param idSolicitante Identificador del usuario autenticado.
   * @param idTablero Identificador del tablero.
   * @returns {Promise<Tareas[]>}
   */
  async verTareasTablero(
    idSolicitante: number,
    idTablero: number,
  ): Promise<RespuestaTareaDto[]> {
    return await this.dataSource.transaction(
      async (
        administradorTransaccion: EntityManager,
      ): Promise<RespuestaTareaDto[]> => {
        // Repositorio de tareas
        const repositorioTareas =
          administradorTransaccion.getRepository(Tareas);

        // Traer el tablero activo del propietario desde el método reutilizable obtenerTableroActivo.
        await this.obtenerTableroActivo(
          administradorTransaccion,
          idSolicitante,
          idTablero,
        );

        const tareas = await repositorioTareas.find({
          where: {
            tareaActiva: true,
            estadoKanban: {
              tablero: {
                idTablero,
              },
            },
          },
          relations: {
            estadoKanban: true,
          },
          order: {
            estadoKanban: {
              posicionEstado: 'ASC',
            },
            ordenEnEstado: 'ASC',
          },
        });

        return tareas.map((tarea) => this.construirRespuestaTarea(tarea));
      },
    );
  }

  /* ========== VER DETALLE DE TAREA ========== */
  /**
   * Obtiene la información detallada de una tarea activa.
   * @param idTarea Identificador de la tarea.
   * @param idSolicitante Identificador del usuario autenticado.
   * @param idTablero Identificador del tablero.
   * @returns {Promise<RespuestaTareaDto>}
   */
  async verDetalleTarea(
    idTarea: number,
    idSolicitante: number,
  ): Promise<RespuestaTareaDto> {
    return await this.dataSource.transaction(
      async (
        administradorTransaccion: EntityManager,
      ): Promise<RespuestaTareaDto> => {
        // traer la tarea activa desde el método reutilizable obtenerTareaActiva.
        const tareaEncontrada = await this.obtenerTareaActiva(
          administradorTransaccion,
          idTarea,
        );

        // traer el tablero activo del propietario desde el método reutilizable obtenerTableroActivo.
        await this.obtenerTableroActivo(
          administradorTransaccion,
          idSolicitante,
          tareaEncontrada.estadoKanban.tablero.idTablero,
        );

        // Construir la respuesta pública.
        return this.construirRespuestaTarea(tareaEncontrada);
      },
    );
  }

  /* ========== BUSCAR TAREAS POR TÍTULO ========== */
  /**
   * Busca tareas activas por coincidencia en el título.
   * @param idSolicitante Usuario autenticado.
   * @param idTablero Tablero donde buscar.
   * @param titulo Texto a buscar.
   * @returns Lista de tareas encontradas.
   */

  // Se valida el tablero y luego se buscan tareas activas cuyo título
  // contenga el texto indicado.
  async buscarTareasPorTitulo(
    idSolicitante: number,
    idTablero: number,
    titulo: string,
  ): Promise<RespuestaTareaDto[]> {
    return await this.dataSource.transaction(
      async (
        administradorTransaccion: EntityManager,
      ): Promise<RespuestaTareaDto[]> => {
        // Validar acceso al tablero.
        await this.obtenerTableroActivo(
          administradorTransaccion,
          idSolicitante,
          idTablero,
        );

        // Repositorio de tareas.
        const repositorioTareas =
          administradorTransaccion.getRepository(Tareas);

        // Constructor dinámico de la consulta.
        const constructorConsulta = repositorioTareas
          .createQueryBuilder('tarea')
          .leftJoinAndSelect('tarea.estadoKanban', 'estado')
          .where('tarea.tareaActiva = true')
          .andWhere('estado.IdTablero = :idTablero', {
            idTablero,
          });

        // Buscar coincidencias por título.
        if (titulo) {
          constructorConsulta.andWhere('tarea.titulo LIKE :titulo', {
            titulo: `%${titulo}%`,
          });
        }

        // Ordenar por estado y posición.
        constructorConsulta
          .orderBy('estado.posicionEstado', 'ASC')
          .addOrderBy('tarea.ordenEnEstado', 'ASC');

        const tareas = await constructorConsulta.getMany();

        if (!tareas.length) {
          throw new NotFoundException('No se encuentra la tarea.');
        }

        return tareas.map((tarea) => this.construirRespuestaTarea(tarea));
      },
    );
  }

  /* ========== EDITAR TAREA ========== */
  /**
   * Edita la información de una tarea activa.
   * @param editarTareaDto Información a modificar.
   * @param idTarea Identificador de la tarea.
   * @param idSolicitante Usuario autenticado.
   * @returns Información actualizada de la tarea.
   */
  async editarTarea(
    editarTareaDto: EditarTareaDto,
    idTarea: number,
    idSolicitante: number,
  ): Promise<RespuestaTareaDto> {
    return await this.dataSource.transaction(
      async (
        administradorTransaccion: EntityManager,
      ): Promise<RespuestaTareaDto> => {
        // Obtener el repositorio de tareas.
        const repositorioTareas =
          administradorTransaccion.getRepository(Tareas);

        // Obtener la tarea activa.
        const tareaEncontrada = await this.obtenerTareaActiva(
          administradorTransaccion,
          idTarea,
        );

        // Validar que el tablero pertenezca al usuario.
        const tablero = await this.obtenerTableroActivo(
          administradorTransaccion,
          idSolicitante,
          tareaEncontrada.estadoKanban.tablero.idTablero,
        );

        // Validar título únicamente si fue modificado.
        if (
          editarTareaDto.titulo !== undefined &&
          editarTareaDto.titulo !== tareaEncontrada.titulo
        ) {
          await this.validarTituloUnico(
            administradorTransaccion,
            editarTareaDto.titulo,
            tablero.idTablero,
            tareaEncontrada.idTarea,
          );

          tareaEncontrada.titulo = editarTareaDto.titulo;
        }

        // Actualizar descripción si fue enviada.
        if (editarTareaDto.descripcion !== undefined) {
          tareaEncontrada.descripcion = editarTareaDto.descripcion;
        }

        // Actualizar prioridad si fue enviada.
        if (editarTareaDto.prioridad !== undefined) {
          tareaEncontrada.prioridad = editarTareaDto.prioridad;
        }

        // Actualizar fecha si fue enviada.
        if (editarTareaDto.fechaVencimientoTarea !== undefined) {
          tareaEncontrada.fechaVencimientoTarea =
            editarTareaDto.fechaVencimientoTarea as unknown as Date;
        }

        // Obtener el estado destino.
        let estadoDestino = tareaEncontrada.estadoKanban;

        // Validar el nuevo estado únicamente si fue enviado.
        if (
          editarTareaDto.idEstadoKanban !== undefined &&
          editarTareaDto.idEstadoKanban !==
            tareaEncontrada.estadoKanban.idEstadoKanban
        ) {
          estadoDestino = await this.obtenerEstadoActivo(
            administradorTransaccion,
            editarTareaDto.idEstadoKanban,
            tablero.idTablero,
          );
        }

        // Determinar si debe cambiar de posición.
        const cambiaEstado =
          estadoDestino.idEstadoKanban !==
          tareaEncontrada.estadoKanban.idEstadoKanban;

        const cambiaOrden =
          editarTareaDto.ordenEnEstado !== undefined &&
          editarTareaDto.ordenEnEstado !== tareaEncontrada.ordenEnEstado;

        // Reubicar la tarea únicamente cuando sea necesario.
        if (cambiaEstado || cambiaOrden) {
          await this.moverTarea(
            administradorTransaccion,
            tareaEncontrada,
            estadoDestino,
            editarTareaDto.ordenEnEstado ?? tareaEncontrada.ordenEnEstado,
          );
        } else {
          // Guardar únicamente los cambios simples.
          await repositorioTareas.save(tareaEncontrada);
        }

        // Consultar nuevamente la tarea actualizada.
        const tareaActualizada = await this.obtenerTareaActiva(
          administradorTransaccion,
          tareaEncontrada.idTarea,
        );

        // Construir la respuesta pública.
        return this.construirRespuestaTarea(tareaActualizada);
      },
    );
  }

  /* ========== ELIMINAR TAREA ========== */
  /**
   * Elimina lógicamente una tarea activa.
   * @param idTarea Identificador de la tarea.
   * @param idSolicitante Identificador del usuario autenticado.
   */
  async eliminarTarea(idTarea: number, idSolicitante: number): Promise<string> {
    return await this.dataSource.transaction(
      async (administradorTransaccion: EntityManager): Promise<string> => {
        // Repositorio de tareas.
        const repositorioTareas =
          administradorTransaccion.getRepository(Tareas);

        // traer la tarea activa desde el método reutilizable obtenerTareaActiva.
        const tareaEncontrada = await this.obtenerTareaActiva(
          administradorTransaccion,
          idTarea,
        );

        // traer el tablero activo del propietario desde el método reutilizable obtenerTableroActivo.
        await this.obtenerTableroActivo(
          administradorTransaccion,
          idSolicitante,
          tareaEncontrada.estadoKanban.tablero.idTablero,
        );

        // Marcar la tarea como inactiva.
        tareaEncontrada.tareaActiva = false;

        await repositorioTareas.save(tareaEncontrada);

        // Reorganizar el orden restante.
        await this.reorganizarOrdenTareasEstado(
          administradorTransaccion,
          tareaEncontrada.estadoKanban.idEstadoKanban,
        );

        return 'tarea eliminada exitosamente';
      },
    );
  }
}
