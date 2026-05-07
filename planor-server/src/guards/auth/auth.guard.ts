import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

interface PayloadJwt {
  email: string;
  sub: number;
  iat?: number;
  exp?: number;
}

interface RequestConUsuario extends Request {
  user?: PayloadJwt;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();

    const token: string | undefined = this.extraerToken(request);
    if (!token) {
      throw new UnauthorizedException('Token requerido');
    }

    try {
      const decoded: PayloadJwt =
        await this.jwtService.verifyAsync<PayloadJwt>(token);
      (request as RequestConUsuario).user = decoded;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
    return true;
  }

  private extraerToken(request: Request): string | undefined {
    const encabezadoAuthRaw: string | undefined = request.headers.authorization;

    const encabezadoAuth: string | undefined = encabezadoAuthRaw;
    if (!encabezadoAuth) {
      return undefined;
    }

    const partes: string[] = encabezadoAuth.split(' ');
    const posibleToken: string = partes[1];

    return posibleToken;
  }
}
