/****************************************/
/*        ESTILOS DEL HEADER            */
/****************************************/

import { cva } from "class-variance-authority";

/************************************/
/*      CONTENEDOR PRINCIPAL        */
/************************************/
export const headerStyles = cva(
  [
    "flex",
    "w-full",
    "h-[80px]",
    "px-[20px]",
    "py-[16px]",
    "justify-between",
    "items-center",
    "bg-[#111519]",
  ],
  {
    variants: {
      mode: {
        Authenticated: "",
        Guest: "",
      },
    },
  }
);

/************************************/
/*          BRANDING                */
/************************************/
export const brandingStyles = [
  "flex",
  "items-center",
  "px-[10px]",
  "py-[10px]",
].join(" ");

/************************************/
/*            LOGO                  */
/************************************/
export const logoStyles = [
  "h-[36px]",
  "w-auto",
  "object-contain",
].join(" ");

/************************************/
/*         NAVEGACIÓN               */
/************************************/
export const navigationStyles = [
  "flex",
  "items-center",
  "justify-center",
  "gap-[32px]",
  "px-[10px]",
  "py-[10px]",
].join(" ");

/************************************/
/*      ITEM DE NAVEGACIÓN          */
/************************************/
export const navigationItemStyles = [
  "text-[16px]",
  "font-normal",
  "leading-[16px]",
  "text-[var(--color-vainilla)]",
  "transition-colors",
  "hover:text-white",
  "cursor-pointer",
].join(" ");

/************************************/
/*       ACCIONES DERECHA           */
/************************************/
export const actionsStyles = [
  "flex",
  "items-center",
  "justify-center",
  "gap-[16px]",
  "px-[10px]",
  "py-[10px]",
].join(" ");

/************************************/
/*        ICONO USUARIO             */
/************************************/
export const userIconStyles = [
  "w-[40px]",
  "h-[40px]",
  "text-[var(--color-vainilla)]",
  "cursor-pointer",
].join(" ");