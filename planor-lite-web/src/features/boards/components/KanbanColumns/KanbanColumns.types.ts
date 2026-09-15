/************************************/
/*TIPOS DEL COMPONENTE KANBAN COLUMN*/
/************************************/

export type KanbanColumnState =
    | "Pendiente"
    | "En_ejecucion"
    | "Terminado"
    | "Aprobado";

export interface KanbanColumnProps {
    state: KanbanColumnState;
    children?: React.ReactNode;
    onAddTask?: () => void;
}