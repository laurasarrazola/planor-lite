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
    idEstadoKanban: number;
    children?: React.ReactNode;
    onAddTask?: () => void;
}