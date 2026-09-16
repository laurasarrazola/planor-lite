
import {
    DndContext,
    closestCorners,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"; import { KanbanColumn } from "../KanbanColumns/KanbanColumns";
import { TaskCard } from "@/features/tasks/components/TaskCards/TaskCards";
import type { Task } from "@/features/tasks/types/task.types";
import type { BoardState } from "../../types/estado.types";
import type { KanbanColumnState } from "../KanbanColumns/KanbanColumns.types";
import { taskService } from "@/features/tasks/services/task.service";
import type { Dispatch, SetStateAction } from "react";
import { kanbanBoardStyles } from "./KanbanBoard.styles";

/* La interface se crea con la finalidad de definir las propiedades que recibe el componente KanbanBoard */
interface KanbanBoardProps {
    tareas: Task[];
    estados: BoardState[];
    establecerTareas: Dispatch<SetStateAction<Task[]>>;
}

/*La función que define el componente KanbanBoard */
export function KanbanBoard({
    tareas,
    estados,
    establecerTareas,
}: KanbanBoardProps) {
    /* Función que obtiene las tareas de un estado específico */
    const obtenerTareasEstado = (idEstadoKanban: number): Task[] => {
        return tareas
            .filter(
                (tarea) =>
                    tarea.estado.idEstadoKanban === idEstadoKanban
            )
            .sort(
                (tareaA, tareaB) =>
                    tareaA.ordenEnEstado - tareaB.ordenEnEstado
            );
    };

    /* Función que maneja el evento de arrastre finalizado */
    const manejarDragEnd = async (evento: DragEndEvent): Promise<void> => {
        /* Se obtiene el elemento activo (la tarea que se está moviendo) y el elemento sobre el que se soltó la tarea (over) */
        const { active, over } = evento;

        /* Si no hay un elemento sobre el que se haya soltado la tarea, se retorna */
        if (!over) {
            return;
        }

        /* idTareaMovida es el id de la tarea que se está moviendo y tareaMovida es la tarea en sí */
        const idTareaMovida = Number(active.id);
        const tareaMovida = tareas.find(
            (tarea) => tarea.idTarea === idTareaMovida
        );

        /* Si no se encuentra la tarea que se está moviendo, se retorna */
        if (!tareaMovida) {
            return;
        }

        /* idEstadoDestino es el id del estado al que se está moviendo la tarea */
        let idEstadoDestino: number | null = null;

        /* Si el elemento sobre el que se soltó la tarea es un estado, se obtiene su id. Si es otra tarea, se obtiene el id del estado de esa tarea */
        if (String(over.id).startsWith("estado-")) {
            idEstadoDestino = Number(
                String(over.id).replace("estado-", "")
            );
        } else {
            const tareaSobre = tareas.find(
                (tarea) => tarea.idTarea === Number(over.id)
            );

            /* Si se encuentra la tarea sobre la que se soltó la tarea, se obtiene su id de estado */
            if (tareaSobre) {
                idEstadoDestino =
                    tareaSobre.estado.idEstadoKanban;
            }
        }

        /* Si no se encuentra un estado destino, se retorna */
        if (idEstadoDestino === null) {
            return;
        }

        /* Se obtienen las tareas del estado destino, excluyendo la tarea que se está moviendo */
        const tareasDestino = obtenerTareasEstado(
            idEstadoDestino
        ).filter(
            (tarea) =>
                tarea.idTarea !== idTareaMovida
        );

        /* Se determina el nuevo orden de la tarea movida. Si se soltó sobre otra tarea, se coloca antes de esa tarea. Si no, se coloca al final del estado destino */
        let nuevoOrden = tareasDestino.length + 1;
        /* Se busca el índice de la tarea sobre la que se soltó la tarea movida */
        const indiceTareaSobre = tareasDestino.findIndex(
            (tarea) =>
                tarea.idTarea === Number(over.id)
        );

        /* Si se encontró la tarea sobre la que se soltó la tarea movida, se coloca después de esa tarea */
        if (indiceTareaSobre !== -1) {
            nuevoOrden = indiceTareaSobre + 1;
        }

        /* Se actualiza el estado de las tareas localmente para reflejar el cambio de estado y orden */
        const tareasAnteriores = tareas;
        const tareasActualizadas = tareas.map((tarea) => {
            if (tarea.idTarea === idTareaMovida) {
                return {
                    ...tarea,
                    estado: {
                        ...tarea.estado,
                        idEstadoKanban: idEstadoDestino,
                    },
                    ordenEnEstado: nuevoOrden,
                };
            }

            return tarea;
        });

        /* Se actualiza el estado de las tareas con las tareas actualizadas */
        establecerTareas(tareasActualizadas);
        try {
            await taskService.moverTarea(
                idTareaMovida,
                idEstadoDestino,
                nuevoOrden
            );
        } catch {
            establecerTareas(tareasAnteriores);
        }
    };

    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragEnd={manejarDragEnd}
        >
            <div className={kanbanBoardStyles}>
                {estados.map((estado) => {
                    const tareasDelEstado = obtenerTareasEstado(
                        estado.idEstadoKanban
                    );

                    return (
                        <SortableContext
                            key={estado.idEstadoKanban}
                            items={tareasDelEstado.map(
                                (tarea) => tarea.idTarea
                            )}
                            strategy={verticalListSortingStrategy}
                        >
                            <KanbanColumn
                                state={
                                    estado.nombreEstado as KanbanColumnState
                                }
                                idEstadoKanban={estado.idEstadoKanban}
                            >
                                {tareasDelEstado.map((tarea) => (
                                    <TaskCard
                                        key={tarea.idTarea}
                                        id={tarea.idTarea}
                                        title={tarea.titulo}
                                        description={
                                            tarea.descripcion ??
                                            "Sin descripción."
                                        }
                                        priority={
                                            tarea.prioridad ?? "Media"
                                        }
                                    />
                                ))}
                            </KanbanColumn>
                        </SortableContext>
                    );
                })}
            </div>
        </DndContext>
    );
}