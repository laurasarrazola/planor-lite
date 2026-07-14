import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  UseGuards,
  Param,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { TareasService } from './tareas.service';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { Usuarios } from '../usuarios/entity/usuario.entity';
import { RespuestaTareaDto } from './dto/respuesta-tarea.dto';
import { CrearTareaDto } from './dto/crear-tarea.dto';
import { EditarTareaDto } from './dto/editar-tarea.dto';
import { MoverTareaDto } from './dto/mover-tarea.dto';
import { ReordenarTareaDto } from './dto/reordenar-tarea.dto';
import { Tareas } from './entities/tarea.entity';

@ApiTags('tareas')
@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}
  /* ========== CREAR TAREA ========== */
  @ApiOperation({
    summary: 'Crear nueva tarea',
    description: 'Crea una nueva tarea dentro de un estado del tablero.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tarea creada exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'La tarea no pudo ser creada.',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        idEstadoKanban: { type: 'number', example: 1 },
        titulo: { type: 'string', example: 'Diseñar pantalla de inicio' },
        descripcion: {
          type: 'string',
          example: 'Crear el diseño inicial de la pantalla principal.',
        },
        prioridad: {
          type: 'string',
          enum: ['baja', 'media', 'alta'],
          example: 'media',
        },
        fechaVencimientoTarea: {
          type: 'string',
          format: 'date-time',
          example: '2026-08-15T18:00:00',
        },
      },
    },
  })
  @Post('/:idTablero')
  @UseGuards(AuthGuard)
  async crearTarea(
    @GetUser() usuario: Usuarios,
    @Body() crearTareaDto: CrearTareaDto,
    @Param('idTablero') idTablero: number,
  ): Promise<Tareas> {
    return await this.tareasService.crearTarea(
      crearTareaDto,
      usuario.idUsuario,
      idTablero,
    );
  }

  /* ========== VER TAREAS POR ESTADO ========== */
  @ApiOperation({
    summary: 'Ver tareas por estado',
    description:
      'Obtiene todas las tareas activas dentro de un estado del tablero.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tareas obtenidas exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'No se pudieron obtener las tareas.',
  })
  @Get('/estado/:idEstadoKanban')
  @UseGuards(AuthGuard)
  async verTareasPorEstado(
    @GetUser() usuario: Usuarios,
    @Param('idEstadoKanban') idEstadoKanban: number,
    @Param('idTablero') idTablero: number,
  ): Promise<RespuestaTareaDto[]> {
    return await this.tareasService.verTareasPorEstado(
      idEstadoKanban,
      usuario.idUsuario,
      idTablero,
    );
  }

  /* ========== VER TAREAS DEL TABLERO ========== */
  @ApiOperation({
    summary: 'Ver tareas del tablero',
    description: 'Obtiene todas las tareas activas dentro de un tablero.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tareas obtenidas exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'No se pudieron obtener las tareas.',
  })
  @Get('/tablero/:idTablero')
  @UseGuards(AuthGuard)
  async verTareasTablero(
    @GetUser() usuario: Usuarios,
    @Param('idTablero') idTablero: number,
  ): Promise<RespuestaTareaDto[]> {
    return await this.tareasService.verTareasTablero(
      usuario.idUsuario,
      idTablero,
    );
  }

  /* ========== VER DETALLE DE TAREA ========== */
  @ApiOperation({
    summary: 'Ver detalle de una tarea',
    description:
      'Obtiene la información detallada de una tarea activa perteneciente a un tablero.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Detalle de la tarea obtenido exitosamente.',
    type: RespuestaTareaDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró la tarea solicitada.',
  })
  @Get('/:idTarea')
  @UseGuards(AuthGuard)
  async verDetalleTarea(
    @GetUser() usuario: Usuarios,
    @Param('idTarea') idTarea: number,
  ): Promise<RespuestaTareaDto> {
    return await this.tareasService.verDetalleTarea(idTarea, usuario.idUsuario);
  }

  /* ========== ELIMINAR TAREA ========== */
  @ApiOperation({
    summary: 'Eliminar tarea',
    description:
      'Realiza la eliminación lógica de una tarea perteneciente al usuario autenticado.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tarea eliminada exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró la tarea solicitada.',
  })
  @Delete('/:idTarea')
  @UseGuards(AuthGuard)
  async eliminarTarea(
    @GetUser() usuario: Usuarios,
    @Param('idTarea') idTarea: number,
  ): Promise<string> {
    return await this.tareasService.eliminarTarea(idTarea, usuario.idUsuario);
  }

  /* ========== BUSCAR TAREAS POR TÍTULO ========== */

  @ApiOperation({
    summary: 'Buscar tareas por título',
    description:
      'Busca tareas activas cuyo título coincida con el texto indicado.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tareas encontradas exitosamente.',
    type: RespuestaTareaDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró el tablero solicitado.',
  })
  @Get('/buscar/:idTablero')
  @UseGuards(AuthGuard)
  async buscarTareasPorTitulo(
    @GetUser() usuario: Usuarios,
    @Param('idTablero') idTablero: number,
    @Query('titulo') titulo: string,
  ): Promise<RespuestaTareaDto[]> {
    return await this.tareasService.buscarTareasPorTitulo(
      usuario.idUsuario,
      idTablero,
      titulo,
    );
  }

  /* ========== EDITAR TAREA ========== */
  @ApiOperation({
    summary: 'Editar tarea',
    description:
      'Actualiza parcialmente la información de una tarea del usuario autenticado.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tarea actualizada exitosamente.',
    type: RespuestaTareaDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró la tarea solicitada.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Ya existe una tarea con ese título en el tablero.',
  })
  @Patch('/:idTarea')
  @UseGuards(AuthGuard)
  async editarTarea(
    @GetUser() usuario: Usuarios,
    @Param('idTarea') idTarea: number,
    @Body() editarTareaDto: EditarTareaDto,
  ): Promise<RespuestaTareaDto> {
    console.log(editarTareaDto);
    return await this.tareasService.editarTarea(
      editarTareaDto,
      idTarea,
      usuario.idUsuario,
    );
  }

  /* ========== MOVER TAREA ENTRE ESTADOS KANBAN ========== */
  @ApiOperation({
    summary: 'Mover tarea entre estados Kanban',
    description:
      'Permite mover una tarea de un estado Kanban a otro dentro del mismo tablero.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tarea movida exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró la tarea solicitada.',
  })
  @Patch('/:idTarea/mover')
  @UseGuards(AuthGuard)
  async moverTarea(
    @GetUser() usuario: Usuarios,
    @Param('idTarea') idTarea: number,
    @Body() moverTareaDto: MoverTareaDto,
  ): Promise<RespuestaTareaDto> {
    return this.tareasService.editarTarea(
      moverTareaDto,
      idTarea,
      usuario.idUsuario,
    );
  }

  /* ========== REORDENAR TAREA ========== */
  @ApiOperation({
    summary: 'Reordenar tarea',
    description:
      'Cambia la posición de una tarea dentro del mismo estado Kanban.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tarea reordenada exitosamente.',
    type: RespuestaTareaDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró la tarea solicitada.',
  })
  @Patch('/:idTarea/reordenar')
  @UseGuards(AuthGuard)
  async reordenarTarea(
    @GetUser() usuario: Usuarios,
    @Param('idTarea') idTarea: number,
    @Body() reordenarTareaDto: ReordenarTareaDto,
  ): Promise<RespuestaTareaDto> {
    const editarTareaDto: EditarTareaDto = {
      ordenEnEstado: reordenarTareaDto.ordenEnEstado,
    };

    return this.tareasService.editarTarea(
      editarTareaDto,
      idTarea,
      usuario.idUsuario,
    );
  }
}
