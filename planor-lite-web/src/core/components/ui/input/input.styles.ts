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
    "min-w-0",
    "w-full",
    "flex-col",
    "items-start",
    "gap-[8px]",
    "px-[10px]",
    "py-[12px]",
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
/*       ESTILOS DEL INPUT         */
/************************************/
export const inputValueStyles = cva(
    [
        "flex",
        "h-[44px]",
        "w-full",
        "min-w-0",
        "items-center",
        "rounded-[8px]",
        "px-[16px]",
        "py-[10px]",
        "bg-transparent",
        "outline-none",
        "font-sans",
        "text-[16px]",
        "font-normal",
        "leading-[20px]",
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
                    "border",
                    "border-[var(--input-border-default)]",
                    "text-[var(--color-vainilla)]",
                    "placeholder:text-[var(--input-text-default)]",
                ].join(" "),
            },
            {
                state: "Focus",
                className: [
                    "border-2",
                    "border-[var(--input-border-focus)]",
                    "shadow-[1px_1px_6px_0_var(--input-border-focus)]",
                    "text-[var(--color-vainilla)]",
                    "placeholder:text-[var(--input-text-focus)]",
                ].join(" "),
            },
            {
                state: "Disabled",
                className: [
                    "border",
                    "border-[var(--input-border-disabled)]",
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
        "w-full",
        "min-w-0",
        "break-words",
        "text-[12px]",
        "font-light",
        "leading-[20px]",
        "text-left",
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