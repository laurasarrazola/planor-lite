/****************************************/
/*     ESTILOS DEL COMPONENTE MODAL     */
/****************************************/

import { cva } from "class-variance-authority";

/************************************/
/*        CONTENEDOR PRINCIPAL      */
/************************************/
export const modalStyles = cva(
    [
        "flex",
        "flex-col",
        "rounded-[10px]",
        "border",
        "bg-[var(--modal-background)]",
        "border-[var(--modal-border)]",
        "shadow-[0_0_36px_0_var(--modal-shadow)]",
        "p-[24px]",
    ],
    {
        variants: {
            size: {
                Small: "w-[420px] items-start",
                Medium: "w-[640px] items-center",
            },
        },
    }
);

/************************************/
/*         CLOSE ACTION             */
/************************************/
export const modalCloseActionStyles = [
    "flex",
    "justify-end",
    "items-start",
    "self-stretch",
].join(" ");

/************************************/
/*          ICONO CERRAR            */
/************************************/
export const modalCloseIconStyles = [
    "w-[24px]",
    "h-[24px]",
    "text-[var(--modal-close-icon)]",
].join(" ");

/************************************/
/*        CONTENIDO GENERAL         */
/************************************/
export const modalContentStyles = [
    "flex",
    "flex-col",
    "items-start",
    "gap-[6px]",
    "self-stretch",
    "px-[10px]",
].join(" ");

/************************************/
/*          MODAL HEADER            */
/************************************/
export const modalHeaderStyles = cva(
    [
        "flex",
        "flex-col",
        "items-start",
        "gap-[8px]",
        "self-stretch",
    ],
    {
        variants: {
            size: {
                Small: "px-[10px]",
                Medium: "",
            },
        },
    }
);

/************************************/
/*             TÍTULO               */
/************************************/
export const modalTitleStyles = cva(
    [
        "font-sans",
        "text-[var(--modal-title)]",
        "leading-[100%]",
        "self-stretch",
    ],
    {
        variants: {
            size: {
                Small: "text-[24px] font-semibold",
                Medium: "text-[32px] font-medium",
            },
        },
    }
);

/************************************/
/*           DESCRIPCIÓN            */
/************************************/
export const modalDescriptionStyles = cva(
    [
        "font-sans",
        "text-[var(--modal-description)]",
        "leading-[100%]",
        "self-stretch",
    ],
    {
        variants: {
            size: {
                Small: "text-[14px] font-light",
                Medium: "text-[16px] font-normal",
            },
        },
    }
);

/************************************/
/*            MODAL BODY            */
/************************************/
export const modalBodyStyles = [
    "flex",
    "flex-col",
    "items-start",
    "gap-[16px]",
    "self-stretch",
    "p-[10px]",
].join(" ");

/************************************/
/*          CONTENT INTERNO         */
/************************************/
export const modalInnerContentStyles = cva(
    [
        "flex",
        "flex-col",
        "items-start",
        "gap-[16px]",
        "self-stretch",
    ],
    {
        variants: {
            size: {
                Small: "h-[100px]",
                Medium: "p-[10px]",
            },
        },
    }
);

/************************************/
/*          MODAL ACTIONS           */
/************************************/
export const modalActionsStyles = [
    "flex",
    "justify-end",
    "items-center",
    "gap-[12px]",
    "self-stretch",
    "p-[10px]",
].join(" ");