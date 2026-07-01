import { Body, Controller, Post, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { Request } from 'express';
import { RespuestaLoginDto } from './dto/respuesta-login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* =============== LOGIN DE USUARIO =============== */
  @ApiOperation({
    summary: 'Iniciar sesión',
    description: 'Permite iniciar sesión con email y contraseña',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login exitoso',
    type: RespuestaLoginDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Credenciales inválidas',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email', example: '' },
        contrasena: { type: 'string', example: '' },
      },
    },
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<RespuestaLoginDto> {
    return this.authService.login(loginDto);
  }

  /* =============== LOGOUT DE USUARIO =============== */
  @ApiOperation({
    summary: 'Cerrar sesión',
    description: 'Permite cerrar sesión y eliminar el token JWT',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logout exitoso',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Token inválido o expirado',
  })
  @Post('logout')
  async cerrarSesion(@Req() request: Request): Promise<{ mensaje: string }> {
    return this.authService.cerrarSesion(request);
  }
}
