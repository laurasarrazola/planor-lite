/* Este guard se ejecuta antes del controlador. Su función es leer el JWT enviado por el cliente, validarlo, verificar el usuario y permitir o negar el acceso. */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsuariosService } from '../../features/usuarios/usuarios.service';
import { SesionesService } from '../../features/sesiones/sesiones.service';

// Interfaz que define la estructura del payload del JWT, que contiene el ID del usuario (sub) y su correo electrónico (email).
interface JwtPayload {
  sub: number;
  email: string;
}
// Injectable registra esta clase como proveedor de NestJS, permitiendo que el sistema de inyección de dependencias la cree y la entregue donde sea requerida.
@Injectable()
//CanActivate determina si una ruta o recurso puede ser accedido por un usuario, verificando la autorización del mismo.
export class AuthGuard implements CanActivate {
  // Inyectamos los servicios necesarios para validar el JWT, obtener la configuración y acceder a los datos de usuarios y sesiones.
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usuariosService: UsuariosService,
    private readonly sesionesService: SesionesService,
  ) {}

  // NestJS ejecuta automáticamente canActivate antes del controlador cuando una ruta usa este guard. El método canActivate se ejecuta cada vez que se accede a una ruta protegida por este guard.
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // switchToHttp() obtiene un objeto tipo HttpArgumentsHost, este tiene métodos HTTP como getRequest() para obtener headers, body, query o pararms.
    const request = context.switchToHttp().getRequest<Request>();
    // Extrae el token JWT del encabezado Authorization (formato: "Bearer <token>")
    const token = this.extraerTokenDelEncabezado(request);

    // Si el cliente no envía el encabezado Authorization o el token no existe, el acceso se bloquea inmediatamente con un error 401.
    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      // verifyAsync comprueba la firma del JWT usando JWT_SECRET del archivo .env y devuelve el payload con los datos almacenados al iniciar sesión.
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Además de validar el JWT, se consulta la tabla de tokens invalidados para impedir reutilizar sesiones que ya fueron cerradas.
      const tokenEstaInvalidado =
        await this.sesionesService.existeTokenInvalidado(token);

      if (tokenEstaInvalidado) {
        throw new UnauthorizedException('La sesión ya fue cerrada.');
      }
      // El id almacenado en payload.sub proviene del JWT generado en el login y se utiliza para consultar el usuario actualizado en la base de datos.
      const usuario = await this.usuariosService.obtenerUsuarioPorId(
        payload.sub,
      );

      // Se agrega el usuario autenticado a request.user para que controladores y decoradores puedan acceder sin consultar nuevamente la BD.
      request.user = usuario;
    } catch (errorDesconocido: unknown) {
      console.log(errorDesconocido);
      throw new UnauthorizedException('Token inválido o expirado');
    }
    // Si las validaciones anteriores fueron exitosas, NestJS permite continuar hacia el siguiente guard o directamente al controlador.
    return true;
  }

  // Método auxiliar que centraliza la lectura del encabezado Authorization para evitar duplicar esta lógica dentro de otros métodos del guard.
  private extraerTokenDelEncabezado(request: Request): string | undefined {
    // El encabezado suele tener el formato "Bearer <token>", por lo que split divide ambas partes en un arreglo de dos posiciones.
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // Solo se acepta el esquema Bearer, ya que es el estándar para enviar JWT mediante el encabezado Authorization en HTTP.
    if (type === 'Bearer') {
      return token;
    } else {
      return undefined;
    }
  }
}
