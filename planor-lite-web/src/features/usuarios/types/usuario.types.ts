export interface Usuario {
    idUsuario: number;
    nombreUsuario: string;
    apellidoUsuario: string;
    email: string;
    fechaRegistro: string;
    usuarioActivo: boolean;
    rolSistema: "admin" | "usuario";
}

export interface PerfilUsuario extends Usuario {
    cantidadTableros?: number;
    cantidadTareas?: number;
}

export interface DatosActualizarUsuario {
    nombreUsuario: string;
    apellidoUsuario: string;
}

export interface DatosEliminarUsuario {
    contrasenaActual: string;
}
