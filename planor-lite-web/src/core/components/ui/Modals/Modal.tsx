/****************************************/
/*           COMPONENTE MODAL           */
/****************************************/
/* Responsabilidades:
 * 1. Recibir las propiedades del modal.
 * 2. Renderizar la estructura del modal.
 * 3. Utilizar Button como asset.
 * 4. Utilizar Iconify para el icono de cerrar.*/

import type { ReactNode } from "react";
import { Icon } from "@iconify/react";

import {
    modalStyles,
    modalCloseActionStyles,
    modalCloseIconStyles,
    modalContentStyles,
    modalHeaderStyles,
    modalTitleStyles,
    modalDescriptionStyles,
    modalBodyStyles,
    modalActionsStyles,
} from "./Modal.styles";

import type { ModalSize } from "./Modal.types";

interface ModalProps {
    size?: ModalSize;
    title: string;
    description?: string;
    children?: ReactNode;
    actions?: ReactNode;
    onClose: () => void;
}

export function Modal({
    size = "Small",
    title,
    description,
    children,
    actions,
    onClose,
}: ModalProps) {

    return (
        <div className={modalStyles({ size })}>

            {/* ========== CLOSE ACTION ========== */}
            <div className={modalCloseActionStyles}>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Cerrar modal"
                >
                    <Icon
                        icon="mdi:close"
                        className={modalCloseIconStyles}
                    />
                </button>
            </div>

            {/* ========== MODAL CONTENT ========== */}
            <div className={modalContentStyles}>
                {/* ========== HEADER ========== */}
                <div className={modalHeaderStyles({ size })}>
                    <h2 className={modalTitleStyles({ size })}>
                        {title}
                    </h2>
                    {description && (
                        <p className={modalDescriptionStyles({ size })}>
                            {description}
                        </p>
                    )}
                </div>

                {/* ========== BODY ========== */}
                <div className={modalBodyStyles({ size })}>
                    {children}
                </div>

                {/* ========== ACTIONS ========== */}
                {actions && (
                    <div className={modalActionsStyles}>
                        {actions}
                    </div>
                )}
            </div>

        </div>
    );
}