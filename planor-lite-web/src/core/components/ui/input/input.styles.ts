/***************************************/
/*     ESTILOS DEL COMPONENTE INPUT    */
/***************************************/
/* Este archivo contiene únicamente los estilos visuales del componente Input. No renderiza HTML ni contiene lógica de negocio.

Utiliza Class Variance Authority (CVA) para generar automáticamente las clases CSS según las propiedades recibidas desde Input.tsx.
*/

import { cva } from "class-variance-authority";

/* ************************************/
/*   CONFIGURACIÓN DE ESTILOS BASE    */
/* ************************************/
/* inputStyles es una configuración de CVA. Recibe:
 * 1. Clases comunes para todos los inputs.
 * 2. Variantes (state).
 * 3. Combinaciones especiales (compoundVariants).
 *
 * Con esa información genera automáticamente la lista final de clases CSS.
 */
export const inputStyles = cva(
    /* =========== Clases comunes para TODOS los inputs =========== */
    [
        "flex",          // Organiza el contenido utilizando Flexbox.
        "flex-col",      // Label, Input y HelperText se organizan verticalmente.
        "items-start",   // Alinea todos los elementos al inicio.
        "gap-[6px]",     // Espacio entre los elementos principales.
        "px-[10px]",     // Padding horizontal definido en Figma.
        "py-[12px]",     // Padding vertical definido en Figma.
        "w-full",        // El ancho lo controla el componente padre.
    ],

    /* ************************************/
    /*              VARIANTS              */
    /* ************************************/
    /* Las variants representan propiedades independientes entre sí.
     * Cada propiedad agrega clases CSS de forma aislada y aporta únicamente
     * la parte del estilo que le corresponde.
     */
    {
        variants: {
            /* =========== Estado visual =========== */
            state: {
                Default: "",
                Focus: "",
                Disabled: "",
            },
        },
        compoundVariants: [
            // Estado Default.
            {
                state: "Default",
                className: "",
            },
            // Estado Focus.
            {
                state: "Focus",
                className: "",
            },
            // Estado Disabled.
            {
                state: "Disabled",
                className: "",
            },
        ],
    }
);

/************************************/
/*          ESTILOS DEL LABEL       */
/************************************/
export const inputLabelStyles = cva(
    [
        "self-stretch",
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
                className:
                    "border border-[var(--input-border-default)]",
            },
            {
                state: "Focus",
                className: [
                    "border-2",
                    "border-[var(--input-border-focus)]",
                    "shadow-[1px_1px_6px_0_var(--input-border-focus)]"
                ]
            },
            {
                state: "Disabled",
                className:
                    "border border-[var(--input-border-disabled)]",
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
            /* =========== ESTADO DEFAULT =========== */
            {
                state: "Default",
                className: [
                    "text-[var(--color-vainilla)]",
                    "placeholder:text-[var(--input-text-default)]",
                ].join(" "),
            },

            /* =========== ESTADO FOCUS =========== */
            {
                state: "Focus",
                className: [
                    "text-[var(--color-vainilla)]",
                    "placeholder:text-[var(--input-text-focus)]",
                ].join(" "),
            },

            /* =========== ESTADO DISABLED =========== */
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