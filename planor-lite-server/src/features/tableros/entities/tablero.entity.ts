import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
  OneToMany,
} from 'typeorm';
import { Usuarios } from '../../usuarios/entity/usuario.entity';
import { EstadosKanban } from '../../estados/entities/estado.entity';

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

  @OneToMany(() => EstadosKanban, (estado) => estado.tablero)
  estados?: EstadosKanban[];

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
