import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/core/components/ui/Button/Button";
import { Modal } from "@/core/components/ui/Modals/Modal";

import { boardService } from "../../services";
import type { Board } from "../../types/board.types";

interface DeleteBoardModalProps {
    tablero: Board;
    onClose: () => void;
    onDeleted: (idTablero: number) => void;
}

export function DeleteBoardModal({
    tablero,
    onClose,
    onDeleted,
}: DeleteBoardModalProps) {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function manejarEliminar(): Promise<void> {
        setError(null);

        try {
            setCargando(true);

            await boardService.eliminarTablero(tablero.idTablero);

            onDeleted(tablero.idTablero);

            toast.success("Tablero eliminado correctamente.");

            onClose();
        } catch {
            setError(
                "No fue posible eliminar el tablero. Intenta nuevamente."
            );
        } finally {
            setCargando(false);
        }
    }

    return (
        <Modal
            size="Small"
            title="Eliminar tablero"
            description={`¿Estás seguro de que deseas eliminar "${tablero.nombreTablero}"?`}
            onClose={onClose}
            actions={
                <div className="flex w-full justify-end gap-3">
                    <Button
                        type="button"
                        variant="Secondary"
                        buttonStyle="Outlined"
                        size="S"
                        onClick={onClose}
                        disabled={cargando}
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="button"
                        variant="Primary"
                        buttonStyle="Filled"
                        size="S"
                        onClick={manejarEliminar}
                        disabled={cargando}
                    >
                        {cargando ? "Eliminando..." : "Eliminar"}
                    </Button>
                </div>
            }
        >
            {error && (
                <p className="text-sm text-red-400" role="alert">
                    {error}
                </p>
            )}
        </Modal>
    );
}