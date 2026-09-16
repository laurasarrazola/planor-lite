import { API_ENDPOINTS } from "@/core/config";
import { requestService } from "@/core/services";
import type { Task } from "../types/task.types";

class TaskService {
    /**
     * Obtiene las tareas asociadas a un tablero específico.
     * @param {number} idTablero - El ID del tablero del cual se desean obtener las tareas.
     * @returns {Promise<Task[]>} Una promesa que resuelve con un array de objetos Task.
     */
    async obtenerTareasPorTablero(idTablero: number): Promise<Task[]> {
        return requestService.get<Task[]>(
            API_ENDPOINTS.TASKS.BY_BOARD(idTablero),
            {
                showLoader: true,
                showToast: false,
            }
        );
    }

    /**
     * Mueve una tarea a un nuevo estado y orden dentro de ese estado.
     * @param idTarea - El ID de la tarea a mover.
     * @param idEstadoKanban - El ID del estado al que se desea mover la tarea.
     * @param ordenEnEstado - El orden de la tarea dentro del nuevo estado.
     */
    async moverTarea(
    idTarea: number,
    idEstadoKanban: number,
    ordenEnEstado: number
): Promise<void> {
    const datos = new URLSearchParams();

    datos.append("idEstadoKanban", String(idEstadoKanban));
    datos.append("ordenEnEstado", String(ordenEnEstado));

    await requestService.patch(
        API_ENDPOINTS.TASKS.MOVE(idTarea),
        datos,
        {
            showLoader: false,
            showToast: false,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
}
}

export const taskService = new TaskService();