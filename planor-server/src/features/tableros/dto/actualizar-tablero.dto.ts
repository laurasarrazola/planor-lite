import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class ActualizarTableroDto {
  /* Validación del nombre del tablero */
  @ApiProperty({
    description: 'Nombre del tablero',
    required: false,
    minLength: 1,
    maxLength: 150,
  })
  @Transform(({ value }) => {
    if (typeof value !== 'string') return undefined;
    const trimmed = value.trim();
    if (trimmed === '') return undefined;
    return trimmed;
  })
  @IsString()
  @IsOptional()
  @Length(1, 150)
  nombreTablero?: string;

  /* Validación de la descripción del tablero */
  @ApiProperty({
    description: 'Descripción del tablero',
    required: false,
    maxLength: 3000,
  })
  @Transform(({ value }) => {
    if (typeof value !== 'string') return undefined;
    const trimmed = value.trim();
    if (trimmed === '') return undefined;
    return trimmed;
  })
  @IsOptional()
  @IsString()
  @MaxLength(3000)
  descripcionTablero?: string;
}
