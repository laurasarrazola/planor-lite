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
        "w-[calc(100vw-32px)]",
        "max-w-[640px]",
        "max-h-[calc(100vh-32px)]",
        "overflow-hidden",
        "rounded-[10px]",
        "border",
        "bg-[var(--modal-background)]",
        "border-[var(--modal-border)]",
        "shadow-[0_0_36px_0_var(--modal-shadow)]",
        "p-[16px]",
        "sm:w-[calc(100vw-48px)]",
        "sm:max-h-[calc(100vh-48px)]",
        "sm:p-[20px]",
        "md:p-[24px]",
    ],
    {
        variants: {
            size: {
                Small: [
                    "max-w-[420px]",
                    "items-start",
                ].join(" "),

                Medium: [
                    "max-w-[640px]",
                    "items-center",
                ].join(" "),
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
    "items-center",
    "self-stretch",
    "shrink-0",
].join(" ");

/************************************/
/*         CLOSE BUTTON             */
/************************************/
export const modalCloseButtonStyles = [
    "flex",
    "h-[40px]",
    "w-[40px]",
    "shrink-0",
    "items-center",
    "justify-center",
    "rounded-[6px]",
    "border-0",
    "bg-transparent",
    "p-0",
    "transition-colors",
    "hover:bg-white/5",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[var(--color-zafiro-lavanda)]",
].join(" ");

/************************************/
/*          ICONO CERRAR            */
/************************************/
export const modalCloseIconStyles = [
    "h-[24px]",
    "w-[24px]",
    "shrink-0",
    "text-[var(--modal-close-icon)]",
    "transition-opacity",
].join(" ");

/************************************/
/*        CONTENIDO GENERAL         */
/************************************/
export const modalContentStyles = [
    "flex",
    "min-h-0",
    "flex-1",
    "flex-col",
    "items-start",
    "gap-[6px]",
    "self-stretch",
    "px-[4px]",
    "sm:px-[8px]",
].join(" ");

/************************************/
/*          MODAL HEADER            */
/************************************/
export const modalHeaderStyles = cva(
    [
        "flex",
        "flex-col",
        "items-start",
        "gap-[4px]",
        "self-stretch",
        "shrink-0",
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
        "text-[var(--modal-title)]",
        "leading-[1.2]",
        "break-words",
        "self-stretch",
    ],
    {
        variants: {
            size: {
                Small: [
                    "text-[20px]",
                    "font-semibold",
                    "sm:text-[24px]",
                ].join(" "),

                Medium: [
                    "text-[24px]",
                    "font-medium",
                    "sm:text-[28px]",
                    "md:text-[32px]",
                ].join(" "),
            },
        },
    }
);

/************************************/
/*           DESCRIPCIÓN            */
/************************************/
export const modalDescriptionStyles = cva(
    [
        "text-[var(--modal-description)]",
        "leading-[1.4]",
        "break-words",
        "self-stretch",
        "pb-[6px]",
    ],
    {
        variants: {
            size: {
                Small: [
                    "text-[14px]",
                    "font-light",
                ].join(" "),

                Medium: [
                    "text-[15px]",
                    "font-normal",
                    "sm:text-[16px]",
                ].join(" "),
            },
        },
    }
);

/************************************/
/*            MODAL BODY            */
/************************************/
export const modalBodyStyles = cva(
    [
        "flex",
        "min-h-0",
        "flex-1",
        "flex-col",
        "items-start",
        "gap-[16px]",
        "self-stretch",
        "overflow-y-auto",
        "p-[8px]",
        "sm:p-[10px]",
    ],
    {
        variants: {
            size: {
                Small: "",
                Medium: "p-[8px] sm:p-[10px]",
            },
        },
    }
);

/************************************/
/*          MODAL OVERLAY           */
/************************************/
export const modalOverlayStyles = [
    "fixed",
    "inset-0",
    "z-50",
    "flex",
    "items-center",
    "justify-center",
    "bg-[var(--color-amatista)]/40",
    "backdrop-blur-sm",
    "p-[16px]",
    "sm:p-[24px]",
].join(" ");

/************************************/
/*          MODAL ACTIONS           */
/************************************/
export const modalActionsStyles = [
    "flex",
    "w-full",
    "flex-wrap",
    "justify-end",
    "items-center",
    "gap-[8px]",
    "self-stretch",
    "shrink-0",
    "p-[8px]",
    "sm:gap-[12px]",
    "sm:p-[10px]",
].join(" ");