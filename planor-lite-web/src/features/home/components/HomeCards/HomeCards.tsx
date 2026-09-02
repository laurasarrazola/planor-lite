/****************************************/
/*       COMPONENTE HOME CARD           */
/****************************************/
/* Este archivo define el componente reutilizable HomeCard. Responsabilidades:
 * 1. Recibir las propiedades del home card.
 * 2. Solicitar los estilos a HomeCards.styles.ts.
 * 3. Renderizar el home card.*/
import { Icon } from "@iconify/react";
import {
    homeCardStyles,
    homeCardIconBackgroundStyles,
    homeCardIconStyles,
    homeCardTextContentStyles,
    homeCardTitleStyles,
    homeCardDescriptionStyles,
} from "./HomeCards.styles";
import type { HomeCardProps } from "./HomeCards.types";

export function HomeCard({
    accent = "Amatista",
    icon,
    title,
    description,
}: HomeCardProps) {
/************************************/
/*           RENDERIZADO            */
/************************************/
    return (
        <article className={homeCardStyles({ accent })}>

            {/* ========== ICON ========== */}
            <div className={homeCardIconBackgroundStyles({ accent })}>
                <Icon
                    icon={icon}
                    className={homeCardIconStyles}
                    aria-hidden="true"
                />
            </div>

            {/* ========== TEXT CONTENT ========== */}
            <div className={homeCardTextContentStyles}>

                <h3 className={homeCardTitleStyles}>
                    {title}
                </h3>

                <p className={homeCardDescriptionStyles}>
                    {description}
                </p>
            </div>

        </article>
    );
}