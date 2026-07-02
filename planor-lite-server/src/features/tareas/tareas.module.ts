import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tareas } from './entities/tarea.entity';
import { TareasController } from './tareas.controller';
import { TareasService } from './tareas.service';

import { UsuariosModule } from '../usuarios/usuarios.module';
import { SesionesModule } from '../sesiones/sesiones.module';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Tareas]),
    UsuariosModule,
    SesionesModule,
    AuthModule,
  ],
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}
