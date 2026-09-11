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
import { CreateBoardModal } from "../components/CreateBoardModal/CreateBoardModal";
import { EditBoardModal } from "../components/EditBoardModal/EditBoardModal";
import { DeleteBoardModal } from "../components/DeleteBoardModal/DeleteBoardModal";
import type { Board } from "../types/board.types";

export function BoardsPage() {
    const [tableros, establecerTableros] = useState<Board[]>([]);
    const [cargando, establecerCargando] = useState(true);
    const [error, establecerError] = useState<string | null>(null);
    const [mostrarModalCrear, establecerMostrarModalCrear] = useState(false);

    const [tableroEditar, establecerTableroEditar] =
        useState<Board | null>(null);

    const [tableroEliminar, establecerTableroEliminar] =
        useState<Board | null>(null);

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
                        onClick={() => establecerMostrarModalCrear(true)}
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
                                    onEditClick={() => establecerTableroEditar(tablero)}
                                    onDeleteClick={() => establecerTableroEliminar(tablero)}
                                />
                            ))}
                    </div>
                </section>
            </main>

            <Footer />

            {mostrarModalCrear && (
                <CreateBoardModal
                    onClose={() => establecerMostrarModalCrear(false)}
                    onCreated={(tablero) => {
                        establecerTableros((tablerosActuales) => [
                            ...tablerosActuales,
                            tablero,
                        ]);
                    }}
                />
            )}
            
            {tableroEditar && (
                <EditBoardModal
                    tablero={tableroEditar}
                    onClose={() => establecerTableroEditar(null)}
                    onUpdated={(tableroActualizado) => {
                        establecerTableros((tablerosActuales) =>
                            tablerosActuales.map((tablero) => {
                                if (
                                    tablero.idTablero ===
                                    tableroActualizado.idTablero
                                ) {
                                    return tableroActualizado;
                                }

                                return tablero;
                            })
                        );
                    }}
                />
            )}

            {tableroEliminar && (
                <DeleteBoardModal
                    tablero={tableroEliminar}
                    onClose={() => establecerTableroEliminar(null)}
                    onDeleted={(idTablero) => {
                        establecerTableros((tablerosActuales) =>
                            tablerosActuales.filter(
                                (tablero) => tablero.idTablero !== idTablero
                            )
                        );
                    }}
                />
            )}
        </div>
    );
}