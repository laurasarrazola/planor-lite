import {
  Controller,
  HttpStatus,
  Get,
  Post,
  UseGuards,
  Body,
  Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { EstadosKanbanService } from './estados.service';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { Usuarios } from '../usuarios/entity/usuario.entity';
import { CrearEstadoDto } from './dto/crear-estado.dto';
import { EstadosKanban } from './entities/estado.entity';
import { EditarEstadoDto } from './dto/editar-estado.dto';

// import { EstadosService } from './estados.service';
// import { CrearEstado } from './dto/create-estado.dto';
// import { UpdateEstadoDto } from './dto/editar-estado.dto';

@ApiTags('estados')
@Controller('estados')
export class EstadosKanbanController {
  constructor(private readonly estadosKanbanService: EstadosKanbanService) {}

  /* ========== CREAR ESTADOS ========== */
  @ApiOperation({
    summary: 'Crear nuevo estado',
    description: 'Crea un nuevo estado en el sistema',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Estado creado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'El estado no pudo ser creado',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombreEstado: { type: 'string', example: 'Mi Estado' },
      },
    },
  })
  @Post('/:idTablero')
  @UseGuards(AuthGuard)
  async crearEstado(
    @GetUser() usuario: Usuarios,
    @Body() crearEstadoDto: CrearEstadoDto,
    @Param('idTablero') idTablero: number,
  ): Promise<EstadosKanban> {
    return await this.estadosKanbanService.crearEstado(
      crearEstadoDto,
      usuario.idUsuario,
      idTablero,
    );
  }

  /* ========== OBTENER ESTADOS DE UN TABLERO ========== */
  @ApiOperation({
    summary: 'Obtener estados de un tablero',
    description: 'Obtiene todos los estados de un tablero específico',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Estados obtenidos exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'No se pudo obtener los estados del tablero',
  })
  @Get('/:idTablero')
  @UseGuards(AuthGuard)
  async obtenerEstadosTablero(
    @GetUser() usuario: Usuarios,
    @Param('idTablero') idTablero: number,
  ): Promise<EstadosKanban[]> {
    return await this.estadosKanbanService.obtenerEstadosTablero(
      idTablero,
      usuario.idUsuario,
    );
  }

  /* ========== EDITAR UN ESTADO ========== */
  @ApiOperation({
    summary: 'Editar un estado',
    description: 'Permite modificar el nombre o la posición de un estado',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Estado editado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'No se pudo editar el estado',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombreEstado: { type: 'string', example: 'Nuevo Nombre' },
      },
    },
  })
  @Patch(':idEstado')
  @UseGuards(AuthGuard)
  async editarEstado(
    @Param('idEstado') idEstado: number,
    @Body() editarEstadoDto: EditarEstadoDto,
    @GetUser() usuario: Usuarios,
  ): Promise<EstadosKanban> {
    return await this.estadosKanbanService.editarEstado(
      idEstado,
      editarEstadoDto,
      usuario.idUsuario,
    );
  }
}
