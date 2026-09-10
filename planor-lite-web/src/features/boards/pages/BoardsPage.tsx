import { Button } from "@/core/components/ui/Button/Button";
import { Footer } from "@/core/components/layout/Footer/Footer";
import { Header } from "@/core/components/layout/Header/Header";
import { Icon } from "@iconify/react";
import {
    boardsGridStyles,
    boardsPageDescriptionStyles,
    boardsPageHeaderStyles,
    boardsPageInfoStyles,
    boardsPageMainStyles,
    boardsPageStyles,
    boardsPageTitleStyles,
    boardsSectionStyles,
} from "./BoardsPage.styles";
import { useEffect, useState } from "react";
import { boardService } from "../services";
import { BoardCard } from "../components/BoardCards/BoardCards";
import type { Board } from "../types/board.types";

export function BoardsPage() {
    const [tableros, establecerTableros] = useState<Board[]>([]);
    const [cargando, establecerCargando] = useState(true);
    const [error, establecerError] = useState<string | null>(null);

    useEffect(() => {
        async function cargarTableros(): Promise<void> {
            try {
                establecerCargando(true);
                establecerError(null);

                const datos = await boardService.obtenerTableros();

                establecerTableros(datos);
            } catch {
                establecerError(
                    "No fue posible cargar tus tableros. Intenta nuevamente."
                );
            } finally {
                establecerCargando(false);
            }
        }

        cargarTableros();
    }, []);

    return (
        <div className={boardsPageStyles}>
            <Header modo="Authenticated" />

            <main className={boardsPageMainStyles}>
                <section className={boardsPageHeaderStyles}>
                    <div className={boardsPageInfoStyles}>
                        <h1 className={boardsPageTitleStyles}>
                            Mis tableros
                        </h1>

                        <p className={boardsPageDescriptionStyles}>
                            Organiza tus proyectos y tareas en tus tableros Kanban personales.
                        </p>
                    </div>

                    <Button
                        variant="Primary"
                        buttonStyle="Filled"
                        size="S"
                    >
                        <Icon icon="lucide:plus" />
                        Crear nuevo tablero
                    </Button>
                </section>

                <section className={boardsSectionStyles}>
                    <div className={boardsGridStyles}>
                        {cargando && (
                            <p className="text-(--color-vainilla)">
                                Cargando tus tableros...
                            </p>
                        )}

                        {!cargando && error && (
                            <p
                                className="text-(--color-vainilla)"
                                role="alert"
                            >
                                {error}
                            </p>
                        )}

                        {!cargando && !error && tableros.length === 0 && (
                            <p className="text-(--color-vainilla)">
                                Aún no tienes tableros creados.
                            </p>
                        )}

                        {!cargando &&
                            !error &&
                            tableros.map((tablero, indice) => (
                                <BoardCard
                                    key={tablero.idTablero}
                                    accent={
                                        indice % 2 === 0
                                            ? "Amatista"
                                            : "ZafiroLavanda"
                                    }
                                    title={tablero.nombreTablero}
                                    description={
                                        tablero.descripcionTablero ??
                                        "Sin descripción."
                                    }
                                />
                            ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}