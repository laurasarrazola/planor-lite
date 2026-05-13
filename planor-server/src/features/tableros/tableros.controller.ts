import {
  Controller,
  Post,
  Body,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { TablerosService } from './tableros.service';
import { CrearTableroDto } from './dto/crear-tablero.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Tableros } from './entities/tablero.entity';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { Usuarios } from '../usuarios/entity/usuario.entity';

@ApiTags('tableros')
@Controller('tableros')
export class TablerosController {
  constructor(private readonly tablerosService: TablerosService) {}

  /* ========== CREAR TABLEROS ========== */
  @ApiOperation({
    summary: 'Crear nuevo tablero',
    description: 'Crea un nuevo tablero en el sistema',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tablero creado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'El tablero no pudo ser creado',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombreTablero: { type: 'string', example: 'Mi Tablero' },
        descripcionTablero: {
          type: 'string',
          example: 'Descripción del tablero',
        },
      },
    },
  })
  @Post()
  @UseGuards(AuthGuard)
  public async crearTablero(
    @GetUser() usuario: Usuarios,
    @Body() crearTableroDto: CrearTableroDto,
  ): Promise<Tableros> {
    return await this.tablerosService.crearTablero(
      crearTableroDto,
      usuario.idUsuario,
    );
  }

  /* ========== OBTENER TABLEROS ========== */
  @ApiOperation({
    summary: 'Obtener todos los tableros',
    description: 'Obtiene una lista de todos los tableros en el sistema',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de tableros obtenida exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error al obtener los tableros',
  })
  @Get()
  async obtenerTableros(): Promise<Tableros[]> {
    return await this.tablerosService.obtenerTableros();
  }

  /* ========== OBTENER TABLERO POR USUARIO ========== */
  @ApiOperation({
    summary: 'Obtener tableros de un usuario autenticado',
    description:
      'Devuelve solo los tableros del usuario identificado por el token de autenticación',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de tableros obtenida exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error al obtener los tableros',
  })
  @UseGuards(AuthGuard)
  @Get('usuario')
  async obtenerTablerosUsuario(
    @GetUser() usuario: Usuarios,
  ): Promise<Tableros[]> {
    return await this.tablerosService.obtenerTablerosUsuario(usuario.idUsuario);
  }
}
