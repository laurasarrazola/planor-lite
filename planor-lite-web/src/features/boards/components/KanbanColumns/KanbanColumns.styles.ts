import { cva } from "class-variance-authority";

/**************************************/
/*ESTILOS DEL COMPONENTE KANBAN COLUMN*/
/**************************************/
export const kanbanColumnStyles = [
    "flex",
    "w-[321px]",
    "h-[670px]",
    "flex-col",
    "gap-[8px]",
    "rounded-[16px]",
    "border",
    "border-[0.5px]",
    "border-[var(--color-obsidiana)]",
    "bg-[#191B1F]",
    "px-[20px]",
    "py-[8px]",
    "shadow-[0_4px_36px_0_rgba(33,6,53,0.50)]",
    "shrink-0",
].join(" ");


/************************************/
/*              HEADER              */
/************************************/
export const kanbanColumnHeaderStyles = [
    "flex",
    "w-full",
    "items-start",
    "justify-between",
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
    "items-start",
    "gap-[8px]",
    "p-[10px]",
].join(" ");


/************************************/
/*        NOMBRE DEL ESTADO         */
/************************************/
export const kanbanColumnStateNameStyles = [
    "font-sans",
    "text-[16px]",
    "font-normal",
    "leading-[100%]",
    "text-white",
].join(" ");


/************************************/
/*             BOTÓN +              */
/************************************/
export const kanbanColumnAddButtonStyles = [
    "h-[24px]",
    "w-[24px]",
    "shrink-0",
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
    "flex-1",
    "flex-col",
    "items-start",
    "gap-[12px]",
  //  "overflow-y-auto",
    "px-[10px]",
    "py-[10px]",
].join(" ");


/************************************/
/*          BOTÓN INFERIOR          */
/************************************/
export const kanbanColumnButtonStyles = [
    "w-full",
    "shrink-0",
].join(" ");