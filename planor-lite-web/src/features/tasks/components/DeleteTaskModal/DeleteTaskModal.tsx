import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/core/components/ui/Button/Button";
import { Modal } from "@/core/components/ui/Modals/Modal";
import { taskService } from "../../services/task.service";
import type { Task } from "../../types/task.types";

interface DeleteTaskModalProps {
    tarea: Task;
    onClose: () => void;
    onDeleted: (idTarea: number) => void;
}

export function DeleteTaskModal({
    tarea,
    onClose,
    onDeleted,
}: DeleteTaskModalProps) {
    const [cargando, establecerCargando] = useState(false);
    const [error, establecerError] = useState<string | null>(null);

    async function manejarEliminar(): Promise<void> {
        establecerError(null);

        try {
            establecerCargando(true);

            await taskService.eliminarTarea(tarea.idTarea);

            onDeleted(tarea.idTarea);
            toast.success("Tarea eliminada correctamente.");
            onClose();
        } catch {
            establecerError(
                "No fue posible eliminar la tarea. Intenta nuevamente."
            );
        } finally {
            establecerCargando(false);
        }
    }

    let textoBoton = "Eliminar";

    if (cargando) {
        textoBoton = "Eliminando...";
    }

    return (
        <Modal
            size="Small"
            title="Eliminar tarea"
            description={`¿Estás seguro de que deseas eliminar "${tarea.titulo}"?`}
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
                        {textoBoton}
                    </Button>
                </div>
            }
        >
            {error && (
                <p
                    className="text-sm text-red-400"
                    role="alert"
                >
                    {error}
                </p>
            )}
        </Modal>
    );
}