import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class EditarEstadoDto {
  /* Validación del nombre del estado */
  @ApiPropertyOptional({
    description: 'Nombre del estado',
    minLength: 1,
    maxLength: 100,
  })
  @Transform(({ value }) => {
    if (typeof value !== 'string') return undefined;
    const trimmed = value.trim();
    if (trimmed === '') return undefined;
    return trimmed;
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  nombreEstado?: string;

  /* Validación de la posición del estado */
  @ApiPropertyOptional({
    description: 'Posición del estado',
    minimum: 1,
    maximum: 10,
  })
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) {
      return undefined;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
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
