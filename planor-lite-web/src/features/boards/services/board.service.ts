import { API_ENDPOINTS } from "@/core/config";
import { requestService } from "@/core/services";
import type { Board } from "../types/board.types";

class BoardService {
    async obtenerTableros(): Promise<Board[]> {
        return requestService.get<Board[]>(
            API_ENDPOINTS.BOARDS.MY_BOARDS,
            {
                showLoader: true,
                showToast: false,
            }
        );
    }
}

export const boardService = new BoardService();