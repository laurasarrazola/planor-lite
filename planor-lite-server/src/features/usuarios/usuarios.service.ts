import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './entity/usuario.entity';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ObtenerUsuariosDto } from './dto/obtener-usuarios.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { CambiarContrasenaDto } from './dto/cambiar-contrasena.dto';
import { EliminarUsuarioDto } from './dto/eliminar-usuario.dto';
import { RespuestaUsuarioDto } from './dto/respuesta-usuario.dto';

// @Injectable() marca la clase para la inyección de dependencias, se crea automáticamente con el CLI.
@Injectable()

// UsuariosService es el servicio que contiene toda la lógica para gestionar usuarios.
export class UsuariosService {
  //Constructor: inyecta el repositorio Usuarios (TypeORM) para operaciones DB
  constructor(
    // Se inyecta el repositorio de la entidad Usuarios usando @InjectRepository.
    @InjectRepository(Usuarios)
    // inicializamos con la variable usuaiosRepository y se debe "comportar" como un Repository de la entidad Usuarios.
    private readonly usuariosRepository: Repository<Usuarios>,
  ) {}

  /* =============== MÉTODO REUTILIZABLE PARA OBTENER USUARIO ACTIVO =============== */
  /**
   * Obtiene un usuario activo por su ID, permitiendo seleccionar únicamente los campos necesarios.
   * @param {number} idUsuario - Identificador del usuario.
   * @param {(keyof Usuarios)[]} [select] - Campos específicos a recuperar.
   * @returns {Promise<Usuarios>} - Usuario activo encontrado.
   * @throws {NotFoundException} Cuando el usuario no existe o está inactivo.
   */
  private async obtenerUsuarioActivo(
    idUsuario: number,
    select?: (keyof Usuarios)[],
  ): Promise<Usuarios> {
    const usuarioEncontrado = await this.usuariosRepository.findOne({
      where: {
        idUsuario,
        usuarioActivo: true,
      },
      select,
    });

    if (!usuarioEncontrado) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return usuarioEncontrado;
  }

  /* =============== MÉTODO REUTILIZABLE PARA VALIDAR COINCIDENCIA DE CONTRASEÑAS =============== */
  /**
   * Valida que una contraseña y su confirmación sean iguales.
   * @param {string} contrasena - Contraseña a validar.
   * @param {string} confirmacion - Confirmación de la contraseña.
   * @param {string} mensaje - Mensaje de error cuando las contraseñas no coinciden.
   * @returns {void}
   */
  private validarCoincidenciaContrasenas(
    contrasena: string,
    confirmacion: string,
    mensaje: string,
  ): void {
    if (contrasena !== confirmacion) {
      throw new BadRequestException(mensaje);
    }
  }

  /* =============== MÉTODO REUTILIZABLE PARA VALIDAR CONTRASEÑA DEL USUARIO =============== */
  /**
   * Valida que una contraseña ingresada coincida con el hash almacenado.
   * @param {string} contrasenaIngresada - Contraseña proporcionada por el usuario.
   * @param {string} hash - Hash de la contraseña almacenado en la base de datos.
   * @param {string} mensaje - Mensaje de error cuando la contraseña es incorrecta.
   * @returns {Promise<void>}
   */
  private async validarContrasenaUsuario(
    contrasenaIngresada: string,
    hash: string,
    mensaje: string,
  ): Promise<void> {
    const coincide = await bcrypt.compare(contrasenaIngresada, hash);

    if (!coincide) {
      throw new BadRequestException(mensaje);
    }
  }

  /* =============== MÉTODO REUTILIZABLE PARA CONSTRUIR LA RESPUESTA DEL USUARIO =============== */
  /**
   * Construye un objeto con los datos del usuario, excluyendo información sensible como la contraseña.
   * @param {Usuarios} usuario - Entidad del usuario obtenida desde la base de datos.
   * @returns {RespuestaUsuarioDto} Objeto con los datos públicos del usuario.
   */
  private construirRespuestaUsuario(usuario: Usuarios): RespuestaUsuarioDto {
    return {
      idUsuario: usuario.idUsuario,
      nombreUsuario: usuario.nombreUsuario,
      apellidoUsuario: usuario.apellidoUsuario,
      email: usuario.email,
      fechaRegistro: usuario.fechaRegistro,
      usuarioActivo: usuario.usuarioActivo,
      rolSistema: usuario.rolSistema,
    };
  }

