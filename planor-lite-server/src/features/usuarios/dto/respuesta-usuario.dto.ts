import { ApiProperty } from '@nestjs/swagger';

export class RespuestaUsuarioDto {
  @ApiProperty({
    description: 'Identificador único del usuario',
    example: 1,
  })
  idUsuario!: number;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Laura',
  })
  nombreUsuario!: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Sarrazola',
  })
  apellidoUsuario!: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'laura@email.com',
  })
  email!: string;

  @ApiProperty({
    description: 'Fecha de registro del usuario',
    example: '2026-07-02T18:00:00.000Z',
  })
  fechaRegistro!: Date;

  @ApiProperty({
    description: 'Indica si el usuario está activo',
    example: true,
  })
  usuarioActivo!: boolean;

  @ApiProperty({
    description: 'Rol del usuario en el sistema',
    enum: ['admin', 'usuario'],
    example: 'usuario',
  })
  rolSistema!: 'admin' | 'usuario';
}
