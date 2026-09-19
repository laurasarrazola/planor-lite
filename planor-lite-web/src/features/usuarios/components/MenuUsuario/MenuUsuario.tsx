import { Icon } from "@iconify/react";
import { useRef, useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/core/components/ui/Button/Button";
import { Input } from "@/core/components/ui/Input/Input";
import { Modal } from "@/core/components/ui/Modals/Modal";
import { authStorageService } from "@/core/services";
import { authService } from "@/features/auth";
import { useClickFuera } from "@/core/hooks/useClickFuera";
import { usuarioService } from "../../services/usuario.service";
import type { PerfilUsuario } from "../../types/usuario.types";
import {
    errorUsuarioStyles,
    etiquetaInformacionUsuarioStyles,
    formularioUsuarioStyles,
    informacionUsuarioBloqueStyles,
    informacionUsuarioGridStyles,
    informacionUsuarioStyles,
    informacionUsuarioValorStyles,
    menuUsuarioBotonStyles,
    menuUsuarioContenedorStyles,
    menuUsuarioEliminarStyles,
    menuUsuarioIconoStyles,
    menuUsuarioListaStyles,
    menuUsuarioOpcionStyles,
} from "./MenuUsuario.styles";

type ModalUsuario = "informacion" | "editar" | "eliminar" | null;

export function MenuUsuario() {
    const navegar = useNavigate();

    const [mostrarMenu, establecerMostrarMenu] = useState(false);
    const referenciaMenu = useRef<HTMLDivElement>(null);
    const [modalUsuario, establecerModalUsuario] =
        useState<ModalUsuario>(null);
    const [usuario, establecerUsuario] = useState<PerfilUsuario | null>(null);
    const [error, establecerError] = useState<string | null>(null);
    const [cargando, establecerCargando] = useState(false);

    useClickFuera(referenciaMenu, mostrarMenu, () => {
        establecerMostrarMenu(false);
    });

    async function abrirModal(
        tipoModal: ModalUsuario
    ): Promise<void> {
        try {
            establecerCargando(true);
            establecerError(null);

            const perfilUsuario = await usuarioService.obtenerPerfil();

            establecerUsuario(perfilUsuario);
            establecerModalUsuario(tipoModal);
            establecerMostrarMenu(false);
        } catch {
            toast.error("No fue posible obtener tu información.");
        } finally {
            establecerCargando(false);
        }
    }

    function cerrarModal(): void {
        establecerModalUsuario(null);
        establecerError(null);
    }

    async function manejarEdicion(
        evento: SyntheticEvent<HTMLFormElement>
    ): Promise<void> {
        evento.preventDefault();

        const formulario = new FormData(evento.currentTarget);

        try {
            establecerCargando(true);
            establecerError(null);

            const usuarioActualizado =
                await usuarioService.actualizarPerfil({
                    nombreUsuario: String(
                        formulario.get("nombreUsuario") ?? ""
                    ).trim(),
                    apellidoUsuario: String(
                        formulario.get("apellidoUsuario") ?? ""
                    ).trim(),
                });

            establecerUsuario({
                ...usuario,
                ...usuarioActualizado,
            });
            cerrarModal();
        } catch {
            establecerError(
                "No fue posible actualizar tu información."
            );
        } finally {
            establecerCargando(false);
        }
    }

    async function manejarEliminacion(
        evento: SyntheticEvent<HTMLFormElement>
    ): Promise<void> {
        evento.preventDefault();

        const formulario = new FormData(evento.currentTarget);

        try {
            establecerCargando(true);
            establecerError(null);

            await usuarioService.eliminarCuenta({
                contrasenaActual: String(
                    formulario.get("contrasenaActual") ?? ""
                ),
            });

            authStorageService.clearAuth();
            navegar("/");
        } catch {
            establecerError(
                "No fue posible eliminar la cuenta. Verifica tu contraseña."
            );
        } finally {
            establecerCargando(false);
        }
    }

    async function manejarCerrarSesion(): Promise<void> {
        try {
            establecerCargando(true);
            await authService.cerrarSesion();
            authStorageService.clearAuth();
            toast.success("Sesión cerrada correctamente.");
            navegar("/");
        } catch {
            toast.error("No fue posible cerrar la sesiÃ³n.");
        } finally {
            establecerCargando(false);
        }
    }

    return (
        <div
            ref={referenciaMenu}
            className={menuUsuarioContenedorStyles}
        >
            <button
                type="button"
                className={menuUsuarioBotonStyles}
                onClick={() =>
                    establecerMostrarMenu(!mostrarMenu)
                }
                aria-label="Abrir menú de usuario"
                aria-expanded={mostrarMenu}
            >
                <Icon
                    icon="boxicons:user"
                    className={menuUsuarioIconoStyles}
                    aria-hidden="true"
                />
            </button>

            {mostrarMenu && (
                <div
                    className={menuUsuarioListaStyles}
                    role="menu"
                >
                    <button
                        type="button"
                        className={menuUsuarioOpcionStyles}
                        onClick={() => abrirModal("informacion")}
                    >
                        Ver información
                    </button>

                    <button
                        type="button"
                        className={menuUsuarioOpcionStyles}
                        onClick={() => abrirModal("editar")}
                    >
                        Editar información
                    </button>

                    <button
                        type="button"
                        className={menuUsuarioOpcionStyles}
                        onClick={manejarCerrarSesion}
                        disabled={cargando}
                    >
                        Cerrar sesión
                    </button>

                    <button
                        type="button"
                        className={menuUsuarioEliminarStyles}
                        onClick={() => abrirModal("eliminar")}
                    >
                        Eliminar cuenta
                    </button>
                </div>
            )}

            {modalUsuario === "informacion" && usuario && (
                <Modal
                    title="Mi información"
                    onClose={cerrarModal}
                >
                    <div className={informacionUsuarioStyles}>
                        <div className={informacionUsuarioGridStyles}>
                            <section className={informacionUsuarioBloqueStyles}>
                                <span className={etiquetaInformacionUsuarioStyles}>
                                    Nombre
                                </span>
                                <p className={informacionUsuarioValorStyles}>
                                    {usuario.nombreUsuario}
                                </p>
                            </section>

                            <section className={informacionUsuarioBloqueStyles}>
                                <span className={etiquetaInformacionUsuarioStyles}>
                                    Apellido
                                </span>
                                <p className={informacionUsuarioValorStyles}>
                                    {usuario.apellidoUsuario}
                                </p>
                            </section>

                            <section className={informacionUsuarioBloqueStyles}>
                                <span className={etiquetaInformacionUsuarioStyles}>
                                    Correo
                                </span>
                                <p className={informacionUsuarioValorStyles}>
                                    {usuario.email}
                                </p>
                            </section>

                            <section className={informacionUsuarioBloqueStyles}>
                                <span className={etiquetaInformacionUsuarioStyles}>
                                    Fecha de registro
                                </span>
                                <p className={informacionUsuarioValorStyles}>
                                    {obtenerFechaRegistro(usuario.fechaRegistro)}
                                </p>
                            </section>

                            <section className={informacionUsuarioBloqueStyles}>
                                <span className={etiquetaInformacionUsuarioStyles}>
                                    Tableros
                                </span>
                                <p className={informacionUsuarioValorStyles}>
                                    {usuario.cantidadTableros}
                                </p>
                            </section>

                            <section className={informacionUsuarioBloqueStyles}>
                                <span className={etiquetaInformacionUsuarioStyles}>
                                    Tareas totales
                                </span>
                                <p className={informacionUsuarioValorStyles}>
                                    {usuario.cantidadTareas}
                                </p>
                            </section>
                        </div>
                    </div>
                </Modal>
            )}

            {modalUsuario === "editar" && usuario && (
                <Modal
                    title="Editar información"
                    onClose={cerrarModal}
                    actions={
                        <Button
                            type="submit"
                            form="formulario-editar-usuario"
                            disabled={cargando}
                        >
                            Guardar cambios
                        </Button>
                    }
                >
                    <form
                        id="formulario-editar-usuario"
                        className={formularioUsuarioStyles}
                        onSubmit={manejarEdicion}
                    >
                        <Input
                            label="Nombre"
                            name="nombreUsuario"
                            className="w-full"
                            defaultValue={usuario.nombreUsuario}
                            minLength={3}
                            maxLength={100}
                            required
                            disabled={cargando}
                        />

                        <Input
                            label="Apellido"
                            name="apellidoUsuario"
                            className="w-full"
                            defaultValue={usuario.apellidoUsuario}
                            minLength={3}
                            maxLength={100}
                            required
                            disabled={cargando}
                        />

                        <Input
                            label="Correo electrónico"
                            className="w-full"
                            value={usuario.email}
                            helperText="El correo electrónico no se puede modificar."
                            disabled
                        />

                        {error && (
                            <p
                                className={errorUsuarioStyles}
                                role="alert"
                            >
                                {error}
                            </p>
                        )}
                    </form>
                </Modal>
            )}

            {modalUsuario === "eliminar" && (
                <Modal
                    title="Eliminar cuenta"
                    description="Esta acción desactiva tu cuenta. Confirma con tu contraseña actual."
                    onClose={cerrarModal}
                    actions={
                        <Button
                            type="submit"
                            form="formulario-eliminar-usuario"
                            disabled={cargando}
                        >
                            Eliminar cuenta
                        </Button>
                    }
                >
                    <form
                        id="formulario-eliminar-usuario"
                        className={formularioUsuarioStyles}
                        onSubmit={manejarEliminacion}
                    >
                        <Input
                            label="Contraseña actual"
                            name="contrasenaActual"
                            type="password"
                            minLength={8}
                            required
                            disabled={cargando}
                        />

                        {error && (
                            <p
                                className={errorUsuarioStyles}
                                role="alert"
                            >
                                {error}
                            </p>
                        )}
                    </form>
                </Modal>
            )}
        </div>
    );
}

function obtenerFechaRegistro(fechaRegistro: string): string {
    const fecha = new Date(fechaRegistro);

    if (Number.isNaN(fecha.getTime())) {
        return fechaRegistro;
    }

    return new Intl.DateTimeFormat("es-CO", {
        dateStyle: "long",
    }).format(fecha);
}
