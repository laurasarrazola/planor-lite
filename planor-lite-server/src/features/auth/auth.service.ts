import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
//import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RespuestaLoginDto } from './dto/respuesta-login.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /* =============== LOGIN DE USUARIO =============== */
  /**
   * @param {string} loginDto.email - Email del usuario que intenta iniciar sesión.
   * @param {string} loginDto.contrasena - Contraseña del usuario que intenta iniciar sesión.
   * @returns {Promise<RespuestaLoginDto>} - Promesa que resuelve con los datos del usuario si el login es exitoso, o lanza una excepción si falla.
   */
  async login(loginDto: LoginDto): Promise<RespuestaLoginDto> {
    // Buscar el usuario por su email desde la base de datos utilizando el servicio de usuarios
    const usuarioLogin = await this.usuariosService.obtenerUsuarioPorEmail(
      loginDto.email,
    );
    if (!usuarioLogin) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    // Verificar que el usuario tenga una contraseña registrada
    if (!usuarioLogin.contrasena)
      throw new UnauthorizedException('Credenciales inválidas');

    // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos utilizando bcrypt
    const contrasenaCorrecta = await bcrypt.compare(
      loginDto.contrasena,
      usuarioLogin.contrasena,
    );
    if (!contrasenaCorrecta) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    // payload es la información que se incluirá en el token JWT, en este caso el email y el ID del usuario autenticado
    const payload = { email: usuarioLogin.email, sub: usuarioLogin.idUsuario };
    // Generar el token JWT utilizando el servicio de JWT de NestJS, pasando el payload como argumento
    const token = await this.jwtService.signAsync(payload);

    // Devolver el token JWT junto con el email y el ID del usuario autenticado
    return {
      token,
      email: usuarioLogin.email,
      idUsuario: usuarioLogin.idUsuario,
    };
  }
}
