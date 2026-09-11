import { useState } from "react";
import { Icon } from "@iconify/react";

import { Button } from "../../../../core/components/ui/Button/Button";

import {
    boardCardStyles,
    boardCardHeaderStyles,
    boardCardInfoStyles,
    boardCardIconContainerStyles,
    boardCardIconStyles,
    boardCardTextsStyles,
    boardCardTitleStyles,
    boardCardDescriptionStyles,
    boardCardMenuStyles,
    boardCardDropdownStyles,
    boardCardDropdownOptionStyles,
    boardCardButtonStyles,
} from "./BoardCards.styles";

import type { BoardCardProps } from "./BoardCards.types";

export function BoardCard({
    accent = "Amatista",
    title,
    description,
    onEditClick,
    onDeleteClick,
    onOpenClick,
}: BoardCardProps) {
    const [mostrarMenu, establecerMostrarMenu] = useState(false);

    function manejarMenu(): void {
        establecerMostrarMenu(!mostrarMenu);
    }

    function manejarEditar(): void {
        establecerMostrarMenu(false);

        if (onEditClick) {
            onEditClick();
        }
    }

    function manejarEliminar(): void {
        establecerMostrarMenu(false);

        if (onDeleteClick) {
            onDeleteClick();
        }
    }

    return (
        <article className={boardCardStyles({ accent })}>
            {/* ========== HEADER ========== */}
            <div className={boardCardHeaderStyles}>
                {/* ========== INFORMACIÓN DEL TABLERO ========== */}
                <div className={boardCardInfoStyles}>
                    {/* ========== ICONO ========== */}
                    <div
                        className={boardCardIconContainerStyles({
                            accent,
                        })}
                    >
                        <Icon
                            icon="lucide:clipboard-check"
                            className={boardCardIconStyles}
                        />
                    </div>

                    {/* ========== TEXTOS ========== */}
                    <div className={boardCardTextsStyles}>
                        <h2 className={boardCardTitleStyles}>
                            {title}
                        </h2>

                        <p className={boardCardDescriptionStyles}>
                            {description}
                        </p>
                    </div>
                </div>

                {/* ========== MENÚ ========== */}
                <div>
                    <button
                        type="button"
                        aria-label={`Acciones del tablero ${title}`}
                        aria-expanded={mostrarMenu}
                        className={boardCardMenuStyles}
                        onClick={manejarMenu}
                    >
                        <Icon icon="lucide:ellipsis-vertical" />
                    </button>

                    {mostrarMenu && (
                        <div
                            className={boardCardDropdownStyles}
                            role="menu"
                        >
                            <button
                                type="button"
                                className={boardCardDropdownOptionStyles}
                                role="menuitem"
                                onClick={manejarEditar}
                            >
                                Editar
                            </button>

                            <button
                                type="button"
                                className={boardCardDropdownOptionStyles}
                                role="menuitem"
                                onClick={manejarEliminar}
                            >
                                Eliminar
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ========== ACCIÓN PRINCIPAL ========== */}
            <Button
                variant="CTA"
                buttonStyle="Outlined"
                size="XS"
                className={boardCardButtonStyles}
                onClick={onOpenClick}
            >
                Ir al tablero
            </Button>
        </article>
    );
}