import { useId, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/core/components/ui/Button/Button";
import { Input } from "@/core/components/ui/Input/Input";
import { Modal } from "@/core/components/ui/Modals/Modal";
import { TextArea } from "@/core/components/ui/TextArea/TextArea";
import { taskService } from "../../services/task.service";
import type {
    EditTaskData,
    Task,
    TaskPriority,
} from "../../types/task.types";

interface EditTaskModalProps {
    tarea: Task;
    onClose: () => void;
    onUpdated: (tarea: Task) => void;
}

export function EditTaskModal({
    tarea,
    onClose,
    onUpdated,
}: EditTaskModalProps) {
    const idFormulario = useId();

    const [cargando, establecerCargando] = useState(false);
    const [error, establecerError] = useState<string | null>(null);

    function obtenerPrioridad(
        valorPrioridad: FormDataEntryValue | null
    ): TaskPriority {
        if (valorPrioridad === "Baja") {
            return "Baja";
        }

        if (valorPrioridad === "Media") {
            return "Media";
        }

        if (valorPrioridad === "Alta") {
            return "Alta";
        }

        return null;
    }

    function obtenerFechaVencimiento(
        valorFecha: FormDataEntryValue | null
    ): string | null {
        if (typeof valorFecha !== "string") {
            return null;
        }

        if (!valorFecha) {
            return null;
        }

        return valorFecha;
    }

    async function manejarEnvio(
        evento: FormEvent<HTMLFormElement>
    ): Promise<void> {
        evento.preventDefault();
        establecerError(null);

        const formulario = new FormData(evento.currentTarget);

        const titulo = String(
            formulario.get("titulo") ?? ""
        ).trim();

        if (!titulo) {
            establecerError("Ingresa un título para la tarea.");
            return;
        }

        const datosTarea: EditTaskData = {
            titulo,
            descripcion: String(
                formulario.get("descripcion") ?? ""
            ).trim(),
            prioridad: obtenerPrioridad(
                formulario.get("prioridad")
            ),
            fechaVencimientoTarea: obtenerFechaVencimiento(
                formulario.get("fechaVencimientoTarea")
            ),
        };

        try {
            establecerCargando(true);

            const tareaActualizada =
                await taskService.editarTarea(
                    tarea.idTarea,
                    datosTarea
                );

            onUpdated(tareaActualizada);
            toast.success("Tarea actualizada correctamente.");
            onClose();
        } catch {
            establecerError(
                "No fue posible actualizar la tarea. Intenta nuevamente."
            );
        } finally {
            establecerCargando(false);
        }
    }

    let textoBoton = "Guardar cambios";

    if (cargando) {
        textoBoton = "Guardando...";
    }

    return (
        <Modal
            size="Medium"
            title="Editar tarea"
            description="Modifica la información de la tarea."
            onClose={onClose}
            actions={
                <div>
                    <Button
                        type="submit"
                        form={idFormulario}
                        variant="Primary"
                        size="M"
                        disabled={cargando}
                    >
                        {textoBoton}
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
                    label="Título de la tarea"
                    name="titulo"
                    type="text"
                    maxLength={200}
                    autoComplete="off"
                    defaultValue={tarea.titulo}
                    required
                    disabled={cargando}
                />

                <TextArea
                    label="Descripción (opcional)"
                    name="descripcion"
                    maxLength={2000}
                    rows={4}
                    defaultValue={tarea.descripcion ?? ""}
                    disabled={cargando}
                />

                <label className="flex flex-col gap-1 text-sm text-(--color-vainilla)">
                    Prioridad

                    <select
                        name="prioridad"
                        defaultValue={tarea.prioridad ?? ""}
                        disabled={cargando}
                        className="rounded-[6px] border border-[rgba(33,6,53,0.45)] bg-[#222930] p-2 text-(--color-vainilla)"
                    >
                        <option value="">Sin prioridad</option>
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                    </select>
                </label>

                <Input
                    label="Fecha de vencimiento (opcional)"
                    name="fechaVencimientoTarea"
                    type="date"
                    defaultValue={tarea.fechaVencimientoTarea ?? ""}
                    disabled={cargando}
                />

                {error && (
                    <p
                        className="text-sm text-red-400"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
            </form>
        </Modal>
    );
}