import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Param,
  HttpStatus,
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
}
