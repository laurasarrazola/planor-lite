/****************************************/
/*    ESTILOS DEL COMPONENTE BUTTON     */
/****************************************/
/* Este archivo contiene únicamente los estilos visuales del componente Button. No renderiza HTML ni contiene lógica de negocio.
 * Utiliza Class Variance Authority (CVA) para generar automáticamente las clases CSS según las propiedades recibidas desde Button.tsx. */

import { cva } from "class-variance-authority";

/***************************************/
/*       CONFIGURACIÓN DE ESTILOS      */
/***************************************/
/* buttonStyles es una configuración de CVA. recibe:
 * 1. Clases comunes para todos los botones.
 * 2. Variantes (size, variant, buttonStyle y state).
 * 3. Combinaciones especiales (compoundVariants).
 * Con esa información genera automáticamente la lista final de clases CSS. */

export const buttonStyles = cva(

    /* =========== Clases comunes para TODOS los botones =========== */
    [
        "inline-flex", // Usa Flex para organizar su contenido horizontalmente.
        "max-w-full", // Impide que el botón supere el ancho disponible.
        "min-w-0", // Permite que el botón se reduzca hasta 0px si es necesario.
        "items-center", // Centra el contenido verticalmente.
        "justify-center", // Centra el contenido horizontalmente.
        "whitespace-nowrap", // Mantiene el texto en una sola línea por defecto.
        "overflow-hidden", // Evita desbordamientos visuales.
        "rounded-[8px]", // Todas las variantes utilizan el mismo radio de borde.
        "font-sans", // Todo el proyecto utiliza la fuente principal.
        "font-normal", // Todos los botones usan peso Regular (400).
        "not-italic", // El texto nunca utiliza cursiva.
        "text-center", // El texto siempre permanece centrado.
        "transition-colors", // Suaviza los cambios de color.
        "focus-visible:outline-none", // Elimina el contorno por defecto del navegador.
        "focus-visible:ring-2", // Agrega un anillo de enfoque cuando el botón está activo y es enfocado mediante teclado.
        "focus-visible:ring-[var(--color-zafiro-lavanda)]", // Color del anillo de enfoque.
        "focus-visible:ring-offset-2", // Espacio entre el botón y el anillo de enfoque.
        "focus-visible:ring-offset-[#111519]", // Color del fondo detrás del anillo de enfoque.
        "sm:whitespace-nowrap", // Mantiene el texto en una sola línea en pantallas pequeñas.
        "max-[359px]:whitespace-normal", // Permite que el texto se divida en varias líneas en pantallas muy pequeñas (menos de 360px de ancho).
    ],

    /***************************************/
    /*               VARIANTS              */
    /***************************************/
    /* Las variants representan propiedades independientes entre sí. Cada propiedad agrega clases CSS de forma aislada y aporta únicamente la parte del estilo que le corresponde. */
    {
        variants: {
            /* =========== Tamaños del botón =========== */
            /* Cada tamaño mantiene una escala visual estable. La adaptación responsive se controla principalmente mediante el contenedor que utiliza el botón. */

            size: {
                XS: [
                    "min-h-[32px]",
                    "px-[10px]",
                    "py-[6px]",
                    "gap-[6px]",
                    "text-[14px]",
                    "leading-[20px]",
                ].join(" "),

                S: [
                    "min-h-[36px]",
                    "px-[12px]",
                    "py-[8px]",
                    "gap-[6px]",
                    "text-[14px]",
                    "leading-[20px]",
                ].join(" "),

                M: [
                    "min-h-[44px]",
                    "px-[16px]",
                    "py-[10px]",
                    "gap-[8px]",
                    "text-[16px]",
                    "leading-[20px]",
                ].join(" "),

                L: [
                    "min-h-[48px]",
                    "px-[20px]",
                    "py-[12px]",
                    "gap-[8px]",
                    "text-[16px]",
                    "leading-[24px]",
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
                Active: "",
                Disabled: "cursor-not-allowed",
            },
        },

        /***************************************/
        /*        COMBINACIONES ESPECIALES     */
        /***************************************/
        /* compoundVariants define estilos que solamente aparecen cuando varias variants coinciden al mismo tiempo.
         * Esa combinación aplica únicamente los estilos definidos aquí. */
        compoundVariants: [
            /* =========== COMBINACIONES PRIMARY COLOR =========== */
            /* Primary + Filled + Default. */
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

            /* Primary + Filled + Active. */
            {
                variant: "Primary",
                buttonStyle: "Filled",
                state: "Active",
                className: [
                    "bg-[var(--button-primary-filled-active-background)]",
                    "text-[var(--button-primary-filled-active-text)]",
                    "shadow-[inset_0_4px_4px_rgba(0,0,0,0.35),inset_100px_100px_100px_rgba(255,255,255,0.25)]",
                ].join(" "),
            },

            /* Primary + Filled + Disabled. */
            {
                variant: "Primary",
                buttonStyle: "Filled",
                state: "Disabled",
                className: [
                    "bg-[var(--button-primary-filled-disabled-background)]",
                    "text-[var(--button-primary-filled-disabled-text)]",
                    "shadow-[5px_5px_5px_rgba(0,0,0,0.20)]",
                ].join(" "),
            },

            /* Primary + Outlined + Default. */
            {
                variant: "Primary",
                buttonStyle: "Outlined",
                state: "Default",
                className: [
                    "border-[var(--button-primary-outlined-border)]",
                    "text-[var(--button-primary-outlined-text)]",
                    "shadow-[5px_5px_5px_rgba(0,0,0,0.20)]",
                ].join(" "),
            },

            /* Primary + Outlined + Active. */
            {
                variant: "Primary",
                buttonStyle: "Outlined",
                state: "Active",
                className: [
                    "border-[var(--button-primary-outlined-active-border)]",
                    "text-[var(--button-primary-outlined-active-text)]",
                    "shadow-[inset_0_4px_4px_rgba(0,0,0,0.35),inset_100px_100px_100px_rgba(255,255,255,0.08)]",
                ].join(" "),
            },

            /* Primary + Outlined + Disabled. */
            {
                variant: "Primary",
                buttonStyle: "Outlined",
                state: "Disabled",
                className: [
                    "border-[var(--button-primary-outlined-disabled-border)]",
                    "text-[var(--button-primary-outlined-disabled-text)]",
                    "shadow-[5px_5px_5px_rgba(0,0,0,0.20)]",
                ].join(" "),
            },

            /* =========== COMBINACIONES CTA =========== */
            /* CTA + Filled + Default. */
            {
                variant: "CTA",
                buttonStyle: "Filled",
                state: "Default",
                className: [
                    "bg-[var(--button-cta-filled-background)]",
                    "text-[var(--button-cta-filled-text)]",
                    "shadow-[5px_5px_5px_rgba(0,0,0,0.20)]",
                ].join(" "),
            },

            /* CTA + Filled + Active. */
            {
                variant: "CTA",
                buttonStyle: "Filled",
                state: "Active",
                className: [
                    "bg-[var(--button-cta-filled-active-background)]",
                    "text-[var(--button-cta-filled-active-text)]",
                    "shadow-[inset_0_4px_4px_rgba(0,0,0,0.35),inset_100px_100px_100px_rgba(255,255,255,0.25)]",
                ].join(" "),
            },

            /* CTA + Filled + Disabled. */
            {
                variant: "CTA",
                buttonStyle: "Filled",
                state: "Disabled",
                className: [
                    "bg-[var(--button-cta-filled-disabled-background)]",
                    "text-[var(--button-cta-filled-disabled-text)]",
                    "shadow-[5px_5px_5px_rgba(0,0,0,0.20)]",
                ].join(" "),
            },

            /* CTA + Outlined + Default. */
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

            /* CTA + Outlined + Active. */
            {
                variant: "CTA",
                buttonStyle: "Outlined",
                state: "Active",
                className: [
                    "border-[var(--button-cta-outlined-active-border)]",
                    "text-[var(--button-cta-outlined-active-text)]",
                    "shadow-[inset_0_4px_4px_rgba(0,0,0,0.35),inset_100px_100px_100px_rgba(255,255,255,0.08)]",
                ].join(" "),
            },

            /* CTA + Outlined + Disabled. */
            {
                variant: "CTA",
                buttonStyle: "Outlined",
                state: "Disabled",
                className: [
                    "border-[var(--button-cta-outlined-disabled-border)]",
                    "text-[var(--button-cta-outlined-disabled-text)]",
                    "shadow-[5px_5px_5px_rgba(0,0,0,0.20)]",
                ].join(" "),
            },
        ],
    }
);