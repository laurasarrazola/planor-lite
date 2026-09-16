import { useEffect, useState } from "react";
import type { ComponentType, Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/core/components/layout/Header/Header";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import { BoardHeader } from "../../components/BoardHeader/BoardHeader";
import { KanbanBoard } from "../../components/KanbanBoard/KanbanBoard";
import { boardService } from "../../services";
import type { Board } from "../../types/board.types";
import { taskService } from "@/features/tasks/services/task.service";
import type { Task } from "@/features/tasks/types/task.types";
import { estadoService } from "../../services/estado.service";
import type { BoardState } from "../../types/estado.types";
import {
    boardPageStyles,
    boardPageMainStyles,
} from "./BoardPage.styles";

const KanbanBoardComponent = KanbanBoard as unknown as ComponentType<{
    tareas: Task[];
    estados: BoardState[];
    establecerTareas: Dispatch<SetStateAction<Task[]>>;
}>;

export function BoardPage() {
    const { idTablero } = useParams();

    const [tablero, establecerTablero] = useState<Board | null>(null);
    const [cargando, establecerCargando] = useState(true);
    const [error, establecerError] = useState<string | null>(null);
    const [tareas, establecerTareas] = useState<Task[]>([]);
    const [estados, establecerEstados] = useState<BoardState[]>([]);

    useEffect(() => {
        async function cargarTablero(): Promise<void> {
            try {
                establecerCargando(true);
                establecerError(null);

                if (!idTablero) {
                    establecerError("No se encontró el tablero.");
                    return;
                }

                const datos = await boardService.obtenerTableroPorId(
                    Number(idTablero)
                );

                const tareasDelTablero = await taskService.obtenerTareasPorTablero(
                    Number(idTablero)
                );

                const estadosDelTablero =
                    await estadoService.obtenerEstadosPorTablero(
                        Number(idTablero)
                    );

                establecerTablero(datos);
                establecerTareas(tareasDelTablero);
                establecerEstados(estadosDelTablero);
            } catch {
                establecerError(
                    "No fue posible cargar el tablero."
                );
            } finally {
                establecerCargando(false);
            }
        }

        cargarTablero();
    }, [idTablero]);

    if (cargando) {
        return (
            <div className={boardPageStyles}>
                <Header modo="Authenticated" />

                <main className={boardPageMainStyles}>
                    <p className="text-(--color-vainilla)">
                        Cargando tablero...
                    </p>
                </main>
            </div>
        );
    }

    if (error || !tablero) {
        return (
            <div className={boardPageStyles}>
                <Header modo="Authenticated" />

                <main className={boardPageMainStyles}>
                    <p
                        className="text-(--color-vainilla)"
                        role="alert"
                    >
                        {error ?? "No se encontró el tablero."}
                    </p>
                </main>
            </div>
        );
    }

    return (
        <div className={boardPageStyles}>
            <Header modo="Authenticated" />

            <main className={boardPageMainStyles}>
                <Breadcrumb boardName={tablero.nombreTablero} />

                <BoardHeader
                    title={tablero.nombreTablero}
                    description={
                        tablero.descripcionTablero ??
                        "Sin descripción."
                    }
                />

                <KanbanBoardComponent
                    tareas={tareas}
                    estados={estados}
                    establecerTareas={establecerTareas}
                />
            </main>
        </div>
    );
}