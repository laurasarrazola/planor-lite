/****************************************/
/*        ESTILOS DEL HOME CARD         */
/****************************************/
import { cva } from "class-variance-authority";

/************************************/
/*      CONTENEDOR PRINCIPAL        */
/************************************/
export const homeCardStyles = cva(
    [
        "flex",
        "w-full",
        "max-w-[300px]",
        "md:max-w-[340px]",
        "xl:max-w-[300px]",
        "min-w-0",
        "min-h-[220px]",
        "h-auto",
        "flex-col",
        "items-center",
        "justify-center",
        "gap-[6px]",
        "rounded-[20px]",
        "border-[0.5px]",
        "border-[var(--color-obsidiana)]",
        "bg-[#272E35]",
        "p-[8px]",
        "box-border",
        "shadow-[2px_5px_5px_0_rgba(0,0,0,0.40)]",
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

/************************************/
/*         ICON BACKGROUND          */
/************************************/
export const homeCardIconBackgroundStyles = cva(
    [
        "flex",
        "w-[60px]",
        "h-[60px]",
        "shrink-0",
        "items-center",
        "justify-center",
        "rounded-full",
        "p-[12px]",
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

/************************************/
/*              ICON                */
/************************************/
export const homeCardIconStyles = [
    "w-[36px]",
    "h-[36px]",
    "shrink-0",
    "aspect-square",
].join(" ");

/************************************/
/*          TEXT CONTENT            */
/************************************/
export const homeCardTextContentStyles = [
    "flex",
    "w-full",
    "min-w-0",
    "flex-col",
    "items-center",
    "justify-center",
    "self-stretch",
    "gap-[10px]",
    "px-[10px]",
    "pt-[6px]",
    "pb-[2px]",
].join(" ");

/************************************/
/*              TITLE               */
/************************************/
export const homeCardTitleStyles = [
    "w-full",
    "min-w-0",
    "font-sans",
    "text-[20px]",
    "leading-[24px]",
    "text-center",
    "text-[var(--color-vainilla)]",
    "break-words",
    "sm:text-[22px]",
    "sm:leading-[26px]",
    "md:text-[24px]",
    "md:leading-[28px]",
].join(" ");

/************************************/
/*            DESCRIPTION           */
/************************************/
export const homeCardDescriptionStyles = [
    "self-stretch",
    "min-w-0",
    "font-sans",
    "text-[16px]",
    "font-normal",
    "leading-[20px]",
    "text-center",
    "text-[var(--color-vainilla)]",
    "break-words",
].join(" ");