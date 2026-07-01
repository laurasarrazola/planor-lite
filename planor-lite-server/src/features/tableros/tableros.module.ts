import { Module } from '@nestjs/common';
import { TablerosService } from './tableros.service';
import { TablerosController } from './tableros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tableros } from './entities/tablero.entity';
import { Usuarios } from '../usuarios/entity/usuario.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { EstadosModule } from '../estados/estados.module';
import { SesionesModule } from '../sesiones/sesiones.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Tableros, Usuarios]),
    UsuariosModule,
    EstadosModule,
    SesionesModule,
  ],
  controllers: [TablerosController],
  providers: [TablerosService],
})
export class TablerosModule {}
