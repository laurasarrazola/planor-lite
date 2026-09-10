import { useId, useState } from "react";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Modal } from "@/core/components/ui/Modals/Modal";
import { Input } from "@/core/components/ui/Input/Input";
import { Button } from "@/core/components/ui/Button/Button";
import { authStorageService } from "@/core/services";
import { authService } from "@/features/auth";

interface LoginModalProps {
    onClose: () => void;
}

export function LoginModal({
    onClose,
}: LoginModalProps) {
    const idFormulario = useId();
    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);
    const [cargando, setCargando] = useState(false);

    async function manejarEnvio(
        event: React.SubmitEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();
        setError(null);

        const formulario = new FormData(event.currentTarget);

        const datos = {
            email: String(
                formulario.get("email") ?? ""
            ).trim(),

            contrasena: String(
                formulario.get("contrasena") ?? ""
            ),
        };

        try {
            setCargando(true);

            const respuesta = await authService.iniciarSesion(datos);

            authStorageService.setSession(
                respuesta.token,
                true
            );

            toast.success("Sesión iniciada correctamente.");

            onClose();
            navigate("/boards");
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

        return "No fue posible iniciar sesión. Intenta nuevamente.";
    }

    return (
        <Modal
            size="Small"
            title="Iniciar Sesión"
            description="Accede a tu cuenta para administrar tus tableros."
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
                        {cargando ? "Iniciando..." : "Iniciar Sesión"}
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
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    autoComplete="username"
                    required
                />

                <Input
                    label="Contraseña"
                    name="contrasena"
                    type="password"
                    autoComplete="current-password"
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