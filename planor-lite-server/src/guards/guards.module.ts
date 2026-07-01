import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Guards
import { AuthGuard } from './auth/auth.guard';
import { UsuariosModule } from '../features/usuarios/usuarios.module';
import { SesionesModule } from '../features/sesiones/sesiones.module';

@Global()
@Module({
  imports: [
    UsuariosModule,
    SesionesModule,
    //Configura JWT dinámicamente usando .env
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      //Construye configuración JWT usando variables de entorno.
      useFactory: (configService: ConfigService) => ({
        secret:
          configService.get<string>('JWT_SECRET') || 'your-secret-key-here',
        signOptions: {
          expiresIn: Number(configService.get('JWT_EXPIRATION')) || 604800,
          issuer: configService.get<string>('JWT_ISSUER') || 'planor-api',
          audience:
            configService.get<string>('JWT_AUDIENCE') || 'planor-client',
        },
      }),
    }),
  ],
  providers: [AuthGuard],
  exports: [AuthGuard, JwtModule],
})
export class GuardsModule {}
