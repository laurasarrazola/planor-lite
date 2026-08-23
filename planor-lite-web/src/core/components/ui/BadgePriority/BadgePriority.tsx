/****************************************/
/*      COMPONENTE BADGE PRIORITY       */
/****************************************/
/* Este archivo define el componente reutilizable BadgePriority. Responsabilidades:
 * 1. Recibir las propiedades del badge.
 * 2. Solicitar los estilos a BadgePriority.styles.ts.
 * 3. Seleccionar el icono correspondiente mediante Iconify.
 * 4. Renderizar el badge.*/

import { Icon } from "@iconify/react";
import {
    badgePriorityStyles,
    badgeIconStyles,
    badgeLabelStyles,
} from "./BadgePriority.styles";
import type { BadgePriorityType } from "./BadgePriority.types";

/****************************************/
/*      MAPA DE ICONOS DE PRIORIDAD     */
/****************************************/
/* Relaciona cada prioridad con su icono de Iconify. */
const priorityIcons: Record<BadgePriorityType, string> = {
    Alta: "healthicons:high-level-outline-24px",
    Media: "healthicons:medium-level-outline-24px",
    Baja: "healthicons:low-level-24px",
};

/****************************************/
/*      INTERFAZ DEL COMPONENTE         */
/****************************************/
/*  Define el contrato del componente: indica qué propiedades puede recibir, el tipo de dato permitido para cada una y las propiedades personalizadas del sistema de diseño. */  
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

            {/* =========== ICONO =========== */}
            <Icon
                icon={priorityIcons[priority]}
                className={badgeIconStyles}
                aria-hidden="true"
            />

            {/* =========== ETIQUETA =========== */}
            <span className={badgeLabelStyles}>
                {priority}
            </span>

        </div>
    );
}