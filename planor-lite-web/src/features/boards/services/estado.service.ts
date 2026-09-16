import { API_ENDPOINTS } from "@/core/config";
import { requestService } from "@/core/services";
import type { BoardState } from "../types/estado.types";

class EstadoService {
    async obtenerEstadosPorTablero(
        idTablero: number
    ): Promise<BoardState[]> {
        return requestService.get<BoardState[]>(
            API_ENDPOINTS.STATES.BY_BOARD(idTablero),
            {
                showLoader: false,
                showToast: false,
            }
        );
    }
}

export const estadoService = new EstadoService();