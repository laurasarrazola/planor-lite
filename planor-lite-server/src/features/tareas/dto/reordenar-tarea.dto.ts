import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class ReordenarTareaDto {
  @ApiProperty({
    description: 'Nueva posición de la tarea dentro del estado.',
    example: 2,
    minimum: 1,
  })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  ordenEnEstado!: number;
}
