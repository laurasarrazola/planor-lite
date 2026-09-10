// El archivo auth.service.ts contiene la implementación del servicio de autenticación, que se encarga de realizar las solicitudes HTTP relacionadas con la autenticación de usuarios en la aplicación.
import { API_ENDPOINTS } from "@/core/config";
import { requestService } from "@/core/services";
import type {
    RegistrarUsuarioRequest,
    RegistrarUsuarioResponse,
    IniciarSesionRequest,
    IniciarSesionResponse,
} from "../types/auth.types";

class AuthService {
    async registrarUsuario(
        datos: RegistrarUsuarioRequest
    ): Promise<RegistrarUsuarioResponse> {
        return requestService.post<RegistrarUsuarioResponse>(
            API_ENDPOINTS.USERS.REGISTER,
            datos,
            {
                showLoader: true,
                showToast: false,
            }
        );
    }

    async iniciarSesion(
        datos: IniciarSesionRequest
    ): Promise<IniciarSesionResponse> {
        return requestService.post<IniciarSesionResponse>(
            API_ENDPOINTS.AUTH.LOGIN,
            datos,
            {
                showLoader: true,
                showToast: false,
            }
        );
    }
}

export const authService = new AuthService();