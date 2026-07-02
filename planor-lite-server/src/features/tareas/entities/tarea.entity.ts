import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EstadosKanban } from '../../estados/entities/estado.entity';

@Entity('tareas')
export class Tareas {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'IdTarea',
  })
  idTarea!: number;

  /* Relaciones */
  @ManyToOne(() => EstadosKanban, (estadoKanban) => estadoKanban.tareas, {
    nullable: false,
  })
  @JoinColumn({
    name: 'IdEstadoKanban',
  })
  estadoKanban!: EstadosKanban;

  /* Información de la tarea */

  @Column({
    type: 'int',
    unsigned: true,
    default: 1,
    name: 'OrdenEnEstado',
  })
  ordenEnEstado!: number;

  @Column({
    type: 'varchar',
    length: 200,
    name: 'Titulo',
  })
  titulo!: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'Descripcion',
  })
  descripcion!: string | null;

  @Column({
    type: 'enum',
    enum: ['baja', 'media', 'alta'],
    nullable: true,
    name: 'Prioridad',
  })
  prioridad!: 'baja' | 'media' | 'alta' | null;

  @Column({
    type: 'datetime',
    nullable: true,
    name: 'FechaVencimientoTarea',
  })
  fechaVencimientoTarea!: Date | null;

  @CreateDateColumn({
    type: 'datetime',
    precision: 6,
    name: 'FechaCreacionTarea',
  })
  fechaCreacionTarea!: Date;

  @UpdateDateColumn({
    type: 'datetime',
    precision: 6,
    nullable: true,
    name: 'FechaActualizacionTarea',
  })
  fechaActualizacionTarea!: Date | null;

  @Column({
    type: 'boolean',
    default: true,
    name: 'TareaActiva',
  })
  tareaActiva!: boolean;
}
