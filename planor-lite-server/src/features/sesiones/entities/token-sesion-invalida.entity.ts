// En esta entidad se almacena el token JWT de sesiones que han sido cerradas, para impedir que puedan ser reutilizadas.
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'tokens_sesion_invalida',
})
export class TokenSesionInvalida {
  @PrimaryGeneratedColumn({
    name: 'idTokenSesionInvalida',
    unsigned: true,
  })
  idTokenSesionInvalida!: number;

  @Column({
    name: 'token',
    type: 'text',
    unique: true,
  })
  token!: string;

  @Column({
    name: 'fechaExpiracion',
    type: 'datetime',
  })
  fechaExpiracion!: Date;

  @CreateDateColumn({
    name: 'fechaCierreSesion',
    type: 'datetime',
  })
  fechaCierreSesion!: Date;
}
