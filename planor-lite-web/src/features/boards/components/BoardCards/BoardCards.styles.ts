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
        "w-full",
        "max-w-[320px]",
        "min-w-0",
        "min-h-[204px]",
        "flex-col",
        "items-start",
        "gap-[20px]",
        "rounded-[20px]",
        "border",
        "border-[rgba(255,249,228,0.10)]",
        "bg-[#191E22]",
        "p-[20px]",
        "box-border",
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
    "w-full",
    "min-w-0",
    "items-start",
    "justify-between",
    "gap-[8px]",
].join(" ");

/****************************************/
/*      INFORMACIÓN DE BOARD CARD       */
/****************************************/
export const boardCardInfoStyles = [
    "flex",
    "w-full",
    "min-w-0",
    "max-w-full",
    "flex-1",
    "min-h-[112px]",
    "items-center",
    "justify-center",
    "gap-[16px]",
    "py-[13px]",
    "box-border",
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
    "shrink-0",
    "text-[var(--color-vainilla)]",
].join(" ");

/****************************************/
/*          TEXTOS DE BOARD CARD        */
/****************************************/
export const boardCardTextsStyles = [
    "flex",
    "w-full",
    "min-w-0",
    "max-w-full",
    "flex-1",
    "flex-col",
    "items-start",
    "gap-[4px]",
    "p-[10px]",
    "box-border",
].join(" ");

/****************************************/
/*               TÍTULO                 */
/****************************************/
export const boardCardTitleStyles = [
    "w-full",
    "min-w-0",
    "text-[24px]",
    "font-normal",
    "leading-[29px]",
    "text-[var(--color-vainilla)]",
    "break-words",
].join(" ");

/****************************************/
/*             DESCRIPCIÓN              */
/****************************************/
export const boardCardDescriptionStyles = [
    "w-full",
    "min-w-0",
    "text-[14px]",
    "font-light",
    "leading-[20px]",
    "text-[var(--color-vainilla)]",
    "break-words",
].join(" ");

/****************************************/
/*                 MENÚ                 */
/****************************************/
export const boardCardMenuStyles = [
    "w-[20px]",
    "h-[20px]",
    "shrink-0",
    "border-0",
    "bg-transparent",
    "p-0",
    "text-[var(--color-vainilla)]",
    "cursor-pointer",
].join(" ");

/*****************************************/
/*          ESTILOS DEL BOTÓN            */
/*****************************************/
export const boardCardButtonStyles = [
    "w-full",
    "max-w-full",
    "min-w-0",
].join(" ");