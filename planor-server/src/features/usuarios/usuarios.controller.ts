import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  HttpStatus as status,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { Usuarios } from './entity/usuario.entity';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
} from '@nestjs/swagger';
import { ObtenerUsuariosDto } from './dto/obtener-usuarios.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { CambiarContrasenaDto } from './dto/cambiar-contrasena.dto';
import { EliminarUsuarioDto } from './dto/eliminar-usuario.dto';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { RoleGuard } from '../../guards/role/role.guard';

//@ApiTags agrupa los endpoints relacionados bajo la etiqueta 'usuarios' en la documentación Swagger.
@ApiTags('usuarios')
//@Controller define la ruta base para todos los endpoints de este controlador. Todos los endpoints definidos en esta clase estarán bajo esta ruta base.
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  /* ========== CREAR USUARIOS (POST) ========== */
  @ApiOperation({
    summary: 'Crear nuevo usuario',
    description: 'Crea un nuevo usuario en el sistema',
  })
  @ApiResponse({
    status: status.CREATED,
    description: 'Usuario creado exitosamente',
  })
  @ApiResponse({
    status: status.BAD_REQUEST,
    description: 'El usuario no pudo ser creado',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombreUsuario: { type: 'string', example: '' },
        apellidoUsuario: { type: 'string', example: '' },
        email: { type: 'string', format: 'email', example: '' },
        contrasena: { type: 'string', example: '' },
        confirmarContrasena: { type: 'string', example: '' },
      },
    },
  })
  @Post()
  async crearUsuario(
    @Body() crearUsuarioDto: CrearUsuarioDto,
  ): Promise<Usuarios> {
    return this.usuariosService.crearUsuario(crearUsuarioDto);
  }

  /* ========== OBTENER USUARIOS (GET) ========== */
  @ApiOperation({
    summary: 'Obtener usuarios',
    description: 'Obtener usuarios del sistema',
  })
  @ApiResponse({
    status: status.OK,
    description: 'Usuarios obtenidos exitosamente',
  })
  @ApiResponse({
    status: status.BAD_REQUEST,
    description: 'Los usuarios no pudieron ser obtenidos',
  })
  @Get()
  async obtenerUsuarios(): Promise<Usuarios[]> {
    return await this.usuariosService.obtenerUsuarios();
  }

  /* ========== OBTENER USUARIOS CON FILTROS (QUERY PARAMS) (GET) ========== */
  @ApiOperation({
    summary: 'Obtener usuarios según un parámetro específico',
    description: 'Obtener usuarios según un parámetro específico',
  })
  @ApiResponse({
    status: status.OK,
    description: 'Usuarios con parámetro obtenidos exitosamente',
  })
  @ApiResponse({
    status: status.BAD_REQUEST,
    description: 'Los usuarios con parámetro no pudieron ser obtenidos',
  })
  @Get('buscar')
  async listarUsuariosConFiltros(@Query() filtros: ObtenerUsuariosDto) {
    return this.usuariosService.obtenerUsuariosConFiltros(filtros);
  }

  /* ========== OBTENER USUARIO POR ID (GET) ========== */
  @ApiOperation({
    summary: 'Obtener usuario por ID',
    description: 'Obtener un usuario específico por su ID',
  })
  @ApiResponse({
    status: status.OK,
    description: 'Usuario obtenido exitosamente',
  })
  @ApiResponse({
    status: status.BAD_REQUEST,
    description: 'El usuario no pudo ser obtenido',
  })
  @Get(':id')
  async obtenerUsuarioPorId(@Param('id') id: number): Promise<Usuarios> {
    return await this.usuariosService.obtenerUsuarioPorId(id);
  }

  /* ========== ACTUALIZAR USUARIO (PATCH) ========== */
  @ApiOperation({
    summary: 'Actualizar usuario',
    description: 'Actualizar un usuario específico por su ID',
  })
  @ApiResponse({
    status: status.OK,
    description: 'Usuario actualizado exitosamente',
  })
  @ApiResponse({
    status: status.BAD_REQUEST,
    description: 'El usuario no pudo ser actualizado',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombreUsuario: { type: 'string', default: '', example: '' },
        apellidoUsuario: { type: 'string', default: '', example: '' },
      },
    },
  })
  @UseGuards(AuthGuard)
  @Patch('me')
  async actualizarUsuario(
    // @Param('id') id: number,
    @Body() actualizarUsuarioDto: ActualizarUsuarioDto,
    @GetUser('idUsuario') idUsuarioSolicitante: number,
    @GetUser('rolSistema') rolUsuarioSolicitante: 'admin' | 'usuario',
  ): Promise<Usuarios> {
    // el target es el propio usuario extraído del token
    const idUsuarioObjetivo: number = idUsuarioSolicitante;
    return this.usuariosService.actualizarUsuario(
      // id,
      idUsuarioObjetivo,
      actualizarUsuarioDto,
      idUsuarioSolicitante,
      rolUsuarioSolicitante,
    );
  }

  /* ========== ACTUALIZAR USUARIO POR ADMIN ========== */
  @UseGuards(RoleGuard)
  @Patch(':id')
  async actualizarUsuarioPorId(
    @Param('id') id: number,
    @Body() actualizarUsuarioDto: ActualizarUsuarioDto,
    @GetUser('idUsuario') idUsuarioSolicitante: number,
    @GetUser('rolSistema') rolUsuarioSolicitante: 'admin' | 'usuario',
  ): Promise<Usuarios> {
    return this.usuariosService.actualizarUsuario(
      id,
      actualizarUsuarioDto,
      idUsuarioSolicitante,
      rolUsuarioSolicitante,
    );
  }

  /* ========== CAMBIAR CONTRASEÑA DE USUARIO (PATCH) ========== */
  @ApiOperation({
    summary: 'Cambiar contraseña de usuario',
    description: 'Cambiar la contraseña de un usuario específico por su ID',
  })
  @ApiResponse({
    status: status.OK,
    description: 'Contraseña actualizada exitosamente',
  })
  @ApiResponse({
    status: status.BAD_REQUEST,
    description: 'La contraseña no pudo ser actualizada',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        contrasenaActual: { type: 'string', default: '', example: '' },
        contrasenaNueva: { type: 'string', default: '', example: '' },
        confirmarContrasenaNueva: { type: 'string', default: '', example: '' },
      },
    },
  })
  @Patch(':id/contrasena')
  async cambiarContrasena(
    @Param('id') id: number,
    @Body() cambiarContrasenaDto: CambiarContrasenaDto,
  ) {
    return await this.usuariosService.cambiarContrasena(
      id,
      cambiarContrasenaDto,
    );
  }

  /* ========== ELIMINAR USUARIO (DELETE) ========== */
  @ApiOperation({
    summary: 'Eliminar usuario (soft delete)',
    description:
      'Eliminar lógicamente el perfil del usuario autenticado. Requiere contraseña actual.',
  })
  @ApiResponse({
    status: status.OK,
    description: 'Usuario eliminado exitosamente',
  })
  @ApiResponse({
    status: status.BAD_REQUEST,
    description: 'EL usuario no pudo ser eliminado',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        contrasenaActual: { type: 'string', default: '', example: '' },
      },
    },
  })
  @UseGuards(AuthGuard)
  @Delete('me')
  async eliminarUsuario(
    @GetUser('idUsuario') idUsuarioSolicitante: number,
    @Body() eliminarUsuarioDto: EliminarUsuarioDto,
  ) {
    return await this.usuariosService.eliminarUsuario(
      idUsuarioSolicitante,
      eliminarUsuarioDto,
    );
  }
}

/*
Endpoints propuestos y requisito de token:
OK POST /auth/register — no JWT (registro público).
OK POST /auth/login — no JWT (retorna accessToken + refreshToken).
NO POST /auth/refresh — no JWT (usa refreshToken o cookie httpOnly; devuelve nuevo access token).
NO POST /auth/logout — requiere refreshToken (o JWT) para revocar/invalidar refresh en servidor; opcional @UseGuards(AuthGuard) si quieres que solo usuario autenticado lo invoque.
NO POST /auth/recover — no JWT (envía token de un solo uso por email).
NO POST /auth/reset — no JWT (recibe token de correo + nueva contraseña).
NO POST /auth/social — no JWT (oauth flow), al final emitir JWT local.
OK GET /usuarios/me — requiere AuthGuard (usuario autenticado).
OK GET /usuarios/:id — opcional pública; si pública, devolver sólo campos no sensibles; si privada, requiere AuthGuard.
OK PATCH /usuarios/me — requiere AuthGuard (usar token para identificar y autorizar). NO recibir :id.
OK PATCH /usuarios/:id — solo para admins (usar RoleGuard).
NO DELETE /usuarios/me — requiere AuthGuard y confirmación (por ejemplo contraseña en body).
 */
