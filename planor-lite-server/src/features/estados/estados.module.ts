import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadosKanbanController } from './estados.controller';
import { EstadosKanbanService } from './estados.service';
import { EstadosKanban } from './entities/estado.entity';
import { Tableros } from '../tableros/entities/tablero.entity';
import { Usuarios } from '../usuarios/entity/usuario.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { SesionesModule } from '../sesiones/sesiones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstadosKanban, Tableros, Usuarios]),
    UsuariosModule,
    SesionesModule,
  ],
  controllers: [EstadosKanbanController],
  providers: [EstadosKanbanService],
})
export class EstadosModule {}
