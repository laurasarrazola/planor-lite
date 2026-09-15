export type TaskPriority =
    | "Baja"
    | "Media"
    | "Alta"
    | null;

export interface TaskState {
    idEstadoKanban: number;
    nombreEstado: string;
}

export interface Task {
    idTarea: number;
    titulo: string;
    descripcion: string | null;
    prioridad: TaskPriority;
    fechaVencimientoTarea: string | null;
    ordenEnEstado: number;
    estado: TaskState;
}