  /* =============== CREAR USUARIO =============== */
  /**
   * Crea un nuevo usuario en el sistema usando el modelo de datos del DTO.
   * @param {CrearUsuarioDto} crearUsuarioDto - información del usuario
   * @returns {Promise<RespuestaUsuarioDto>} - Promesa que se resuelve con el usuario creado.
   */

  //crearUsuario recibe el DTO y devuelve una promesa que se resuelve con el usuario creado.
  async crearUsuario(
    crearUsuarioDto: CrearUsuarioDto,
  ): Promise<RespuestaUsuarioDto> {
    // Validar que el email no esté previamente registrado
    const usuarioExistente = await this.usuariosRepository.findOneBy({
      email: crearUsuarioDto.email,
    });
    if (usuarioExistente) {
      throw new BadRequestException(
        'Ya existe un usuario con el email ingresado',
      );
    }

    // Validar que la contraseña y la confirmación coincidan mediante el método reutilizable.
    this.validarCoincidenciaContrasenas(
      crearUsuarioDto.contrasena,
      crearUsuarioDto.confirmarContrasena,
      'La contraseña y la confirmación no coinciden',
    );

    // Hashea la contraseña
    const hashed = await bcrypt.hash(crearUsuarioDto.contrasena, 10);

    const usuarioNuevo = this.usuariosRepository.create(crearUsuarioDto);
    usuarioNuevo.contrasena = hashed;

    // Guarda el nuevo usuario en la base de datos con el método save() de TypeORM.
    const usuarioGuardado = await this.usuariosRepository.save(usuarioNuevo);

    return this.construirRespuestaUsuario(usuarioGuardado);

    //si se quisiera incluir la contraseña en la respuesta, se devolvería el usuario guardado completo sin desestructurar.
    // const usuarioGuardadoCompleto = await this.usuariosRepository.save(usuarioNuevo);
    // return usuarioGuardadoCompleto;
  }

  /* =============== OBTENER USUARIOS =============== */
  /**
   * Método para obtener todos los usuarios del sistema.
   * @param {void} - No recibe parámetros.
   * @returns {Promise<RespuestaUsuarioDto[]>} - Promesa que resuelve con un array de usuarios.
   */

  /* Obtiene con find() de usuariosRepository los datos de la bd, no se incluye la contraseña en el select */
  async obtenerUsuarios(): Promise<RespuestaUsuarioDto[]> {
    const usuariosObtenidos = await this.usuariosRepository.find({
      select: [
        'idUsuario',
        'nombreUsuario',
        'apellidoUsuario',
        'email',
        'usuarioActivo',
        'rolSistema',
        'fechaRegistro',
      ],
    });

    return usuariosObtenidos.map((usuario) =>
      this.construirRespuestaUsuario(usuario),
    );
  }

  /* =============== OBTENER USUARIOS POR ID =============== */
  /**
   * Método para obtener un usuario por su ID.
   * @param {number} id - ID del usuario a obtener.
   * @returns {Promise<RespuestaUsuarioDto>} - Promesa que resuelve con el usuario encontrado.
   */
  async obtenerUsuarioPorId(id: number): Promise<RespuestaUsuarioDto> {
    const usuarioObtenido = await this.usuariosRepository.findOne({
      where: { idUsuario: id },
      select: [
        'idUsuario',
        'nombreUsuario',
        'apellidoUsuario',
        'email',
        'usuarioActivo',
        'rolSistema',
        'fechaRegistro',
      ],
    });
    if (!usuarioObtenido) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return this.construirRespuestaUsuario(usuarioObtenido);
  }

