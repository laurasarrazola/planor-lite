import {
    DndContext,
    DragOverlay,
    PointerSensor,
    closestCorners,
    useSensor,
    useSensors,
    type DragEndEvent,
    type DragStartEvent,
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
import { useState, type Dispatch, type SetStateAction } from "react";
import { kanbanBoardStyles } from "./KanbanBoard.styles";
import { EditTaskModal } from "@/features/tasks/components/EditTaskModal/EditTaskModal";
import { DeleteTaskModal } from "@/features/tasks/components/DeleteTaskModal/DeleteTaskModal";
import { TaskDetailModal } from "@/features/tasks/components/TaskDetailModal/TaskDetailModal";

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
    const sensorArrastreTarjetas = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 8,
        },
    });

    const sensoresArrastreTarjetas = useSensors(sensorArrastreTarjetas);

    const [tareaArrastrada, establecerTareaArrastrada] =
        useState<Task | null>(null);

    const [tareaEditar, establecerTareaEditar] =
        useState<Task | null>(null);

    const [tareaEliminar, establecerTareaEliminar] =
        useState<Task | null>(null);

    const [tareaDetalle, establecerTareaDetalle] =
        useState<Task | null>(null);

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

    /* Función que identifica la tarea que comenzó a arrastrarse */
    const manejarDragStart = (evento: DragStartEvent): void => {
        const idTareaArrastrada = Number(evento.active.id);

        const tareaEncontrada = tareas.find(
            (tarea) => tarea.idTarea === idTareaArrastrada
        );

        if (tareaEncontrada) {
            establecerTareaArrastrada(tareaEncontrada);
        }
    };

    /* Función que limpia la tarea cuando se cancela el arrastre */
    const manejarDragCancel = (): void => {
        establecerTareaArrastrada(null);
    };

    /* Función que maneja el evento de arrastre finalizado */
    const manejarDragEnd = async (evento: DragEndEvent): Promise<void> => {
        /* Se obtiene la tarea movida y el elemento sobre el que se soltó */
        const { active, over } = evento;

        /* Se limpia la tarea mostrada en el DragOverlay */
        establecerTareaArrastrada(null);

        /* Si no existe un elemento destino, no se realiza ningún cambio */
        if (!over) {
            return;
        }

        /* Se obtiene el ID de la tarea que se está moviendo */
        const idTareaMovida = Number(active.id);

        /* Se busca la tarea dentro del estado actual */
        const tareaMovida = tareas.find(
            (tarea) => tarea.idTarea === idTareaMovida
        );

        /* Si no se encuentra la tarea, se termina la operación */
        if (!tareaMovida) {
            return;
        }

        /* Si se suelta sobre la misma tarea, no se realiza ningún cambio */
        if (Number(over.id) === idTareaMovida) {
            return;
        }

        /* Se obtiene el estado actual de la tarea */
        const idEstadoOrigen =
            tareaMovida.estado.idEstadoKanban;

        /* Se determina el estado destino */
        let idEstadoDestino: number | null = null;

        /* Si se soltó directamente sobre una columna */
        if (String(over.id).startsWith("estado-")) {
            idEstadoDestino = Number(
                String(over.id).replace("estado-", "")
            );
        } else {
            /* Si se soltó sobre otra tarea, se obtiene su estado */
            const tareaSobre = tareas.find(
                (tarea) =>
                    tarea.idTarea === Number(over.id)
            );

            if (tareaSobre) {
                idEstadoDestino =
                    tareaSobre.estado.idEstadoKanban;
            }
        }

        /* Si no se pudo determinar el estado destino, se termina la operación */
        if (idEstadoDestino === null) {
            return;
        }

        /* Se determina si la tarea permanece en el mismo estado */
        const esMismoEstado =
            idEstadoOrigen === idEstadoDestino;

        /* Se obtienen las tareas del estado destino sin la tarea movida */
        const tareasDestino = obtenerTareasEstado(
            idEstadoDestino
        ).filter(
            (tarea) =>
                tarea.idTarea !== idTareaMovida
        );

        /* Se determina la lista que se utilizará para insertar la tarea */
        let tareasParaReordenar: Task[];

        if (esMismoEstado) {
            tareasParaReordenar =
                obtenerTareasEstado(idEstadoOrigen).filter(
                    (tarea) =>
                        tarea.idTarea !== idTareaMovida
                );
        } else {
            tareasParaReordenar = tareasDestino;
        }

        /* Por defecto la tarea se coloca al final */
        let nuevoOrden = tareasParaReordenar.length + 1;

        /* Se busca la tarea sobre la que se soltó */
        const indiceTareaSobre =
            tareasParaReordenar.findIndex(
                (tarea) =>
                    tarea.idTarea === Number(over.id)
            );

        if (indiceTareaSobre !== -1) {
            /* Obtener la posición visual de la tarjeta sobre la que se soltó */
            const rectTareaSobre = over.rect;

            /* Obtener la posición actual de la tarjeta que se está arrastrando */
            const rectTareaArrastrada =
                evento.active.rect.current.translated;

            if (rectTareaArrastrada) {
                /* Calcular el centro vertical de ambas tarjetas */
                const centroTareaArrastrada =
                    rectTareaArrastrada.top +
                    rectTareaArrastrada.height / 2;

                const centroTareaSobre =
                    rectTareaSobre.top +
                    rectTareaSobre.height / 2;

                /* Si la tarjeta está debajo del centro, se inserta después */
                if (
                    centroTareaArrastrada >
                    centroTareaSobre
                ) {
                    nuevoOrden = indiceTareaSobre + 2;
                } else {
                    /* Si está encima del centro, se inserta antes */
                    nuevoOrden = indiceTareaSobre + 1;
                }
            }
        }

        /* Evitar que la posición supere el último lugar disponible */
        nuevoOrden = Math.min(
            nuevoOrden,
            tareasParaReordenar.length + 1
        );

        /* Se crea una nueva lista con la tarea en su nueva posición */
        const tareasReordenadas = [
            ...tareasParaReordenar,
        ];

        tareasReordenadas.splice(
            nuevoOrden - 1,
            0,
            tareaMovida
        );

        /* Se guardan las tareas anteriores para poder recuperar el estado */
        const tareasAnteriores = tareas;

        /* Se obtienen las tareas del estado de origen sin la tarea movida */
        const tareasOrigen = obtenerTareasEstado(
            idEstadoOrigen
        ).filter(
            (tarea) =>
                tarea.idTarea !== idTareaMovida
        );

        /* Se actualizan las tareas localmente */
        const tareasActualizadas = tareas.map(
            (tarea) => {
                /* Buscar la posición de la tarea dentro del estado destino */
                const indiceDestino =
                    tareasReordenadas.findIndex(
                        (tareaReordenada) =>
                            tareaReordenada.idTarea ===
                            tarea.idTarea
                    );

                /* Actualizar las tareas del estado destino */
                if (indiceDestino !== -1) {
                    return {
                        ...tarea,
                        estado: {
                            ...tarea.estado,
                            idEstadoKanban:
                                idEstadoDestino,
                        },
                        ordenEnEstado:
                            indiceDestino + 1,
                    };
                }

                /* Si cambió de estado, reorganizar el estado de origen */
                if (!esMismoEstado) {
                    const indiceOrigen =
                        tareasOrigen.findIndex(
                            (tareaOrigen) =>
                                tareaOrigen.idTarea ===
                                tarea.idTarea
                        );

                    if (indiceOrigen !== -1) {
                        return {
                            ...tarea,
                            ordenEnEstado:
                                indiceOrigen + 1,
                        };
                    }
                }

                return tarea;
            }
        );

        /* Se actualiza inmediatamente la interfaz */
        establecerTareas(tareasActualizadas);

        try {
            /* Se guarda el cambio en la base de datos */
            await taskService.moverTarea(
                idTareaMovida,
                idEstadoDestino,
                nuevoOrden
            );
        } catch {
            /* Si falla el servidor, se recupera el estado anterior */
            establecerTareas(tareasAnteriores);
        }
    };

    let tarjetaArrastrada: React.ReactNode = null;

    /* Se muestra la tarjeta que se está arrastrando en el DragOverlay */
    if (tareaArrastrada) {
        tarjetaArrastrada = (
            <TaskCard
                id={tareaArrastrada.idTarea}
                title={tareaArrastrada.titulo}
                description={
                    tareaArrastrada.descripcion ??
                    "Sin descripción."
                }
                priority={
                    tareaArrastrada.prioridad ?? "Media"
                }
                esVistaPrevia
            />
        );
    }

    return (
        <DndContext
            collisionDetection={closestCorners}
            sensors={sensoresArrastreTarjetas}
            onDragStart={manejarDragStart}
            onDragCancel={manejarDragCancel}
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
                                        dueDate={
                                            tarea.fechaVencimientoTarea ?? undefined
                                        }
                                        onOpenClick={() => establecerTareaDetalle(tarea)}
                                        onEditClick={() => establecerTareaEditar(tarea)}
                                        onDeleteClick={() => establecerTareaEliminar(tarea)}
                                    />
                                ))}
                            </KanbanColumn>
                        </SortableContext>
                    );
                })}
            </div>

            <DragOverlay>
                {tarjetaArrastrada}
            </DragOverlay>

            {tareaDetalle && (
                <TaskDetailModal
                    tarea={tareaDetalle}
                    onClose={() => establecerTareaDetalle(null)}
                />
            )}

            {tareaEditar && (
                <EditTaskModal
                    tarea={tareaEditar}
                    onClose={() => establecerTareaEditar(null)}
                    onUpdated={(tareaActualizada) => {
                        establecerTareas((tareasActuales) =>
                            tareasActuales.map((tarea) => {
                                if (tarea.idTarea === tareaActualizada.idTarea) {
                                    return tareaActualizada;
                                }

                                return tarea;
                            })
                        );
                    }}
                />
            )}

            {tareaEliminar && (
                <DeleteTaskModal
                    tarea={tareaEliminar}
                    onClose={() => establecerTareaEliminar(null)}
                    onDeleted={(idTarea) => {
                        establecerTareas((tareasActuales) =>
                            tareasActuales.filter(
                                (tarea) => tarea.idTarea !== idTarea
                            )
                        );
                    }}
                />
            )}
        </DndContext>
    );
}
