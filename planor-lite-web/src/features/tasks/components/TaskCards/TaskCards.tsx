import { Icon } from "@iconify/react";
import { BadgePriority } from "../BadgePriority/BadgePriority";
import {
    taskCardStyles,
    taskCardHeaderStyles,
    taskCardTextsStyles,
    taskCardTitleStyles,
    taskCardDescriptionStyles,
    taskCardMenuStyles,
    taskCardFooterStyles,
    taskCardDueDateStyles,
    taskCardDueDateIconStyles,
    taskCardDueDateTextStyles,
} from "./TaskCards.styles";
import type { TaskCardProps } from "./TaskCards.types";

export function TaskCard({
    title,
    description,
    dueDate,
    priority,
    onOpenClick,
    onMenuClick,
}: TaskCardProps) {

    const manejarClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Evita que el click en el botón propague el evento al artículo padre
        onMenuClick?.();
    };

    return (
        <article className={taskCardStyles} onClick={onOpenClick}>

            {/* ========== HEADER ========== */}
            <header className={taskCardHeaderStyles}>

                {/* Información de la tarea */}
                <div className={taskCardTextsStyles}>
                    <h3 className={taskCardTitleStyles}>
                        {title}
                    </h3>
                    <p className={taskCardDescriptionStyles}>
                        {description}
                    </p>
                </div>

                {/* Menú de acciones */}
                <button
                    type="button"
                    aria-label={`Acciones de la tarea ${title}`}
                    className={taskCardMenuStyles}
                    onClick={manejarClickMenu}>
                    <Icon icon="lucide:ellipsis-vertical" />
                </button>

            </header>


            {/* ========== FOOTER ========== */}
            <footer className={taskCardFooterStyles}>

                {/* Fecha opcional */}
                {dueDate && (
                    <div className={taskCardDueDateStyles}>
                        <Icon
                            icon="lucide:calendar"
                            className={taskCardDueDateIconStyles} />
                        <span className={taskCardDueDateTextStyles}>
                            {dueDate}
                        </span>
                    </div>
                )}

                {/* Prioridad */}
                <BadgePriority priority={priority} />

            </footer>

        </article>
    );
}