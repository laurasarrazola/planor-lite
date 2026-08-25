/****************************************/
/*   ESTILOS DEL COMPONENTE BOARD CARD  */
/****************************************/
/* Contiene únicamente los estilos visuales del boardCard. */

import { cva } from "class-variance-authority";

/****************************************/
/*      ESTILOS BASE DE BOARD CARD      */
/****************************************/
export const boardCardStyles = cva(
    [
        "flex",
        "w-[320px]",
        "h-[204px]",
        "flex-col",
        "items-start",
        "gap-[20px]",
        "rounded-[20px]",
        "border",
        "border-[rgba(255,249,228,0.10)]",
        "bg-[#191E22]",
        "p-[20px]",
        "shadow-[2px_2px_4px_0_rgba(33,6,53,0.20)]",
    ],
    {
        variants: {
            accent: {
                Amatista: "",
                ZafiroLavanda: "",
            },
        },
    }
);

/****************************************/
/*         HEADER DE BOARD CARD         */
/****************************************/
export const boardCardHeaderStyles = [
    "flex",
    "items-start",
    "justify-between",
    "self-stretch",
].join(" ");

/****************************************/
/*      INFORMACIÓN DE BOARD CARD       */
/****************************************/
export const boardCardInfoStyles = [
    "flex",
    "w-[260px]",
    "h-[112px]",
    "items-center",
    "justify-center",
    "gap-[16px]",
    "py-[13px]",
].join(" ");

/****************************************/
/*         CONTENEDOR DEL ICONO         */
/****************************************/
export const boardCardIconContainerStyles = cva(
    [
        "flex",
        "w-[56px]",
        "h-[56px]",
        "shrink-0",
        "items-center",
        "justify-center",
        "rounded-[16px]",
    ],
    {
        variants: {
            accent: {
                Amatista: "bg-[var(--color-amatista)]",
                ZafiroLavanda: "bg-[var(--color-zafiro-lavanda)]",
            },
        },
    }
);

/****************************************/
/*               ICONO                  */
/****************************************/
export const boardCardIconStyles = [
    "w-[24px]",
    "h-[24px]",
    "text-[var(--color-vainilla)]",
].join(" ");

/****************************************/
/*          TEXTOS DE BOARD CARD        */
/****************************************/
export const boardCardTextsStyles = [
    "flex",
    "min-w-0",
    "flex-1",
    "flex-col",
    "items-start",
    "gap-[4px]",
    "p-[10px]",
].join(" ");

/****************************************/
/*               TÍTULO                 */
/****************************************/
export const boardCardTitleStyles = [
    "w-full",
    "font-sans",
    "text-[24px]",
    "font-normal",
    "leading-[100%]",
    "text-[var(--color-vainilla)]",
].join(" ");

/****************************************/
/*             DESCRIPCIÓN              */
/****************************************/
export const boardCardDescriptionStyles = [
    "w-full",
    "font-sans",
    "text-[14px]",
    "font-light",
    "leading-[100%]",
    "text-[var(--color-vainilla)]",
].join(" ");

/****************************************/
/*                 MENÚ                 */
/****************************************/
export const boardCardMenuStyles = [
    "w-[20px]",
    "h-[20px]",
    "shrink-0",
    "text-[var(--color-vainilla)]",
    "cursor-pointer",
].join(" ");

/*****************************************/
/*          ESTILOS DEL BOTÓN            */
/*****************************************/
export const boardCardButtonStyles = [
    "w-full",
].join(" ");