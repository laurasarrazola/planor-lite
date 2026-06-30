import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
  Check,
  Unique,
} from 'typeorm';
import { Tableros } from '../../tableros/entities/tablero.entity';

@Entity({ name: 'estadosKanban' })
@Check(`posicionEstado BETWEEN 1 AND 1000`)
@Unique('UQ_tablero_nombreEstado', ['tablero', 'nombreEstado'])
//@Unique('UQ_tablero_posicionEstado', ['tablero', 'posicionEstado'])
export class EstadosKanban {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'idEstadoKanban',
    unsigned: true,
  })
  idEstadoKanban!: number;

  @ManyToOne(() => Tableros, (tablero) => tablero.estados, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'idTablero' })
  tablero!: Tableros;

  @RelationId((estado: EstadosKanban) => estado.tablero)
  idTablero!: number;

  @Column({
    name: 'nombreEstado',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  nombreEstado!: string;

  @Column({
    name: 'posicionEstado',
    type: 'tinyint',
    unsigned: true,
    nullable: false,
  })
  posicionEstado!: number;

  @CreateDateColumn({
    name: 'fechaCreacionEstado',
    type: 'datetime',
  })
  fechaCreacion!: Date;

  @Column({
    name: 'estadoActivo',
    type: 'boolean',
    default: true,
  })
  estadoActivo!: boolean;
}
