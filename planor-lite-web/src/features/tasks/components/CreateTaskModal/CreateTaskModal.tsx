import { useId, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { Button } from "@/core/components/ui/Button/Button";
import { Input } from "@/core/components/ui/Input/Input";
import { Modal } from "@/core/components/ui/Modals/Modal";
import { TextArea } from "@/core/components/ui/TextArea/TextArea";
import { taskService } from "../../services/task.service";
import type {
    CreateTaskData,
    Task,
    TaskPriority,
} from "../../types/task.types";
import type { BoardState } from "@/features/boards/types/estado.types";
import {
    createTaskModalActionsStyles,
    createTaskModalErrorStyles,
    createTaskModalFormStyles,
    createTaskModalLabelStyles,
    createTaskModalSelectStyles,
} from "./CreateTaskModal.styles";

interface CreateTaskModalProps {
    idTablero: number;
    estados: BoardState[];
    onClose: () => void;
    onCreated: (tarea: Task) => void;
}

interface RespuestaErrorApi {
    message?: string | string[];
}

export function CreateTaskModal({
    idTablero,
    estados,
    onClose,
    onCreated,
}: CreateTaskModalProps) {
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

        const idEstadoKanban = Number(
            formulario.get("idEstadoKanban")
        );

        if (!titulo) {
            establecerError("Ingresa un título para la tarea.");
            return;
        }

        const datosNuevaTarea: CreateTaskData = {
            idEstadoKanban,
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

            const tareaCreada = await taskService.crearTarea(
                idTablero,
                datosNuevaTarea
            );

            onCreated(tareaCreada);
            toast.success("Tarea creada correctamente.");
            onClose();
        } catch (errorDeCreacion) {
            establecerError(
                obtenerMensajeError(errorDeCreacion)
            );
        } finally {
            establecerCargando(false);
        }
    }

    function obtenerMensajeError(
        errorDeCreacion: unknown
    ): string {
        if (isAxiosError<RespuestaErrorApi>(errorDeCreacion)) {
            const mensajeError =
                errorDeCreacion.response?.data.message;

            if (Array.isArray(mensajeError)) {
                return mensajeError.join(" ");
            }

            if (typeof mensajeError === "string") {
                return mensajeError;
            }
        }

        return "No fue posible crear la tarea. Intenta nuevamente.";
    }

    let textoBoton = "Crear tarea";

    if (cargando) {
        textoBoton = "Guardando...";
    }

    return (
        <Modal
            size="Medium"
            title="Nueva tarea"
            description="Completa la información de la tarea."
            onClose={onClose}
            actions={
                <div className={createTaskModalActionsStyles}>
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
                className={createTaskModalFormStyles}
            >
                <Input
                    label="Título de la tarea"
                    name="titulo"
                    type="text"
                    maxLength={200}
                    autoComplete="off"
                    required
                    disabled={cargando}
                />

                <TextArea
                    label="Descripción (opcional)"
                    name="descripcion"
                    maxLength={2000}
                    rows={4}
                    disabled={cargando}
                />

                <label className={createTaskModalLabelStyles}>
                    Estado

                    <select
                        name="idEstadoKanban"
                        defaultValue=""
                        required
                        disabled={cargando}
                        className={createTaskModalSelectStyles}
                    >
                        <option value="" disabled>
                            Selecciona un estado
                        </option>

                        {estados.map((estado) => (
                            <option
                                key={estado.idEstadoKanban}
                                value={estado.idEstadoKanban}
                            >
                                {estado.nombreEstado}
                            </option>
                        ))}
                    </select>
                </label>

                <label className={createTaskModalLabelStyles}>
                    Prioridad

                    <select
                        name="prioridad"
                        defaultValue=""
                        disabled={cargando}
                        className={createTaskModalSelectStyles}
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
                    disabled={cargando}
                />

                {error && (
                    <p
                        className={createTaskModalErrorStyles}
                        role="alert"
                    >
                        {error}
                    </p>
                )}
            </form>
        </Modal>
    );
}