export interface Board {
    idTablero: number;
    nombreTablero: string;
    descripcionTablero: string | null;
    tableroActivo: boolean;
    fechaCreacionTablero: string;
    fechaActualizacionTablero: string | null;
}