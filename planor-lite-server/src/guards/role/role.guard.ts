import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(contextoEjecucion: ExecutionContext): boolean {
    const solicitudHttp = contextoEjecucion
      .switchToHttp()
      .getRequest<Request>();
    const usuarioAutenticado = solicitudHttp.user;

    if (!usuarioAutenticado || usuarioAutenticado.rolSistema !== 'admin') {
      throw new ForbiddenException(
        'Esta operación requiere permisos de administrador',
      );
    }

    return true;
  }
}
