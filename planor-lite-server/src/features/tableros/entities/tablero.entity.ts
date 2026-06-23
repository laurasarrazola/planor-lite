import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Usuarios } from '../../usuarios/entity/usuario.entity';

@Entity({ name: 'tableros' })
export class Tableros {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'idTablero',
    unsigned: true,
  })
  idTablero!: number;

  @ManyToOne(() => Usuarios, (usuario) => usuario.tablerosCreados, {
    nullable: false,
  })
  @JoinColumn({ name: 'idPropietario' })
  propietario!: Usuarios;

  @RelationId((tablero: Tableros) => tablero.propietario)
  idPropietario!: number;

  @Column({
    name: 'nombreTablero',
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  nombreTablero!: string;

  @Column({
    name: 'descripcionTablero',
    type: 'text',
    nullable: true,
  })
  descripcionTablero?: string | null;

  @Column({
    name: 'tableroActivo',
    type: 'boolean',
    default: true,
  })
  tableroActivo!: boolean;

  @CreateDateColumn({
    name: 'fechaCreacionTablero',
    type: 'datetime',
  })
  fechaCreacionTablero!: Date;

  @UpdateDateColumn({
    name: 'fechaActualizacionTablero',
    type: 'datetime',
    nullable: true,
  })
  fechaActualizacionTablero?: Date | null;
}