  /* =============== OBTENER USUARIOS CON FILTROS (QUERY PARAMS) =============== */
  /**
   * Método para obtener usuarios con filtros (Query Params)
   * @param {ObtenerUsuariosDto} filtros - DTO con los filtros para la consulta.
   * @returns {Promise<RespuestaUsuarioDto[]>} - Promesa que resuelve con array de usuarios que cumplen los filtros.
   */

  //La función obtenerUsuariosConFiltros recibe la estructura de obtenerUsuariosDto a través de la variable 'filtros' para la consulta y devuelve una promesa que resuelve con un array de usuarios que cumplen los filtros.
  async obtenerUsuariosConFiltros(
    filtros: ObtenerUsuariosDto,
  ): Promise<RespuestaUsuarioDto[]> {
    //constructorConsulta es un objeto dinámico que arma condiciones según filtros usando QueryBuilder de TypeORM para generar SQL.
    const constructorConsulta = this.usuariosRepository
      // .createQueryBuilder inicia la consulta con el alias 'usuario'.
      // .select() define los campos a seleccionar en la consulta
      .createQueryBuilder('usuario')
      .select([
        'usuario.idUsuario',
        'usuario.nombreUsuario',
        'usuario.apellidoUsuario',
        'usuario.email',
        'usuario.usuarioActivo',
        'usuario.rolSistema',
        'usuario.fechaRegistro',
        'usuario.fechaActualizacion',
      ]);

    // Si el DTO tiene un valor en 'busqueda', se agrega una condición que busca coincidencias en nombreUsuario, apellidoUsuario o email usando LIKE.
    if (filtros.busqueda) {
      constructorConsulta.andWhere(
        `(CONCAT(COALESCE(usuario.nombreUsuario , ''), ' ', COALESCE(usuario.apellidoUsuario, '')) LIKE :search OR usuario.email LIKE :search)`,
        { search: `%${filtros.busqueda}%` },
      );
    }

    // usuarioActivo
    if (filtros.usuarioActivo) {
      constructorConsulta.andWhere('usuario.usuarioActivo = :activo', {
        activo: filtros.usuarioActivo === 'activo',
      });
    }

    // rol
    if (filtros.rolSistema) {
      constructorConsulta.andWhere('usuario.rolSistema = :rol', {
        rol: filtros.rolSistema,
      });
    }

    // fechas
    if (filtros.fechaRegistro) {
      constructorConsulta.andWhere('usuario.fechaRegistro >= :desde', {
        desde: filtros.fechaRegistro,
      });
    }
    if (filtros.fechaActualizacion) {
      constructorConsulta.andWhere('usuario.fechaActualizacion <= :hasta', {
        hasta: filtros.fechaActualizacion,
      });
    }

    const usuarios = await constructorConsulta.getMany();

    return usuarios.map((usuario) => this.construirRespuestaUsuario(usuario));
  }

  /* =============== ACTUALIZAR USUARIO =============== */
  /**
   * Método para actualizar un usuario existente.
   * @param {number} id - ID del usuario a actualizar.
   * @param {ActualizarUsuarioDto} actualizarUsuarioDto - DTO con los datos a actualizar.
   * @returns {Promise<RespuestaUsuarioDto>} - Promesa que resuelve con el usuario actualizado.
   */

  async actualizarUsuario(
    id: number,
    actualizarUsuarioDto: ActualizarUsuarioDto,
    idUsuarioSolicitante: number,
    rolUsuarioSolicitante: 'admin' | 'usuario',
  ): Promise<RespuestaUsuarioDto> {
    if (id !== idUsuarioSolicitante && rolUsuarioSolicitante !== 'admin') {
      throw new ForbiddenException('No autorizado para modificar otro usuario');
    }

    // trae el método reutilizable obtenerUsuarioActivo.
    await this.obtenerUsuarioActivo(id);

    const cambios = {
      nombreUsuario: actualizarUsuarioDto.nombreUsuario,
      apellidoUsuario: actualizarUsuarioDto.apellidoUsuario,
    };

    await this.usuariosRepository.update(id, cambios);

    return this.obtenerUsuarioPorId(id);
  }

