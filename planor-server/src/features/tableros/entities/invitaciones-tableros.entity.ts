import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Tableros } from './tablero.entity';
import { Usuarios } from '../../usuarios/entity/usuario.entity';

export enum EstadoInvitacion {
  PENDIENTE = 'pendiente',
  ACEPTADA = 'aceptada',
  RECHAZADA = 'rechazada',
}

@Entity({ name: 'invitaciones_tableros' })
export class InvitacionesTableros {
  @PrimaryGeneratedColumn({ unsigned: true })
  idInvitacionTablero!: number;

  @ManyToOne(() => Tableros, (t) => t.idTablero)
  @JoinColumn({ name: 'idTablero' })
  tablero!: Tableros;

  @ManyToOne(() => Usuarios, (u) => u.idUsuario)
  @JoinColumn({ name: 'idUsuarioInvitado' })
  usuarioInvitado!: Usuarios;

  @ManyToOne(() => Usuarios, (u) => u.idUsuario)
  @JoinColumn({ name: 'invitadoPor' })
  invitadoPor!: Usuarios;

  @Column({
    type: 'enum',
    enum: ['edicionTotal', 'crearEliminarYMover', 'soloMover'],
  })
  rolInvitado!: string;

  @Column({
    type: 'enum',
    enum: EstadoInvitacion,
    default: EstadoInvitacion.PENDIENTE,
  })
  estadoInvitacion!: EstadoInvitacion;

  @CreateDateColumn({ type: 'datetime' })
  fechaAsignacion!: Date;

  @Column({ type: 'datetime', nullable: true })
  fechaRespuesta?: Date | null;
}
