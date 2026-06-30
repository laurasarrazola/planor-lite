import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class EliminarEstadoDto {
  @ApiPropertyOptional({
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
  @Min(1)
  idEstadoDestino?: number;
}
