import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class EliminarTareaDto {
  // Confirmación explícita para eliminar la tarea
  @ApiProperty({
    description: 'Confirmación explícita para eliminar la tarea.',
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
  @IsBoolean({
    message:
      'La confirmación de eliminación debe ser un valor booleano (true o false).',
  })
  confirmar!: boolean;
}
