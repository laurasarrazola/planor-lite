import { Icon } from "@iconify/react";
import { Button } from "../Button/Button";
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
    boardCardButtonStyles,
} from "./BoardCards.styles";
import type { BoardCardProps } from "./BoardCards.types";

export function BoardCard({
    accent = "Amatista",
    title,
    description,
    onMenuClick,
    onOpenClick,
}: BoardCardProps) {
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
                        })}>
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
                <button
                    type="button"
                    aria-label={`Acciones del tablero ${title}`}
                    className={boardCardMenuStyles}
                    onClick={onMenuClick}>
                    <Icon icon="lucide:ellipsis-vertical" />
                </button>
            </div>

            {/* ========== ACCIÓN PRINCIPAL ========== */}
            <Button
                variant="CTA"
                buttonStyle="Outlined"
                size="XS"
                className={boardCardButtonStyles}
                onClick={onOpenClick}>
                Ir al tablero
            </Button>
            
        </article>
    );
}