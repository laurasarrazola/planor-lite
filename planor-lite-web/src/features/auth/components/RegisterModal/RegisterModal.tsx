import { useId, useState } from "react";
import type React from "react";
import { toast } from "sonner";
import { Modal } from "@/core/components/ui/Modals/Modal";
import { Input } from "@/core/components/ui/Input/Input";
import { Button } from "@/core/components/ui/Button/Button";
import { authService } from "@/features/auth";

interface RegisterModalProps {
    onClose: () => void;
    onRegistered: () => void;
}

export function RegisterModal({
    onClose,
    onRegistered,
}: RegisterModalProps) {
    const idFormulario = useId();
    const [error, setError] = useState<string | null>(null);
    const [cargando, setCargando] = useState(false);

    async function manejarEnvio(
        event: React.SubmitEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();
        setError(null);

        const formulario = new FormData(event.currentTarget);

        const datos = {
            nombreUsuario: String(
                formulario.get("nombreUsuario") ?? ""
            ).trim(),

            apellidoUsuario: String(
                formulario.get("apellidoUsuario") ?? ""
            ).trim(),

            email: String(
                formulario.get("email") ?? ""
            ).trim(),

            contrasena: String(
                formulario.get("contrasena") ?? ""
            ),

            confirmarContrasena: String(
                formulario.get("confirmarContrasena") ?? ""
            ),
        };

        if (datos.contrasena !== datos.confirmarContrasena) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            setCargando(true);

            await authService.registrarUsuario(datos);

            toast.success("Cuenta creada correctamente.");

            onRegistered();
        } catch (error: unknown) {
            const mensaje = obtenerMensajeError(error);

            setError(mensaje);
        } finally {
            setCargando(false);
        }
    }

    function obtenerMensajeError(error: unknown): string {
        if (
            typeof error === "object" &&
            error !== null &&
            "response" in error
        ) {
            const response = (
                error as {
                    response?: {
                        data?: {
                            message?: string | string[];
                        };
                    };
                }
            ).response;

            const mensaje = response?.data?.message;

            if (Array.isArray(mensaje)) {
                return mensaje.join(" ");
            }

            if (typeof mensaje === "string") {
                return mensaje;
            }
        }

        return "No fue posible crear la cuenta. Intenta nuevamente.";
    }

    return (
        <Modal
            size="Medium"
            title="Crear cuenta"
            description="Completa la información para crear tu cuenta en Planor."
            onClose={onClose}
            actions={
                <div className="w-full flex justify-center">
                    <Button
                        type="submit"
                        form={idFormulario}
                        variant="Primary"
                        size="M"
                        disabled={cargando}
                    >
                        {cargando ? "Creando..." : "Crear cuenta"}
                    </Button>
                </div>
            }
        >
            <form
                id={idFormulario}
                onSubmit={manejarEnvio}
                className="w-full flex flex-col gap-3"
            >
                <Input
                    label="Ingresa tu nombre"
                    name="nombreUsuario"
                    type="text"
                    autoComplete="given-name"
                    required
                />

                <Input
                    label="Ingresa tu apellido"
                    name="apellidoUsuario"
                    type="text"
                    autoComplete="family-name"
                    required
                />

                <Input
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                />

                <Input
                    label="Contraseña"
                    name="contrasena"
                    type="password"
                    autoComplete="new-password"
                    helperText="Debe contener mínimo ocho caracteres, una mayúscula, una minúscula, un número y un carácter especial."
                    required
                />

                <Input
                    label="Confirmar contraseña"
                    name="confirmarContrasena"
                    type="password"
                    autoComplete="new-password"
                    required
                />

                {error && (
                    <p
                        className="text-sm text-red-400"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
            </form>
        </Modal>
    );
}