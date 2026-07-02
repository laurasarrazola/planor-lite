import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class EliminarEstadoDto {
  @ApiProperty({
    description: 'Confirmación explícita para eliminar el estado',
    example: true,
  })
  @Transform(({ value }) => {
    if (value === true || value === 'true') {
      return true;
    }

    if (value === false || value === 'false') {
      return false;
    }

    return undefined;
  })
  @IsBoolean()
  confirmar!: boolean;

  @ApiPropertyOptional({
    description: 'ID del estado destino para reasignar tareas',
    example: 3,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1, {
    message:
      'El identificador del estado destino debe ser un número entero mayor o igual a 1.',
  })
  idEstadoDestino?: number;
}
