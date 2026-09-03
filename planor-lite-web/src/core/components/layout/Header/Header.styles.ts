/****************************************/
/*          ESTILOS DEL HEADER          */
/****************************************/
const menuItemBaseStyles = [
    "cursor-pointer",
    "border-0",
    "bg-transparent",
    "font-normal",
    "text-[var(--color-vainilla)]",
    "transition-colors",
    "hover:bg-white/5",
    "hover:text-white",
].join(" ");

/****************************************/
/*      CONTENEDOR PRINCIPAL            */
/****************************************/
export const headerStyles = [
    "sticky",
    "top-0",
    "z-50",
    "relative",
    "flex",
    "w-full",
    "min-h-[70px]",
    "items-center",
    "justify-between",
    "px-[clamp(12px,2vw,20px)]",
    "bg-[#111519]",
].join(" ");

/****************************************/
/*              LOGO                    */
/****************************************/
export const logoStyles = [
    "h-[36px]",
    "w-auto",
    "max-w-[160px]",
    "shrink-0",
    "object-contain",
].join(" ");

/****************************************/
/*          NAVEGACIÓN                 */
/****************************************/
export const navigationStyles = [
    "hidden",
    "items-center",
    "justify-center",
    "gap-[clamp(16px,2.2vw,32px)]",
    "px-[10px]",
    "py-[10px]",
    "md:flex",
].join(" ");

/****************************************/
/*      ITEM DE NAVEGACIÓN             */
/****************************************/
export const navigationItemStyles = [
    menuItemBaseStyles,
    "p-0",
    "whitespace-nowrap",
    "text-[clamp(14px,1.4vw,16px)]",
    "leading-[16px]",
].join(" ");

/****************************************/
/*       ACCIONES DERECHA              */
/****************************************/
export const actionsStyles = [
    "hidden",
    "items-center",
    "justify-center",
    "gap-[clamp(8px,1.2vw,16px)]",
    "px-[6px]",
    "py-[6px]",
    "md:flex",
].join(" ");

/****************************************/
/*          ICONO USUARIO              */
/****************************************/
export const userIconStyles = [
    "h-[40px]",
    "w-[40px]",
    "shrink-0",
    "cursor-pointer",
    "text-[var(--color-vainilla)]",
].join(" ");

/****************************************/
/*       BOTÓN MENÚ HAMBURGUESA        */
/****************************************/
export const menuButtonStyles = [
    "flex",
    "h-[40px]",
    "w-[40px]",
    "shrink-0",
    "items-center",
    "justify-center",
    "cursor-pointer",
    "rounded-md",
    "border",
    "border-transparent",
    "bg-transparent",
    "text-[var(--color-vainilla)]",
    "transition-colors",
    "hover:bg-white/5",
    "md:hidden",
].join(" ");

/****************************************/
/*       ICONO MENÚ HAMBURGUESA        */
/****************************************/
export const menuIconStyles = [
    "h-[28px]",
    "w-[28px]",
].join(" ");

/****************************************/
/*           MENÚ MÓVIL                */
/****************************************/
export const mobileMenuStyles = [
    "absolute",
    "left-0",
    "right-0",
    "top-full",
    "z-50",
    "flex",
    "flex-col",
    "border-t",
    "border-white/10",
    "bg-[#111519]",
    "px-[16px]",
    "py-[12px]",
    "shadow-lg",
    "md:hidden",
].join(" ");

/****************************************/
/*       ITEM MENÚ MÓVIL               */
/****************************************/
export const mobileMenuItemStyles = [
    menuItemBaseStyles,
    "w-full",
    "px-[12px]",
    "py-[14px]",
    "text-left",
    "text-[16px]",
    "leading-[20px]",
].join(" ");

/****************************************/
/*      SEPARADOR MENÚ MÓVIL           */
/****************************************/
export const mobileMenuDividerStyles = [
    "my-[4px]",
    "h-px",
    "w-full",
    "bg-white/10",
].join(" ");