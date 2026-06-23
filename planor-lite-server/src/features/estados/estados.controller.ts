import {
  Controller,
  HttpStatus,
  // Get,
  Post,
  UseGuards,
  Body,
  // Patch,
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
  // create(@Body() createEstadoDto: CreateEstadoDto) {
  //   return this.estadosService.create(createEstadoDto);
  // }
  // @Get()
  // findAll() {
  //   return this.estadosService.findAll();
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.estadosService.findOne(+id);
  // }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEstadoDto: UpdateEstadoDto) {
  //   return this.estadosService.update(+id, updateEstadoDto);
  // }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.estadosService.remove(+id);
  // }
}
