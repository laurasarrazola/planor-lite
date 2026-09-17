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

export interface EditTaskData {
    titulo: string;
    descripcion: string;
    prioridad: 'Baja' | 'Media' | 'Alta' | null;
    fechaVencimientoTarea: string | null;
}

export interface CreateTaskData {
    idEstadoKanban: number;
    titulo: string;
    descripcion: string;
    prioridad: 'Baja' | 'Media' | 'Alta' | null;
    fechaVencimientoTarea: string | null;
}