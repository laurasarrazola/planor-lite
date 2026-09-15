import { Header } from "@/core/components/layout/Header/Header";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import { BoardHeader } from "../../components/BoardHeader/BoardHeader";
import { KanbanBoard } from "../../components/KanbanBoard/KanbanBoard";

import {
    boardPageStyles,
    boardPageMainStyles,
} from "./BoardPage.styles";

export function BoardPage() {
    const nombreTablero = "Mi tablero";
    const descripcionTablero =
        "Organiza y administra las tareas de este tablero.";

    return (
        <div className={boardPageStyles}>
            <Header modo="Authenticated" />

            <main className={boardPageMainStyles}>
                <Breadcrumb boardName={nombreTablero} />

                <BoardHeader
                    title={nombreTablero}
                    description={descripcionTablero}
                />

                <KanbanBoard />
            </main>
        </div>
    );
}