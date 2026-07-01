import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenSesionInvalida } from './entities/token-sesion-invalida.entity';
import { SesionesService } from './sesiones.service';

@Module({
  imports: [TypeOrmModule.forFeature([TokenSesionInvalida])],
  providers: [SesionesService],
  exports: [SesionesService],
})
export class SesionesModule {}
