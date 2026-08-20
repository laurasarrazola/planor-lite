/***************************************/
/*   ESTILOS DEL COMPONENTE TEXTAREA   */
/***************************************/
/* Este archivo contiene únicamente los estilos visuales del componente TextArea. No renderiza HTML ni contiene lógica de negocio. Utiliza Class Variance Authority (CVA) para generar automáticamente las clases CSS según el estado recibido desde TextArea.tsx. */

import { cva } from "class-variance-authority";

/************************************/
/*     ESTILOS BASE DEL TEXTAREA    */
/************************************/
/* Este contenedor representa el componente completo. No utiliza CVA porque nunca cambia entre Default, Focus o Disabled. Todos sus estilos son fijos. */
export const textAreaStyles = [
  "inline-flex",
  "flex-col",
  "items-start",
  "gap-[6px]",
  "p-[10px]",
].join(" ");


/************************************/
/*       ESTILOS DEL CONTENEDOR     */
/************************************/
/* Contiene Label, TextAreaContainer y HelperText. Su apariencia nunca cambia, por lo que no requiere variantes ni CVA. */
export const textAreaContentStyles = [
  "flex",
  "flex-col",
  "items-start",
  "gap-[8px]",
  "p-[10px]",
].join(" ");

/************************************/
/*          ESTILOS DEL LABEL       */
/************************************/
export const textAreaLabelStyles = cva(
    [
        "font-sans",
        "text-[16px]",
        "font-normal",
        "leading-[100%]",
    ],
    {
        variants: {
            state: {
                Default: "",
                Focus: "",
                Disabled: "",
            },
        },

        compoundVariants: [
            {
                state: "Default",
                className: "text-[var(--textarea-label-default)]",
            },
            {
                state: "Focus",
                className: "text-[var(--textarea-label-focus)]",
            },
            {
                state: "Disabled",
                className: "text-[var(--textarea-label-disabled)]",
            },
        ],
    }
);

/************************************/
/*      ESTILOS DEL CONTENEDOR      */
/************************************/
export const textAreaContainerStyles = cva(
    [
        "flex",
        "w-[320px]",
        "h-[120px]",
        "items-start",
        "gap-[8px]",
        "rounded-[6px]",
        "px-[16px]",
        "py-[12px]",
    ],
    {
        variants: {
            state: {
                Default: "",
                Focus: "",
                Disabled: "",
            },
        },

        compoundVariants: [
            {
                state: "Default",
                className: "border border-[var(--textarea-border-default)]",
            },
            {
                state: "Focus",
                className: [
                    "border-2",
                    "border-[var(--textarea-border-focus)]",
                    "shadow-[1px_1px_6px_0_var(--textarea-border-focus)]",
                ].join(" "),
            },
            {
                state: "Disabled",
                className: "border border-[var(--textarea-border-disabled)]",
            },
        ],
    }
);

/************************************/
/*       ESTILOS DEL TEXTAREA       */
/************************************/
export const textAreaValueStyles = cva(
    [
        "w-full",
        "h-full",
        "resize-none",
        "bg-transparent",
        "border-none",
        "outline-none",
        "ring-0",
        "focus:outline-none",
        "focus:ring-0",
        "font-sans",
        "text-[16px]",
        "font-normal",
        "leading-[100%]",
        "caret-[var(--color-vainilla)]",
    ],
    {
        variants: {
            state: {
                Default: "",
                Focus: "",
                Disabled: "",
            },
        },

        compoundVariants: [
            {
                state: "Default",
                className: [
                    "text-[var(--textarea-text-default)]",
                    "placeholder:text-[var(--textarea-placeholder-default)]",
                ].join(" "),
            },
            {
                state: "Focus",
                className: [
                    "text-[var(--textarea-text-focus)]",
                    "placeholder:text-[var(--textarea-placeholder-focus)]",
                ].join(" "),
            },
            {
                state: "Disabled",
                className: [
                    "text-[var(--textarea-text-disabled)]",
                    "placeholder:text-[var(--textarea-placeholder-disabled)]",
                ].join(" "),
            },
        ],
    }
);

/************************************/
/*        ESTILOS HELPER TEXT       */
/************************************/
export const textAreaHelperTextStyles = cva(
    [
        "font-sans",
        "text-[14px]",
        "font-light",
        "leading-[100%]",
    ],

    {
        variants: {
            state: {
                Default: "",
                Focus: "",
                Disabled: "",
            },
        },

        compoundVariants: [

            {
                state: "Default",
                className: "text-[var(--textarea-helper-default)]",
            },
            {
                state: "Focus",
                className: "text-[var(--textarea-helper-focus)]",
            },
            {
                state: "Disabled",
                className: "text-[var(--textarea-helper-disabled)]",
            },
        ],
    }
);