  /* =============== CAMBIAR CONTRASEÑA DE USUARIO =============== */
  /**
   * Método para cambiar la contraseña de un usuario.
   * @param {number} id - ID del usuario cuya contraseña se va a cambiar.
   * @param {CambiarContrasenaDto} dto - DTO con la contraseña actual, nueva contraseña y confirmación de nueva contraseña.
   */

  async cambiarContrasena(
    id: number,
    dto: CambiarContrasenaDto,
  ): Promise<RespuestaUsuarioDto> {
    // Se obtiene el usuario activo por su ID usando el método reutilizable obtenerUsuarioActivo, seleccionando solo los campos necesarios.
    const usuarioActualizarContrasena = await this.obtenerUsuarioActivo(id, [
      'idUsuario',
      'nombreUsuario',
      'apellidoUsuario',
      'email',
      'fechaRegistro',
      'usuarioActivo',
      'rolSistema',
      'contrasena',
    ]);

    // Manejo si el usuario no tiene contraseña almacenada (puede ser null o undefined por registro con red social).
    if (!usuarioActualizarContrasena.contrasena) {
      throw new BadRequestException(
        'No hay contraseña almacenada para este usuario',
      );
    }

    // Valida que la contraseña actual ingresada coincida con la almacenada mediante el método reutilizable.
    await this.validarContrasenaUsuario(
      dto.contrasenaActual,
      usuarioActualizarContrasena.contrasena,
      'Contraseña actual incorrecta',
    );

    // Validar que la nueva contraseña y su confirmación coincidan mediante el método reutilizable.
    this.validarCoincidenciaContrasenas(
      dto.contrasenaNueva,
      dto.confirmarContrasenaNueva,
      'La nueva contraseña y la confirmación no coinciden, deben ser iguales',
    );
    // Si todo es correcto, se hashea la nueva contraseña y se actualiza el campo contrasena del usuario. Luego, se guarda el usuario actualizado en la base de datos con save() y se devuelve el usuario actualizado sin la contraseña.
    usuarioActualizarContrasena.contrasena = await bcrypt.hash(
      dto.contrasenaNueva,
      10,
    );

    const contrasenaActualizada = await this.usuariosRepository.save(
      usuarioActualizarContrasena,
    );

    return this.construirRespuestaUsuario(contrasenaActualizada);
  }

  /* =============== ELIMINAR USUARIO =============== */
  /**
   * Método para eliminar un usuario por su ID.
   * @param {number} id - ID del usuario a eliminar.
   * @param {EliminarUsuarioDto} dto - DTO con la contraseña actual del usuario.
   * @returns {Promise<{ message: string }>} - Promesa que se resuelve cuando el usuario ha sido eliminado exitosamente.
   */

  async eliminarUsuario(
    id: number,
    dto: EliminarUsuarioDto,
  ): Promise<{ message: string }> {
    const usuarioEliminar = await this.obtenerUsuarioActivo(id, [
      'idUsuario',
      'contrasena',
      'usuarioActivo',
    ]);

    // Manejo si el usuario no tiene contraseña almacenada (puede ser null o undefined) por registro con redes sociales.
    if (!usuarioEliminar.contrasena) {
      throw new BadRequestException(
        'No hay contraseña almacenada para este usuario',
      );
    }

    // Valida que la contraseña ingresada coincida con la almacenada mediante el método reutilizable.
    await this.validarContrasenaUsuario(
      dto.contrasenaActual,
      usuarioEliminar.contrasena,
      'La contraseña es incorrecta',
    );

    usuarioEliminar.usuarioActivo = false;
    await this.usuariosRepository.save(usuarioEliminar);
    return { message: 'Usuario eliminado exitosamente' };
  }

  /* =============== OBTENER USUARIO POR EMAIL (PARA LOGIN) =============== */
  /**
   * Método para obtener un usuario por su email, utilizado para el proceso de login.
   * @param {string} email - Email del usuario a obtener.
   * @returns {Promise<Usuarios>} - Promesa que se resuelve con el usuario encontrado.
   */
  async obtenerUsuarioPorEmail(email: string): Promise<Usuarios | null> {
    return await this.usuariosRepository.findOne({
      where: { email },
    });
  }
}
