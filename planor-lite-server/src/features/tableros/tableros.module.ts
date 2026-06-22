import { Module } from '@nestjs/common';
import { TablerosService } from './tableros.service';
import { TablerosController } from './tableros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tableros } from './entities/tablero.entity';
import { Usuarios } from '../usuarios/entity/usuario.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { TablerosUsuarios } from './entities/tableros-usuarios.entity';
import { InvitacionesTableros } from './entities/invitaciones-tableros.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tableros,
      Usuarios,
      TablerosUsuarios,
      InvitacionesTableros,
    ]),
    UsuariosModule,
  ],
  controllers: [TablerosController],
  providers: [TablerosService],
})
export class TablerosModule {}
