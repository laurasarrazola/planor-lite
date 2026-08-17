/***************************************/
/* ESTILOS DEL COMPONENTE BADGEPRIORITY */
/***************************************/
/* Contiene únicamente los estilos visuales del BadgePriority. */

import { cva } from "class-variance-authority";

/************************************/
/*      ESTILOS BASE DEL BADGE      */
/************************************/
/* La cápsula completa cambia únicamente según la prioridad. */
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
        Alta: "",
        Media: "",
        Baja: "",
      },
    },

    compoundVariants: [
      {
        priority: "Alta",
        className: "bg-[var(--badge-alta-background)]",
      },
      {
        priority: "Media",
        className: "bg-[var(--badge-media-background)]",
      },
      {
        priority: "Baja",
        className: "bg-[var(--badge-baja-background)]",
      },
    ],
  }
);

/************************************/
/*        ESTILOS DEL LABEL         */
/************************************/
/* El texto puede variar por prioridad, aunque inicialmente tenga el mismo color. */
export const badgeLabelStyles = cva(
  [
    "text-center",
    "font-sans",
    "text-[11px]",
    "font-light",
    "leading-[11px]",
  ],
  {
    variants: {
      priority: {
        Alta: "",
        Media: "",
        Baja: "",
      },
    },

    compoundVariants: [
      {
        priority: "Alta",
        className: "text-[var(--badge-alta-text)]",
      },
      {
        priority: "Media",
        className: "text-[var(--badge-media-text)]",
      },
      {
        priority: "Baja",
        className: "text-[var(--badge-baja-text)]",
      },
    ],
  }
);