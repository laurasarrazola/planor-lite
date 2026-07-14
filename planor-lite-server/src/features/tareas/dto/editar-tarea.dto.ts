import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class EditarTareaDto {
  /* Validación del estado de la tarea */
  @ApiProperty({
    description: 'Identificador del estado Kanban de la tarea.',
    required: false,
    minimum: 1,
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
  @IsOptional()
  @IsInt()
  @Min(1, {
    message:
      'El identificador del estado Kanban debe ser un número entero mayor o igual a 1.',
  })
  idEstadoKanban?: number;

  /* Validación de la posición de la tarea dentro del estado */
  @ApiProperty({
    description: 'Posición de la tarea dentro del estado.',
    required: false,
    minimum: 1,
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
  @IsOptional()
  @IsInt()
  @Min(1, {
    message:
      'La posición de la tarea debe ser un número entero mayor o igual a 1.',
  })
  ordenEnEstado?: number;

  /* Validación del título de la tarea */
  @ApiProperty({
    description: 'Título de la tarea.',
    required: false,
    minLength: 1,
    maxLength: 200,
  })
  @Transform(({ value }) => {
    if (typeof value !== 'string') {
      return undefined;
    }

    const texto = value.trim();

    if (texto === '') {
      return undefined;
    }

    return texto;
  })
  @IsOptional()
  @IsString()
  @Length(1, 200)
  titulo?: string;

  /* Validación de la descripción */
  @ApiProperty({
    description: 'Descripción de la tarea.',
    required: false,
    maxLength: 2000,
  })
  @Transform(({ value }) => {
    if (typeof value !== 'string') {
      return undefined;
    }

    const texto = value.trim();

    if (texto === '') {
      return undefined;
    }

    return texto;
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
  @Transform(({ value }) => {
    if (typeof value !== 'string') {
      return undefined;
    }

    const texto = value.trim();

    if (texto === '') {
      return undefined;
    }

    return texto.toLowerCase();
  })
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
  @Transform(({ value }) => {
    if (typeof value !== 'string') {
      return undefined;
    }

    const texto = value.trim();

    if (texto === '') {
      return undefined;
    }

    return texto;
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'La fecha de vencimiento debe tener un formato válido ISO 8601.',
    },
  )
  fechaVencimientoTarea?: string;
}
