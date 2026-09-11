import { useId, useState } from "react";
import type React from "react";
import { toast } from "sonner";
import { Button } from "@/core/components/ui/Button/Button";
import { Input } from "@/core/components/ui/Input/Input";
import { Modal } from "@/core/components/ui/Modals/Modal";
import { TextArea } from "@/core/components/ui/TextArea/TextArea";
import { boardService } from "../../services";
import type { Board } from "../../types/board.types";

interface CreateBoardModalProps {
    onClose: () => void;
    onCreated: (tablero: Board) => void;
}

export function CreateBoardModal({
    onClose,
    onCreated,
}: CreateBoardModalProps) {
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

            const tablero = await boardService.crearTablero({
                nombreTablero,
                ...(descripcionTablero
                    ? { descripcionTablero }
                    : {}),
            });

            onCreated(tablero);
            toast.success("Tablero creado correctamente.");
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

        return "No fue posible crear el tablero. Intenta nuevamente.";
    }

    return (
        <Modal
            size="Medium"
            title="Crear nuevo tablero"
            description="Define el nombre y la descripción de tu nuevo tablero."
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
                        {cargando ? "Creando..." : "Crear tablero"}
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
                    required
                    disabled={cargando}
                />

                <TextArea
                    label="Descripción (opcional)"
                    name="descripcionTablero"
                    maxLength={3000}
                    rows={4}
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