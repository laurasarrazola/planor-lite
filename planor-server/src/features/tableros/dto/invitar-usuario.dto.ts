import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RolEnTablero } from '../entities/tableros-usuarios.entity';

export class InvitarUsuarioDto {
  @ApiProperty({ example: 'usuario@dominio.com' })
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().toLowerCase();
    }
    return value as string;
  })
  emailInvitado!: string;

  @ApiProperty({
    enum: [
      RolEnTablero.EDICION_TOTAL,
      RolEnTablero.CREAR_ELIMINAR_Y_MOVER,
      RolEnTablero.SOLO_MOVER,
    ],
  })
  @IsString()
  @IsNotEmpty()
  @IsIn([
    RolEnTablero.EDICION_TOTAL,
    RolEnTablero.CREAR_ELIMINAR_Y_MOVER,
    RolEnTablero.SOLO_MOVER,
  ])
  rolInvitado!: RolEnTablero;
}
