import { Icon } from "@iconify/react";
import {
    useState,
    type KeyboardEvent,
    type MouseEvent,
    type PointerEvent,
} from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BadgePriority } from "../BadgePriority/BadgePriority";
import {
    taskCardStyles,
    taskCardHeaderStyles,
    taskCardTextsStyles,
    taskCardTitleStyles,
    taskCardDescriptionStyles,
    taskCardMenuStyles,
    taskCardDropdownStyles,
    taskCardDropdownOptionStyles,
    taskCardFooterStyles,
    // taskCardDueDateStyles,
    // taskCardDueDateIconStyles,
    // taskCardDueDateTextStyles,
} from "./TaskCards.styles";
import type { TaskCardProps } from "./TaskCards.types";

export function TaskCard({
    id,
    title,
    description,
    // dueDate,
    priority,
    onOpenClick,
    onEditClick,
    onDeleteClick,
    esVistaPrevia = false,
}: TaskCardProps) {
    const [mostrarMenu, establecerMostrarMenu] = useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
        disabled: esVistaPrevia,
    });

    const estiloTarjeta = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    function manejarClickMenu(evento: MouseEvent<HTMLButtonElement>): void {
        evento.stopPropagation();
        establecerMostrarMenu(!mostrarMenu);
    }

    function manejarEditar(): void {
        establecerMostrarMenu(false);

        if (onEditClick) {
            onEditClick();
        }
    }

    function detenerPropagacionInicioMenu(
        evento: PointerEvent<HTMLDivElement | HTMLButtonElement>
    ): void {
        evento.stopPropagation();
    }

    function manejarEliminar(): void {
        establecerMostrarMenu(false);

        if (onDeleteClick) {
            onDeleteClick();
        }
    }

    function manejarInicioArrastre(evento: PointerEvent<HTMLElement>): void {
        const manejadorInicioArrastre = listeners?.onPointerDown;

        if (manejadorInicioArrastre) {
            manejadorInicioArrastre(evento);
        }
    }

    function manejarTeclaArrastre(evento: KeyboardEvent<HTMLElement>): void {
        const manejadorTeclaArrastre = listeners?.onKeyDown;

        if (manejadorTeclaArrastre) {
            manejadorTeclaArrastre(evento);
        }
    }

    return (
        <article
            ref={setNodeRef}
            style={estiloTarjeta}
            className={taskCardStyles}
            onClick={onOpenClick}
            role={attributes.role}
            tabIndex={attributes.tabIndex}
            aria-disabled={attributes["aria-disabled"]}
            aria-pressed={attributes["aria-pressed"]}
            aria-roledescription={attributes["aria-roledescription"]}
            aria-describedby={attributes["aria-describedby"]}
            onPointerDown={manejarInicioArrastre}
            onKeyDown={manejarTeclaArrastre}
        >

            {/* ========== HEADER ========== */}
            <header className={taskCardHeaderStyles}>

                {/* Información de la tarea */}
                <div className={taskCardTextsStyles}>
                    <h3 className={taskCardTitleStyles}>{title}</h3>

                    <p className={taskCardDescriptionStyles}>
                        {description}
                    </p>
                </div>
                {/* Menú de acciones */}
                <div onPointerDown={detenerPropagacionInicioMenu}>
                    <button
                        type="button"
                        aria-label={`Acciones de la tarea ${title}`}
                        aria-expanded={mostrarMenu}
                        className={taskCardMenuStyles}
                        onClick={manejarClickMenu}
                    >
                        <Icon icon="lucide:ellipsis-vertical" />
                    </button>

                    {mostrarMenu && (
                        <div
                            className={taskCardDropdownStyles}
                            role="menu"
                            onPointerDown={detenerPropagacionInicioMenu}
                        >
                            <button
                                type="button"
                                className={taskCardDropdownOptionStyles}
                                role="menuitem"
                                onClick={manejarEditar}
                            >
                                Editar
                            </button>

                            <button
                                type="button"
                                className={taskCardDropdownOptionStyles}
                                role="menuitem"
                                onClick={manejarEliminar}
                            >
                                Eliminar
                            </button>
                        </div>
                    )}
                </div>
            </header>


            {/* ========== FOOTER ========== */}
            <footer className={taskCardFooterStyles}>

                {/* Fecha opcional
                {dueDate && (
                    <div className={taskCardDueDateStyles}>
                        <Icon
                            icon="lucide:calendar"
                            className={taskCardDueDateIconStyles}
                        />

                        <span className={taskCardDueDateTextStyles}>
                            {dueDate}
                        </span>
                    </div>
                )} */}

                {/* Prioridad */}
                <BadgePriority priority={priority} />
            </footer>
        </article>
    );
}