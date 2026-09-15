/****************************************/
/* ESTILOS DEL COMPONENTE BADGEPRIORITY */
/****************************************/
/* Contiene únicamente los estilos visuales del BadgePriority. */

import { cva } from "class-variance-authority";

/****************************************/
/*      ESTILOS BASE DEL BADGE          */
/****************************************/
/* Define la apariencia y distribución del único contenedor que agrupa el icono y la etiqueta del badge. */
export const badgePriorityStyles = cva(
    [
        "flex",
        "w-[77px]",
        "h-[20px]",
        "shrink-0",
        "items-center",
        "justify-center",
        "gap-[5px]",
        "rounded-[6px]",
        "px-[6px]",
        "py-0",
    ],
    {
        variants: {
            priority: {
                Alta: "bg-[var(--badge-alta-background)]",
                Media: "bg-[var(--badge-media-background)]",
                Baja: "bg-[var(--badge-baja-background)]",
            },
        },
    }
);

/****************************************/
/*         ESTILOS DEL ICONO            */
/****************************************/
/* Tamaño definido para el icono. */
export const badgeIconStyles = [
    "w-[15px]",
    "h-[15px]",
    "shrink-0",
    "text-[var(--badge-priority-text)]",
].join(" ");

/****************************************/
/*          ESTILOS DEL LABEL           */
/****************************************/
/* Tipografía definida y apariencia de la etiqueta */
export const badgeLabelStyles = [
    "text-center",
    "font-montserrat",
    "text-[11px]",
    "font-light",
    "leading-[11px]",
    "text-[var(--badge-priority-text)]",
].join(" ");