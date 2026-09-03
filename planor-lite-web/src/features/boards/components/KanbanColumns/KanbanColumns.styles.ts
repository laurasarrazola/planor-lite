import { cva } from "class-variance-authority";

/**************************************/
/*ESTILOS DEL COMPONENTE KANBAN COLUMN*/
/**************************************/
export const kanbanColumnStyles = [
    "flex",
    "w-[min(321px,calc(100vw-32px))]",
    "max-w-full",
    "min-w-0",
    "h-[670px]",
    "max-h-[calc(100dvh-32px)]",
    "flex-col",
    "gap-[8px]",
    "rounded-[16px]",
    "border",
    "border-[0.5px]",
    "border-[var(--color-obsidiana)]",
    "bg-[#191B1F]",
    "px-[20px]",
    "py-[8px]",
    "box-border",
    "shadow-[0_4px_36px_0_rgba(33,6,53,0.50)]",
    "shrink-0",
].join(" ");

/************************************/
/*              HEADER              */
/************************************/
export const kanbanColumnHeaderStyles = [
    "flex",
    "w-full",
    "min-w-0",
    "items-start",
    "justify-between",
    "gap-[8px]",
    "border-b",
    "border-[rgba(255,249,228,0.20)]",
    "pb-[6px]",
    "px-[10px]",
    "pt-[6px]",
].join(" ");

/************************************/
/*          PUNTO DE ESTADO         */
/************************************/
export const kanbanColumnStatusDotStyles = cva(
    [
        "h-[16px]",
        "w-[16px]",
        "shrink-0",
        "rounded-full",
    ],
    {
        variants: {
            state: {
                Pendiente: "bg-[#C26B6D]",
                "En ejecución": "bg-[#DCE992]",
                Terminado: "bg-[#69BEE9]",
                Aprobado: "bg-[#8BE386]",
            },
        },
    }
);

/************************************/
/*        INFORMACIÓN ESTADO        */
/************************************/
export const kanbanColumnStateInfoStyles = [
    "flex",
    "min-w-0",
    "flex-1",
    "items-start",
    "gap-[8px]",
    "p-[10px]",
].join(" ");

/************************************/
/*        NOMBRE DEL ESTADO         */
/************************************/
export const kanbanColumnStateNameStyles = [
    "min-w-0",
    "text-[16px]",
    "font-normal",
    "leading-[20px]",
    "text-white",
    "break-words",
].join(" ");

/************************************/
/*             BOTÓN +              */
/************************************/
export const kanbanColumnAddButtonStyles = [
    "flex",
    "h-[24px]",
    "w-[24px]",
    "shrink-0",
    "items-center",
    "justify-center",
    "border-0",
    "bg-transparent",
    "p-0",
    "cursor-pointer",
    "text-[var(--color-vainilla)]",
].join(" ");

/************************************/
/*         LISTA DE TAREAS          */
/************************************/
export const kanbanColumnTaskListStyles = [
    "flex",
    "min-h-0",
    "w-full",
    "min-w-0",
    "flex-1",
    "flex-col",
    "items-start",
    "gap-[12px]",
    "overflow-y-auto",
    "overflow-x-hidden",
    "px-[10px]",
    "py-[10px]",
    "box-border",
].join(" ");

/************************************/
/*          BOTÓN INFERIOR          */
/************************************/
export const kanbanColumnButtonStyles = [
    "w-full",
    "max-w-full",
    "min-w-0",
    "shrink-0",
].join(" ");