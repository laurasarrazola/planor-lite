/****************************************/
/*      COMPONENTE BADGE PRIORITY       */
/****************************************/

/*
 * Este archivo define el componente reutilizable BadgePriority.
 *
 * Responsabilidades:
 * 1. Recibir la prioridad.
 * 2. Solicitar los estilos a BadgePriority.styles.ts.
 * 3. Seleccionar el icono correspondiente mediante Iconify.
 * 4. Renderizar el badge.
 */

import { Icon } from "@iconify/react";

import {
    badgePriorityStyles,
    badgeContentStyles,
    badgeIconStyles,
    badgeLabelStyles,
} from "./BadgePriority.styles";

import type { BadgePriorityType } from "./BadgePriority.types";

/****************************************/
/*      MAPA DE ICONOS DE PRIORIDAD     */
/****************************************/

/*
 * Relaciona cada prioridad con su icono de Iconify.
 *
 * Los nombres corresponden a los iconos seleccionados
 * en el sistema de diseño de Figma.
 */
const priorityIcons: Record<BadgePriorityType, string> = {
    Alta: "healthicons:high-level-outline-24px",
    Media: "healthicons:medium-level-outline-24px",
    Baja: "healthicons:low-level-24px",
};

/****************************************/
/*      INTERFAZ DEL COMPONENTE         */
/****************************************/

interface BadgePriorityProps {
    priority: BadgePriorityType;
}

/****************************************/
/*     IMPLEMENTACIÓN DEL COMPONENTE   */
/****************************************/

export function BadgePriority({
    priority,
}: BadgePriorityProps) {
    return (
        <div className={badgePriorityStyles({ priority })}>

            {/* =========== BADGE CONTENT =========== */}
            <div className={badgeContentStyles}>

                {/* =========== LEFT ICON =========== */}
                <Icon
                    icon={priorityIcons[priority]}
                    className={badgeIconStyles}
                    aria-hidden="true"
                />

                {/* =========== LABEL =========== */}
                <span className={badgeLabelStyles}>
                    {priority}
                </span>

            </div>
        </div>
    );
}