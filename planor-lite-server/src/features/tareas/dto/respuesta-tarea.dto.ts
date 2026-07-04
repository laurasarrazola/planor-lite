import { ApiProperty } from '@nestjs/swagger';

class EstadoTareaDto {
  @ApiProperty({
    description: 'Identificador del estado Kanban',
    example: 1,
  })
  idEstadoKanban!: number;

  @ApiProperty({
    description: 'Nombre del estado Kanban',
    example: 'Pendiente',
  })
  nombreEstado!: string;
}

export class RespuestaTareaDto {
  @ApiProperty({
    description: 'Identificador único de la tarea',
    example: 15,
  })
  idTarea!: number;

  @ApiProperty({
    description: 'Título de la tarea',
    example: 'Diseñar pantalla de inicio',
  })
  titulo!: string;

  @ApiProperty({
    description: 'Descripción de la tarea',
    example: 'Crear el diseño inicial de la pantalla principal.',
    nullable: true,
  })
  descripcion!: string | null;

  @ApiProperty({
    description: 'Prioridad de la tarea',
    enum: ['baja', 'media', 'alta'],
    example: 'media',
    nullable: true,
  })
  prioridad!: 'baja' | 'media' | 'alta' | null;

  @ApiProperty({
    description: 'Fecha de vencimiento de la tarea',
    example: '2026-08-15T18:00:00.000Z',
    nullable: true,
  })
  fechaVencimientoTarea!: Date | null;

  @ApiProperty({
    description: 'Posición de la tarea dentro del estado',
    example: 3,
  })
  ordenEnEstado!: number;

  @ApiProperty({
    description: 'Estado al que pertenece la tarea',
    type: EstadoTareaDto,
  })
  estado!: EstadoTareaDto;
}
