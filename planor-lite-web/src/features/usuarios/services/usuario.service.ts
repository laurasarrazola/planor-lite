import { API_ENDPOINTS } from "@/core/config";
import { requestService } from "@/core/services";
import type {
    DatosActualizarUsuario,
    DatosEliminarUsuario,
    PerfilUsuario,
    Usuario,
} from "../types/usuario.types";

class UsuarioService {
    async obtenerPerfil(): Promise<PerfilUsuario> {
        return requestService.get<PerfilUsuario>(
            API_ENDPOINTS.USERS.PROFILE
        );
    }

    async actualizarPerfil(
        datosUsuario: DatosActualizarUsuario
    ): Promise<Usuario> {
        return requestService.patch<Usuario>(
            API_ENDPOINTS.USERS.UPDATE_PROFILE,
            datosUsuario
        );
    }

    async eliminarCuenta(
        datosEliminacion: DatosEliminarUsuario
    ): Promise<{ message: string }> {
        return requestService.delete<{ message: string }>(
            API_ENDPOINTS.USERS.DELETE_ACCOUNT,
            datosEliminacion
        );
    }
}

export const usuarioService = new UsuarioService();
