import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CrearTareaDto {
  /* Validación del estado donde se creará la tarea */
  @ApiProperty({
    description: 'Identificador del estado Kanban donde se creará la tarea.',
    required: true,
    minimum: 1,
  })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1, {
    message:
      'El identificador del estado Kanban debe ser un número entero mayor o igual a 1.',
  })
  idEstadoKanban!: number;

  /* Validación del título de la tarea */
  @ApiProperty({
    description: 'Título de la tarea.',
    required: true,
    minLength: 1,
    maxLength: 200,
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim();
    }
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  titulo!: string;

  /* Validación de la descripción */
  @ApiProperty({
    description: 'Descripción de la tarea.',
    required: false,
    maxLength: 2000,
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim();
    }
  })
  @IsOptional()
  @IsString()
  @Length(0, 2000)
  descripcion?: string;

  /* Validación de la prioridad */
  @ApiProperty({
    description: 'Prioridad de la tarea.',
    required: false,
    enum: ['baja', 'media', 'alta'],
  })
  @Transform(({ value }: { value: unknown }) =>
    value === '' || value === null ? undefined : value,
  )
  @IsOptional()
  @IsEnum(['baja', 'media', 'alta'], {
    message: 'La prioridad debe ser baja, media o alta.',
  })
  prioridad?: 'baja' | 'media' | 'alta';

  /* Validación de la fecha de vencimiento */
  @ApiProperty({
    description: 'Fecha de vencimiento de la tarea.',
    required: false,
    type: String,
    format: 'date-time',
  })
  @Transform(({ value }: { value: unknown }) =>
    value === '' || value === null ? undefined : value,
  )
  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'La fecha de vencimiento debe tener un formato válido ISO 8601.',
    },
  )
  fechaVencimientoTarea?: string;
}
