import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
interface JwtPayload {
  id: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('AuthGuard canActivate called');
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);
    this.logger.log('Guard ejecutándose');
    const decodedToken = await this.jwtService.verifyAsync<JwtPayload>(token);
    console.log('Decoded Token:', decodedToken);
    return true;
  }

  private extractToken(request: Request): string {
    const authHeader = (request.headers['authorization'] as string) ?? null;
    console.log('Auth Header:', authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token requerido');
    }

    const [, token] = authHeader.split(' ');
    return token;
  }
}
