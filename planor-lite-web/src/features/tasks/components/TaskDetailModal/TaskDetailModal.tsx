import { Modal } from "@/core/components/ui/Modals/Modal";
import type { Task } from "../../types/task.types";
import {
    taskDetailContentStyles,
    taskDetailInformationStyles,
    taskDetailLabelStyles,
    taskDetailSectionStyles,
    taskDetailValueStyles,
} from "./TaskDetailModal.styles";

interface TaskDetailModalProps {
    tarea: Task;
    onClose: () => void;
}

export function TaskDetailModal({
    tarea,
    onClose,
}: TaskDetailModalProps) {
    const descripcion = obtenerDescripcion(tarea.descripcion);
    const prioridad = obtenerPrioridad(tarea.prioridad);
    const fechaVencimiento = obtenerFechaVencimiento(
        tarea.fechaVencimientoTarea
    );

    return (
        <Modal
            size="Medium"
            title={tarea.titulo}
            description="Detalle de la tarea"
            onClose={onClose}
        >
            <div className={taskDetailContentStyles}>
                <section className={taskDetailSectionStyles}>
                    <h3 className={taskDetailLabelStyles}>
                        Descripción
                    </h3>

                    <p className={taskDetailValueStyles}>
                        {descripcion}
                    </p>
                </section>

                <div className={taskDetailInformationStyles}>
                    <section className={taskDetailSectionStyles}>
                        <h3 className={taskDetailLabelStyles}>
                            Estado
                        </h3>

                        <p className={taskDetailValueStyles}>
                            {tarea.estado.nombreEstado}
                        </p>
                    </section>

                    <section className={taskDetailSectionStyles}>
                        <h3 className={taskDetailLabelStyles}>
                            Prioridad
                        </h3>

                        <p className={taskDetailValueStyles}>
                            {prioridad}
                        </p>
                    </section>

                    <section className={taskDetailSectionStyles}>
                        <h3 className={taskDetailLabelStyles}>
                            Fecha de vencimiento
                        </h3>

                        <p className={taskDetailValueStyles}>
                            {fechaVencimiento}
                        </p>
                    </section>
                </div>
            </div>
        </Modal>
    );
}

function obtenerDescripcion(descripcion: string | null): string {
    if (!descripcion) {
        return "Sin descripción.";
    }

    return descripcion;
}

function obtenerPrioridad(prioridad: Task["prioridad"]): string {
    if (!prioridad) {
        return "Sin prioridad.";
    }

    return prioridad;
}

function obtenerFechaVencimiento(
    fechaVencimientoTarea: string | null
): string {
    if (!fechaVencimientoTarea) {
        return "Sin fecha de vencimiento.";
    }

    const fecha = new Date(fechaVencimientoTarea);

    if (Number.isNaN(fecha.getTime())) {
        return fechaVencimientoTarea;
    }

    return new Intl.DateTimeFormat("es-CO", {
        dateStyle: "long",
    }).format(fecha);
}