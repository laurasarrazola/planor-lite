import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Column,
  Unique,
} from 'typeorm';
import { Tableros } from './tablero.entity';
import { Usuarios } from '../../usuarios/entity/usuario.entity';

export enum RolEnTablero {
  PROPIETARIO = 'propietario',
  EDICION_TOTAL = 'edicionTotal',
  CREAR_ELIMINAR_Y_MOVER = 'crearEliminarYMover',
  SOLO_MOVER = 'soloMover',
}

@Entity({ name: 'tableros_usuarios' })
@Unique(['tablero', 'usuario'])
export class TablerosUsuarios {
  @PrimaryGeneratedColumn({
    name: 'idTableroUsuario',
    type: 'int',
    unsigned: true,
  })
  idTableroUsuario!: number;

  @ManyToOne(() => Tableros, (t: Tableros) => t.miembros, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'idTablero' })
  tablero!: Tableros;

  @ManyToOne(() => Usuarios, (u: Usuarios) => u.tablerosUsuarios, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'idUsuario' })
  usuario!: Usuarios;

  @Column({ type: 'enum', enum: RolEnTablero })
  rolEnTablero!: RolEnTablero;

  @CreateDateColumn({ name: 'fechaAsignacion', type: 'datetime' })
  fechaAsignacion!: Date;
}
