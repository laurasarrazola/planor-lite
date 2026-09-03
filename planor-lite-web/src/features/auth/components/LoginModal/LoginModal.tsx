import { useId } from "react";
import type React from "react";
import { Modal } from "@/core/components/ui/Modals/Modal";
import { Input } from "@/core/components/ui/Input/Input";
import { Button } from "@/core/components/ui/Button/Button";

interface LoginModalProps {
    onClose: () => void;
}

export function LoginModal({
    onClose,
}: LoginModalProps) {
    const idFormulario = useId();

    function manejarEnvio(event: React.SubmitEvent<HTMLFormElement>): void {
        event.preventDefault();
    }

    return (
        <Modal
            size="Small"
            title="Iniciar Sesión"
            description="Accede a tu cuenta para administrar tus tableros."
            onClose={onClose}
            actions={
                <Button
                    type="submit"
                    form={idFormulario}
                    variant="Primary"
                    size="M"
                >
                    Iniciar Sesión
                </Button>
            }>

            <form
                id={idFormulario}
                onSubmit={manejarEnvio}
                className="w-full flex flex-col gap-3">

                <Input
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    autoComplete="username"
                    required />

                <Input
                    label="Contraseña"
                    name="contrasena"
                    type="password"
                    autoComplete="current-password"
                    required />
            </form>

        </Modal>
    );
}