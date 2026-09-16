import { Icon } from "@iconify/react";
import { Button } from "@/core/components/ui/Button/Button";
import {
    kanbanColumnStyles,
    kanbanColumnHeaderStyles,
    kanbanColumnStateInfoStyles,
    kanbanColumnStatusDotStyles,
    kanbanColumnStateNameStyles,
    kanbanColumnAddButtonStyles,
    kanbanColumnTaskListStyles,
    kanbanColumnButtonStyles,
} from "./KanbanColumns.styles";
import type { KanbanColumnProps } from "./KanbanColumns.types";
import { useDroppable } from "@dnd-kit/core";

export const KanbanColumn = ({
    state,
    idEstadoKanban,
    children,
    onAddTask,
}: KanbanColumnProps) => {
    const { setNodeRef } = useDroppable({
        id: `estado-${idEstadoKanban}`,
    });
    return (
        <section className={kanbanColumnStyles}>

            {/*************** HEADER ***************/}
            <header className={kanbanColumnHeaderStyles}>
                <div className={kanbanColumnStateInfoStyles}>
                    <span
                        className={kanbanColumnStatusDotStyles({ state })}
                        aria-hidden="true"
                    />

                    <h2 className={kanbanColumnStateNameStyles}>
                        {state === "En_ejecucion"
                            ? "En ejecución"
                            : state}
                    </h2>
                </div>

                <button
                    type="button"
                    className={kanbanColumnAddButtonStyles}
                    aria-label={`Agregar tarea en ${state}`}
                    onClick={onAddTask}
                >
                    <Icon icon="lucide:plus" />
                </button>
            </header>

            {/*************** LISTA DE TAREAS ***************/}
            <div
                ref={setNodeRef}
                className={kanbanColumnTaskListStyles}
            >
                {children}
            </div>

            {/*************** ACCIÓN PRINCIPAL ***************/}
            <Button
                variant="CTA"
                buttonStyle="Outlined"
                size="XS"
                onClick={onAddTask}
                className={kanbanColumnButtonStyles}
            >
                <Icon icon="lucide:plus" />
                Agregar tarea
            </Button>

        </section>
    );
};