/***************************************/
/*    ESTILOS DEL COMPONENTE BUTTON    */
/***************************************/
/* Este archivo contiene únicamente los estilos visuales del componente Button. No renderiza HTML ni contiene lógica de negocio.
 Utiliza Class Variance Authority (CVA) para generar automáticamente las clases CSS según las propiedades recibidas desde Button.tsx. */

import { cva } from "class-variance-authority";

/* ************************************/
/*   CONFIGURACIÓN DE ESTILOS BASE    */
/* ************************************/
/* buttonStyles es una configuración de CVA. recibe:
 * 1. Clases comunes para todos los botones.
 * 2. Variantes (size, variant, buttonStyle y state).
 * 3. Combinaciones especiales (compoundVariants).
 * Con esa información genera automáticamente la lista final de clases CSS.
 */
export const buttonStyles = cva(
    /* =========== Clases comunes para TODOS los botones =========== */
    [
        "inline-flex", // Usa Flex para organizar su contenido horizontalmente.
        "items-center",   // Centra el contenido verticalmente.
        "justify-center",   // Centra el contenido horizontalmente.
        "whitespace-nowrap",   // Evita que el texto se divida en varias líneas.
        "rounded-[8px]", // Todas las variantes utilizan el mismo radio de borde.
        "font-sans", // Todo el proyecto utiliza la fuente principal.
        "font-normal", // Todos los botones usan peso Regular (400).
        "not-italic", // El texto nunca utiliza cursiva.
        "text-center",// El texto siempre permanece centrado.
    ],

    /* ************************************/
    /*              VARIANTS              */
    /* ************************************/
    /* Las variants representan propiedades independientes entre sí. Cada propiedad agrega clases CSS de forma aislada y aporta únicamente la parte del estilo que le corresponde.*/
    {
        // Variantes del botón. Cada variante tiene sus propias clases CSS.
        variants: {
            /* =========== Tamaños del botón =========== */
            size: {
                XS: [
                    "px-[12px]",
                    "py-[8px]",
                    "gap-[6px]",
                    "text-[16px]",
                    "leading-[100%]",
                ].join(" "),

                S: [
                    "px-[16px]",
                    "py-[10px]",
                    "gap-[8px]",
                    "text-[24px]",
                    "leading-[100%]",
                ].join(" "),

                M: [
                    "px-[20px]",
                    "py-[12px]",
                    "gap-[8px]",
                    "text-[24px]",
                    "leading-[100%]",
                ].join(" "),

                L: [
                    "px-[24px]",
                    "py-[16px]",
                    "gap-[8px]",
                    "text-[24px]",
                    "leading-[100%]",
                ].join(" "),
            },

            /* =========== Color del botón =========== */
            variant: {
                Primary: "",
                Secondary: "",
                CTA: "",
            },

            /* =========== Estilo del botón =========== */
            buttonStyle: {
                Filled: "",
                Outlined: [
                    "bg-transparent",
                    "border-[2px]",
                ].join(" "),
            },

            /* =========== Estado visual =========== */
            state: {
                Default: "",
                Hover: "",
                Disabled: "cursor-not-allowed",
            },

        },

        /* ************************************/
        /*      COMBINACIONES ESPECIALES      */
        /* ************************************/
        /* compoundVariants define estilos que solamente aparecen cuando varias variants coinciden al mismo tiempo. Esa combinación aplica únicamente los estilos definidos aquí. */
        compoundVariants: [
            /* =========== COMBINACIONES PRIMARY COLOR =========== */
            // Primary + Filled + Default.
            {
                variant: "Primary",
                buttonStyle: "Filled",
                state: "Default",
                className: [
                    "bg-[var(--button-primary-filled-background)]",
                    "text-[var(--button-primary-filled-text)]",
                    "shadow-[5px_5px_5px_rgba(0,0,0,0.20)]",
                ].join(" "),
            },

            {
                // Primary + Filled + Hover.
                variant: "Primary",
                buttonStyle: "Filled",
                state: "Hover",
                className: [
                    "bg-[var(--button-primary-filled-background)]",
                    "text-[var(--button-primary-filled-text)]",
                    "shadow-[inset_0_4px_4px_rgba(0,0,0,0.35),inset_100px_100px_100px_rgba(255,255,255,0.25)]",
                ].join(" "),
            },

            {
                // Primary + Filled + Disabled.
                variant: "Primary",
                buttonStyle: "Filled",
                state: "Disabled",
                className: [
                    "bg-[var(--button-primary-filled-disabled-background)]",
                    "text-[var(--button-primary-filled-disabled-text)]",
                    "shadow-[5px_5px_5px_rgba(0,0,0,0.20)]",
                ].join(" "),
            },

            {
                // Primary + Outlined + Default.
                variant: "Primary",
                buttonStyle: "Outlined",
                state: "Default",
                className: [
                    "border-[var(--button-primary-outlined-border)]",
                    "text-[var(--button-primary-outlined-text)]",
                    "shadow-[5px_5px_5px_rgba(0,0,0,0.20)]",
                ].join(" "),
            },

            {
                // Primary + Outlined + Hover.
                variant: "Primary",
                buttonStyle: "Outlined",
                state: "Hover",
                className: [
                    "border-2",
                    "border-[var(--button-primary-outlined-border)]",
                    "bg-transparent",
                    "text-[var(--button-primary-outlined-text)]",
                    "shadow-[inset_0_4px_4px_rgba(0,0,0,0.35),inset_100px_100px_100px_rgba(255,255,255,0.08)]",
                ].join(" "),
            },

            {
                // Primary + Outlined + Disabled.
                variant: "Primary",
                buttonStyle: "Outlined",
                state: "Disabled",
                className: [
                    "bg-transparent",
                    "border-2",
                    "border-[var(--button-primary-outlined-disabled-border)]",
                    "text-[var(--button-primary-outlined-disabled-text)]",
                    "shadow-[5px_5px_5px_rgba(0,0,0,0.20)]",
                    "cursor-not-allowed",
                ].join(" "),
            },

            /* =========== COMBINACIONES CTA COLOR =========== */
            {
                // CTA + Filled + Default.
                variant: "CTA",
                buttonStyle: "Filled",
                state: "Default",
                className: [
                    "bg-[var(--button-cta-filled-background)]",
                    "text-[var(--button-cta-filled-text)]",
                    "shadow-[5px_5px_5px_rgba(0,0,0,0.20)]",
                ].join(" "),
            },

            {
                // CTA + Filled + Hover.
                variant: "CTA",
                buttonStyle: "Filled",
                state: "Hover",
                className: [
                    "bg-[var(--button-cta-filled-hover-background)]",
                    "text-[var(--button-cta-filled-hover-text)]",
                    "shadow-[inset_0_4px_4px_rgba(0,0,0,0.35),inset_100px_100px_100px_rgba(255,255,255,0.25)]",
                ].join(" "),
            },

            {
                // CTA + Filled + Disabled.
                variant: "CTA",
                buttonStyle: "Filled",
                state: "Disabled",
                className: [
                    "bg-[var(--button-cta-filled-disabled-background)]",
                    "text-[var(--button-cta-filled-disabled-text)]",
                    "shadow-[5px_5px_5px_rgba(0,0,0,0.20)]",
                ].join(" "),
            },

            //CTA + Outlined + Default.
            {
                variant: "CTA",
                buttonStyle: "Outlined",
                state: "Default",
                className: [
                    "border-[var(--button-cta-outlined-border)]",
                    "text-[var(--button-cta-outlined-text)]",
                    "shadow-[5px_5px_5px_rgba(0,0,0,0.20)]",
                ].join(" "),
            },

            {
                // CTA + Outlined + Hover.
                variant: "CTA",
                buttonStyle: "Outlined",
                state: "Hover",
                className: [
                    "border-2",
                    "border-[var(--button-cta-outlined-hover-border)]",
                    "bg-transparent",
                    "text-[var(--button-cta-outlined-hover-text)]",
                    "shadow-[inset_0_4px_4px_rgba(0,0,0,0.35),inset_100px_100px_100px_rgba(255,255,255,0.25)]",
                ].join(" "),
            },

            {
                // CTA + Outlined + Disabled.
                variant: "CTA",
                buttonStyle: "Outlined",
                state: "Disabled",
                className: [
                    "bg-transparent",
                    "border-2",
                    "border-[var(--button-cta-outlined-disabled-border)]",
                    "text-[var(--button-cta-outlined-disabled-text)]",
                    "shadow-[5px_5px_5px_rgba(0,0,0,0.20)]",
                ].join(" "),
            },
        ],
    });