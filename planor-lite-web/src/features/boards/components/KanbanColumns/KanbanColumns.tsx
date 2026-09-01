import { Icon } from "@iconify/react";
import { Button } from "@/core/components/ui/Button/Button"
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


export const KanbanColumn = ({
    state,
    children,
    onAddTask,
}: KanbanColumnProps) => {

    return (
        <section className={kanbanColumnStyles}>

            {/***************HEADER***************/}
            <header className={kanbanColumnHeaderStyles}>
                <div className={kanbanColumnStateInfoStyles}>
                    <span
                        className={kanbanColumnStatusDotStyles({ state })}
                        aria-hidden="true" />
                    <h2 className={kanbanColumnStateNameStyles}>
                        {state}
                    </h2>
                </div>

                <button
                    type="button"
                    className={kanbanColumnAddButtonStyles}
                    aria-label={`Agregar tarea en ${state}`}
                    onClick={onAddTask}>
                    <Icon icon="lucide:plus" />
                </button>
            </header>

            {/***************LISTA DE TAREAS***************/}
            <div className={kanbanColumnTaskListStyles}>
                {children}
            </div>

            {/***************ACCIÓN PRINCIPAL***************/}
            <Button
                variant="CTA"
                buttonStyle="Outlined"
                size="XS"
                onClick={onAddTask}
                className={kanbanColumnButtonStyles}
            >
                + Agregar tarea
            </Button>

        </section>
    );
};