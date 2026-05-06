import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
interface JwtPayload {
  email: string;
  sub: number;
  iat?: number;
  exp?: number;
}

interface RequestWithUser extends Request {
  user?: JwtPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const token: string = this.extractToken(request);
    try {
      const decoded: JwtPayload =
        await this.jwtService.verifyAsync<JwtPayload>(token);
      const reqWithUser: RequestWithUser = request as RequestWithUser;
      reqWithUser.user = decoded;
      return true;
    } catch (error: unknown) {
      const message: string =
        error instanceof Error ? error.message : 'JWT verification error';
      this.logger.warn(`JWT verification failed: ${message}`);
      throw new UnauthorizedException('Token inválido');
    }
  }

  private extractToken(request: Request): string {
    const authHeader = (request.headers['authorization'] as string) ?? null;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token requerido');
    }

    const [, token] = authHeader.split(' ');
    return token;
  }
}
