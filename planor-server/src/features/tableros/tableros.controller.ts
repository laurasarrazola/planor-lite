import {
  Controller,
  Post,
  Body,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
// Request de express es para acceder al usuario autenticado.
import type { Request as ExpressRequest } from 'express';
import { TablerosService } from './tableros.service';
import { CrearTableroDto } from './dto/crear-tablero.dto';
//import { ActualizarTableroDto } from './dto/actualizar-tablero.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Tableros } from './entities/tablero.entity';
import { AuthGuard } from '../../guards/auth/auth.guard';
// Interfaces para el payload del JWT. Este contiene la información que se incluye en el token al momento de autenticarse.
interface PayloadJwt {
  email: string;
  sub: number;
  iat?: number;
  exp?: number;
}
// Interface para extender el Request de Express y agregarle la propiedad user, que contendrá la información del usuario autenticado extraída del JWT.
interface RequestConUsuario extends ExpressRequest {
  user?: PayloadJwt;
}

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
        idPropietario: { type: 'number', example: '' },
        nombreTablero: { type: 'string', example: '' },
        descripcionTablero: { type: 'string', example: '' },
      },
    },
  })
  @Post()
  @UseGuards(AuthGuard) // @UseGuards(AuthGuard) hace que la ruta requiera autenticación y verifica el JWT para extraer la información del usuario autenticado.
  public async crearTablero(
    @Request() req: RequestConUsuario,
    @Body() crearTableroDto: CrearTableroDto,
  ): Promise<Tableros> {
    if (!req.user) {
      throw new UnauthorizedException('Usuario no autenticado');
    }
    if (typeof req.user.sub !== 'number') {
      throw new UnauthorizedException('Token inválido: sub no numérico');
    }
    const idUsuarioAutenticado: number = req.user.sub;
    return await this.tablerosService.crearTablero(
      crearTableroDto,
      idUsuarioAutenticado,
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
  @Get()
  // @UseGuards(AuthGuard)
  async obtenerTableros(): Promise<Tableros[]> {
    return await this.tablerosService.obtenerTableros();
  }
}
