/***************************************/
/*     ESTILOS DEL COMPONENTE INPUT    */
/***************************************/
/* Este archivo contiene únicamente los estilos visuales del componente Input. No renderiza HTML ni contiene lógica de negocio. Utiliza Class Variance Authority (CVA) para generar automáticamente las clases CSS según las propiedades recibidas desde Input.tsx. */

import { cva } from "class-variance-authority";

/************************************/
/*      ESTILOS BASE DEL INPUT      */
/************************************/
/* Este contenedor representa el componente completo. No utiliza CVA porque su apariencia nunca cambia entre Default, Focus y Disabled. */
export const inputStyles = [
    "flex",
    "flex-col",
    "items-start",
    "gap-[8px]",
    "px-[10px]",
    "py-[12px]",
    "w-full",
].join(" ");

/************************************/
/*          ESTILOS DEL LABEL       */
/************************************/
export const inputLabelStyles = cva(
    [
        "self-stretch",
        "font-sans",
        "text-[16px]",
        "font-normal",
        "leading-[100%]"
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
                className: "text-[var(--input-label-default)]",
            },
            {
                state: "Focus",
                className: "text-[var(--input-label-focus)]",
            },
            {
                state: "Disabled",
                className: "text-[var(--input-label-disabled)]",
            },
        ],
    }
);

/************************************/
/*      ESTILOS DEL CONTENEDOR      */
/************************************/
export const inputContainerStyles = cva(
    [
        "flex",
        "h-[44px]",
        "items-center",
        "gap-[12px]",
        "self-stretch",
        "rounded-[8px]",
        "px-[16px]",
        "py-[12px]"
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
                className: "border border-[var(--input-border-default)]",
            },
            {
                state: "Focus",
                className: [
                    "border-2",
                    "border-[var(--input-border-focus)]",
                    "shadow-[1px_1px_6px_0_var(--input-border-focus)]"
                ].join(" "),
            },
            {
                state: "Disabled",
                className: "border border-[var(--input-border-disabled)]",
            },
        ],
    }
);

/************************************/
/*       ESTILOS DEL INPUT         */
/************************************/
export const inputValueStyles = cva(
    [
        "w-full",
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
                    "text-[var(--color-vainilla)]",
                    "placeholder:text-[var(--input-text-default)]",
                ].join(" "),
            },
            {
                state: "Focus",
                className: [
                    "text-[var(--color-vainilla)]",
                    "placeholder:text-[var(--input-text-focus)]",
                ].join(" "),
            },
            {
                state: "Disabled",
                className: [
                    "text-[var(--input-text-disabled)]",
                    "placeholder:text-[var(--input-text-disabled)]",
                ].join(" "),
            },
        ],
    }
);

/************************************/
/*        ESTILOS HELPER TEXT       */
/************************************/
export const helperTextStyles = cva(
    [
        "text-[14px]",
        "font-light",
        "leading-[100%]",
        "text-center",
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
                className: "text-[var(--input-helper-default)]",
            },
            {
                state: "Focus",
                className:
                    "text-[var(--input-helper-focus)]",
            },
            {
                state: "Disabled",
                className:
                    "text-[var(--input-helper-disabled)]",
            },
        ],
    }
);