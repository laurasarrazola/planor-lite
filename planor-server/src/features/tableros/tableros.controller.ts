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
interface PayloadJwt {
  email: string;
  sub: number;
  iat?: number;
  exp?: number;
}

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
  @UseGuards(AuthGuard)
  public async crearTablero(
    @Request() req: ExpressRequest,
    @Body() crearTableroDto: CrearTableroDto,
  ): Promise<Tableros> {
    const reqConUsuario: RequestConUsuario = req as RequestConUsuario;
    if (!reqConUsuario.user || typeof reqConUsuario.user.sub !== 'number') {
      throw new UnauthorizedException('Usuario no autenticado');
    }
    const idUsuarioAutenticado: number = reqConUsuario.user.sub;
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
