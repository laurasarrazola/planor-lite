// el archivo auth.types.ts contiene las definiciones de tipos para las solicitudes y respuestas relacionadas con la autenticación de usuarios en la aplicación.

export interface RegistrarUsuarioRequest {
  nombreUsuario: string;
  apellidoUsuario: string;
  email: string;
  contrasena: string;
  confirmarContrasena: string;
}

export interface RegistrarUsuarioResponse {
  idUsuario: number;
  nombreUsuario: string;
  apellidoUsuario: string;
  email: string;
  fechaRegistro: string;
  usuarioActivo: boolean;
  rolSistema: string;
}

export interface IniciarSesionRequest {
  email: string;
  contrasena: string;
}

export interface IniciarSesionResponse {
  token: string;
  email: string;
  idUsuario: number;
}