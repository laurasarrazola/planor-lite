/****************************************/
/* ESTILOS DEL COMPONENTE BADGEPRIORITY */
/****************************************/

/* Contiene únicamente los estilos visuales del BadgePriority. */

import { cva } from "class-variance-authority";

/****************************************/
/*      ESTILOS BASE DEL BADGE          */
/****************************************/

/* Estilos estructurales de la cápsula. */
export const badgePriorityStyles = cva(
    [
        "flex",
        "w-[77px]",
        "h-[20px]",
        "flex-col",
        "justify-center",
        "items-center",
        "gap-[10px]",
        "rounded-[6px]",
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
/*       ESTILOS DEL CONTENIDO         */
/****************************************/

/* Contenedor interno que agrupa icono y texto. */
export const badgeContentStyles = [
    "flex",
    "items-center",
    "justify-center",
    "gap-[10px]",
    "self-stretch",
    "px-[10px]",
    "py-[10px]",
].join(" ");

/****************************************/
/*         ESTILOS DEL ICONO            */
/****************************************/

/* Tamaño definido en Figma para el icono. */
export const badgeIconStyles = [
    "w-[15px]",
    "h-[15px]",
    "shrink-0",
].join(" ");

/****************************************/
/*          ESTILOS DEL LABEL           */
/****************************************/

/* Tipografía definida en Figma. */
export const badgeLabelStyles = [
    "text-center",
    "font-montserrat",
    "text-[11px]",
    "font-light",
    "leading-[11px]",
    "text-[var(--badge-priority-text)]",
].join(" ");