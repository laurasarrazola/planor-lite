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
        "w-[300px]",
        "h-[220px]",
        "flex-col",
        "items-center",
        "justify-center",
        "gap-[6px]",
        "rounded-[20px]",
        "border-[0.5px]",
        "border-[var(--color-obsidiana)]",
        "bg-[#272E35]",
        "p-[24px]",
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
    "self-stretch",
    "font-sans",
    "text-[24px]",
    "font-normal",
    "leading-[100%]",
    "text-center",
    "text-[var(--color-vainilla)]",
].join(" ");

/************************************/
/*            DESCRIPTION           */
/************************************/
export const homeCardDescriptionStyles = [
    "self-stretch",
    "font-sans",
    "text-[16px]",
    "font-normal",
    "leading-[100%]",
    "text-center",
    "text-[var(--color-vainilla)]",
].join(" ");