import { useId } from "react";
import type React from "react";
import { Modal } from "@/core/components/ui/Modals/Modal";
import { Input } from "@/core/components/ui/Input/Input";
import { Button } from "@/core/components/ui/Button/Button";
//import type { RegisterModalProps } from "./RegisterModal.types";

interface RegisterModalProps {
    onClose: () => void;
}

export function RegisterModal({
    onClose,
}: RegisterModalProps) {
    const idFormulario = useId();

    function manejarEnvio(event: React.SubmitEvent<HTMLFormElement>): void {
        event.preventDefault();
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
                        size="M">
                        Crear cuenta
                    </Button>
                </div>
            }>

            <form
                id={idFormulario}
                onSubmit={manejarEnvio}>
                <Input
                    label="Ingresa tu nombre"
                    name="nombre"
                    type="text"
                    autoComplete="given-name"
                    required/>

                <Input
                    label="Ingresa tu apellido"
                    name="apellido"
                    type="text"
                    autoComplete="family-name"
                    required/>

                <Input
                    label="Correo electrónico"
                    name="correo"
                    type="email"
                    autoComplete="email"
                    required/>

                <Input
                    label="Contraseña"
                    name="contrasena"
                    type="password"
                    autoComplete="new-password"
                    helperText="Debe contener mínimo ocho caracteres, una mayúscula, una minúscula, un número y un carácter especial."
                    required/>

                <Input
                    label="Confirmar contraseña"
                    name="confirmarContrasena"
                    type="password"
                    autoComplete="new-password"
                    required/>
            </form>
            
        </Modal>
    );
}