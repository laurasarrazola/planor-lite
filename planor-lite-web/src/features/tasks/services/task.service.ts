import { API_ENDPOINTS } from "@/core/config";
import { requestService } from "@/core/services";
import type { Task } from "../types/task.types";

class TaskService {
    async obtenerTareasPorTablero(idTablero: number): Promise<Task[]> {
        return requestService.get<Task[]>(
            API_ENDPOINTS.TASKS.BY_BOARD(idTablero),
            {
                showLoader: true,
                showToast: false,
            }
        );
    }
}

export const taskService = new TaskService();