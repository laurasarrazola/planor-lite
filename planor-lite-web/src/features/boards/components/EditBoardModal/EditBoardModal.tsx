import { useId, useState } from "react";
import type React from "react";
import { toast } from "sonner";

import { Button } from "@/core/components/ui/Button/Button";
import { Input } from "@/core/components/ui/Input/Input";
import { Modal } from "@/core/components/ui/Modals/Modal";
import { TextArea } from "@/core/components/ui/TextArea/TextArea";

import { boardService } from "../../services";
import type { Board } from "../../types/board.types";

interface EditBoardModalProps {
    tablero: Board;
    onClose: () => void;
    onUpdated: (tablero: Board) => void;
}

export function EditBoardModal({
    tablero,
    onClose,
    onUpdated,
}: EditBoardModalProps) {
    const idFormulario = useId();

    const [error, setError] = useState<string | null>(null);
    const [cargando, setCargando] = useState(false);

    async function manejarEnvio(
        event: React.SubmitEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();
        setError(null);

        const formulario = new FormData(event.currentTarget);

        const nombreTablero = String(
            formulario.get("nombreTablero") ?? ""
        ).trim();

        const descripcionTablero = String(
            formulario.get("descripcionTablero") ?? ""
        ).trim();

        if (!nombreTablero) {
            setError("Ingresa un nombre para el tablero.");
            return;
        }

        try {
            setCargando(true);

            const tableroActualizado =
                await boardService.editarTablero(
                    tablero.idTablero,
                    {
                        nombreTablero,
                        descripcionTablero,
                    }
                );

            onUpdated(tableroActualizado);

            toast.success("Tablero actualizado correctamente.");

            onClose();
        } catch (error: unknown) {
            setError(obtenerMensajeError(error));
        } finally {
            setCargando(false);
        }
    }

    function obtenerMensajeError(error: unknown): string {
        if (
            typeof error === "object" &&
            error !== null &&
            "response" in error
        ) {
            const response = (
                error as {
                    response?: {
                        data?: {
                            message?: string | string[];
                        };
                    };
                }
            ).response;

            const mensaje = response?.data?.message;

            if (Array.isArray(mensaje)) {
                return mensaje.join(" ");
            }

            if (typeof mensaje === "string") {
                return mensaje;
            }
        }

        return "No fue posible actualizar el tablero. Intenta nuevamente.";
    }

    return (
        <Modal
            size="Medium"
            title="Editar tablero"
            description="Modifica el nombre y la descripción de tu tablero."
            onClose={onClose}
            actions={
                <div className="flex w-full justify-center">
                    <Button
                        type="submit"
                        form={idFormulario}
                        variant="Primary"
                        size="M"
                        disabled={cargando}
                    >
                        {cargando ? "Guardando..." : "Guardar cambios"}
                    </Button>
                </div>
            }
        >
            <form
                id={idFormulario}
                onSubmit={manejarEnvio}
                className="flex w-full flex-col gap-3"
            >
                <Input
                    label="Nombre del tablero"
                    name="nombreTablero"
                    type="text"
                    maxLength={60}
                    autoComplete="off"
                    defaultValue={tablero.nombreTablero}
                    required
                    disabled={cargando}
                />

                <TextArea
                    label="Descripción (opcional)"
                    name="descripcionTablero"
                    maxLength={3000}
                    rows={4}
                    defaultValue={tablero.descripcionTablero ?? ""}
                    disabled={cargando}
                />

                {error && (
                    <p className="text-sm text-red-400" role="alert">
                        {error}
                    </p>
                )}
            </form>
        </Modal>
    );
}