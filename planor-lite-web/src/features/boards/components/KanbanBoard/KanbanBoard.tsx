import { KanbanColumn } from "../KanbanColumns/KanbanColumns";

import { kanbanBoardStyles } from "./KanbanBoard.styles";

export function KanbanBoard() {
    return (
        <section
            className={kanbanBoardStyles}
            aria-label="Tablero Kanban"
        >
            <KanbanColumn state="Pendiente" />
            <KanbanColumn state="En ejecución" />
            <KanbanColumn state="Terminado" />
            <KanbanColumn state="Aprobado" />
        </section>
    );
}