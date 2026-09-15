import { KanbanColumn } from "../KanbanColumns/KanbanColumns";
import { TaskCard } from "@/features/tasks/components/TaskCards/TaskCards";
import type { Task } from "@/features/tasks/types/task.types";

import { kanbanBoardStyles } from "./KanbanBoard.styles";

interface KanbanBoardProps {
    tareas: Task[];
}

export function KanbanBoard({ tareas }: KanbanBoardProps) {
    const tareasPendientes = tareas.filter(
        (tarea) => tarea.estado.nombreEstado === "Pendiente"
    );

    const tareasEnEjecucion = tareas.filter(
        (tarea) => tarea.estado.nombreEstado === "En_ejecucion"
    );

    const tareasTerminadas = tareas.filter(
        (tarea) => tarea.estado.nombreEstado === "Terminado"
    );

    const tareasAprobadas = tareas.filter(
        (tarea) => tarea.estado.nombreEstado === "Aprobado"
    );

    return (
        <section
            className={kanbanBoardStyles}
            aria-label="Tablero Kanban"
        >
            <KanbanColumn state="Pendiente">
                {tareasPendientes.map((tarea) => (
                    <TaskCard
                        key={tarea.idTarea}
                        title={tarea.titulo}
                        description={
                            tarea.descripcion ?? "Sin descripción."
                        }
                        priority={tarea.prioridad ?? "Media"}
                    />
                ))}
            </KanbanColumn>

            <KanbanColumn state="En_ejecucion">
                {tareasEnEjecucion.map((tarea) => (
                    <TaskCard
                        key={tarea.idTarea}
                        title={tarea.titulo}
                        description={
                            tarea.descripcion ?? "Sin descripción."
                        }
                        priority={tarea.prioridad ?? "Media"}
                    />
                ))}
            </KanbanColumn>

            <KanbanColumn state="Terminado">
                {tareasTerminadas.map((tarea) => (
                    <TaskCard
                        key={tarea.idTarea}
                        title={tarea.titulo}
                        description={
                            tarea.descripcion ?? "Sin descripción."
                        }
                        priority={tarea.prioridad ?? "Media"}
                    />
                ))}
            </KanbanColumn>

            <KanbanColumn state="Aprobado">
                {tareasAprobadas.map((tarea) => (
                    <TaskCard
                        key={tarea.idTarea}
                        title={tarea.titulo}
                        description={
                            tarea.descripcion ?? "Sin descripción."
                        }
                        priority={tarea.prioridad ?? "Media"}
                    />
                ))}
            </KanbanColumn>
        </section>
    );
}