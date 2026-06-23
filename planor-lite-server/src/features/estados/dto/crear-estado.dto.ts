import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CrearEstadoDto {
  /* Validación del nombre del estado */
  @ApiProperty({
    description: 'Nombre del estado',
    required: true,
    minLength: 1,
    maxLength: 100,
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim();
    }
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nombreEstado!: string;

  /* Validación de la posición del estado */
  @ApiProperty({
    description: 'Posición del estado',
    required: false,
    minimum: 1,
    maximum: 10,
  })
  @IsOptional()
  @IsInt()
  @Min(1, {
    message:
      'La posición del estado debe ser un número entero mayor o igual a 1.',
  })
  @Max(10, {
    message:
      'La posición del estado debe ser un número entero menor o igual a 10.',
  })
  posicionEstado?: number;
}
