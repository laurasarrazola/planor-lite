import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class MoverTareaDto {
  @ApiProperty({
    description: 'Estado destino.',
    example: 5,
  })
  @Transform(({ value }) => {
    if (typeof value !== 'string') {
      return undefined;
    }
    const texto = value.trim();
    if (texto === '') {
      return undefined;
    }
    return Number(texto);
  })
  @IsInt()
  @Min(1)
  idEstadoKanban?: number;

  @ApiProperty({
    description: 'Nueva posición dentro del estado.',
    example: 2,
  })
  @Transform(({ value }: { value: unknown }) => {
    if (typeof value !== 'string') {
      return undefined;
    }
    const texto = value.trim();
    if (texto === '') {
      return undefined;
    }
    return Number(texto);
  })
  @IsInt()
  @Min(1)
  ordenEnEstado?: number;
}
