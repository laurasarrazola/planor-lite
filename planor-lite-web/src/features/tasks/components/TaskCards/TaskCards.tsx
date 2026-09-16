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
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function TaskCard({
    id,
    title,
    description,
    dueDate,
    priority,
    onOpenClick,
    onMenuClick,
}: TaskCardProps) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
    });

    const estiloTarjeta = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const manejarClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Evita que el click en el botón propague el evento al artículo padre
        onMenuClick?.();
    };

    return (
        <article
            ref={setNodeRef}
            style={estiloTarjeta}
            className={taskCardStyles}
            onClick={onOpenClick}
            {...attributes}
            {...listeners}
        >

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
                    onPointerDown={(event) => event.stopPropagation()}
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