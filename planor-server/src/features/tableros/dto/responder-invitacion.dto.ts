import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class ResponderInvitacionDto {
  @ApiProperty({
    description: 'Acción a realizar con la invitacióna tablero',
    enum: ['aceptar', 'rechazar'],
    example: 'aceptar',
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(['aceptar', 'rechazar'], {
    message: "accion debe ser 'aceptar' o 'rechazar'",
  })
  accion!: 'aceptar' | 'rechazar';
}
