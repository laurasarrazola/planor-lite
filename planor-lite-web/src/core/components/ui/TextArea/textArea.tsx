/****************************************/
/*        COMPONENTE TEXTAREA           */
/****************************************/
/* Este archivo define el componente reutilizable TextArea. Su responsabilidad es:
 * 1. Recibir las propiedades del TextArea.
 * 2. Solicitar las clases CSS a textArea.styles.ts.
 * 3. Controlar el estado visual del componente.
 * 4. Renderizar la estructura completa. */

import {
    useState,
    type FocusEvent,
    type TextareaHTMLAttributes,
} from "react";

import {
    textAreaStyles,
    textAreaContentStyles,
    textAreaLabelStyles,
    textAreaContainerStyles,
    textAreaValueStyles,
    textAreaHelperTextStyles,
} from "./TextArea.styles";

import type { TextAreaState } from "./TextArea.types";


/****************************************/
/*      INTERFAZ DEL COMPONENTE         */
/****************************************/
/* Extiende las propiedades nativas de un textarea HTML y agrega las propiedades personalizadas del sistema de diseño. */
interface TextAreaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    helperText?: string;
    state?: TextAreaState;
}

/****************************************/
/*     IMPLEMENTACIÓN DEL COMPONENTE    */
/****************************************/
export function TextArea({
    label,
    helperText,
    state = "Default",
    disabled,
    className,
    onFocus,
    onBlur,
    ...props
}: TextAreaProps) {

    /* ========= ESTADO INTERNO DEL TEXTAREA ========= */
    /* Determina si el textarea tiene actualmente el foco. */
    const [estaEnFoco, cambiarEstadoFoco] = useState(false);

    /* ========= ESTADO DESHABILITADO ========= */
    /* El textarea queda deshabilitado cuando: 1. Se recibe disabled={true} 2. Se recibe state="Disabled". */
    const estaDeshabilitado = disabled || state === "Disabled";

    /* =========  ESTADO VISUAL ACTUAL ========= */
    /* El estado visual se determina en este orden: 1. Disabled 2. Focus 3. Default */
    function obtenerEstadoVisual(): TextAreaState {
        if (estaDeshabilitado) return "Disabled";
        if (estaEnFoco) return "Focus";
        return "Default";
    }
    const estadoVisual = obtenerEstadoVisual();


    /* ========= ON FOCUS ========= */
    function manejarFoco(event: FocusEvent<HTMLTextAreaElement>): void {
        cambiarEstadoFoco(true);
        onFocus?.(event);
    }

    /* ========= ON BLUR ========= */
    function manejarDesenfoque(event: FocusEvent<HTMLTextAreaElement>): void {
        cambiarEstadoFoco(false);
        onBlur?.(event);
    }

    return (
        <div className={`${textAreaStyles} ${className ?? ""}`}>

            {/* ========= TEXTAREA CONTENT ========= */}
            <div className={textAreaContentStyles}>

                {/* =========== LABEL =========== */}
                {label && (
                    <label className={textAreaLabelStyles({
                        state: estadoVisual
                    })}>
                        {label}
                    </label>
                )}

                {/* ======== TEXTAREA CONTAINER ======== */}
                <div className={textAreaContainerStyles({ state: estadoVisual })}>

                    {/* =========== TEXTAREA =========== */}
                    <textarea
                        className={textAreaValueStyles({ state: estadoVisual })}
                        disabled={estaDeshabilitado}
                        onFocus={manejarFoco}
                        onBlur={manejarDesenfoque}
                        {...props}
                    />
                </div>
            </div>

            {/* =========== HELPER TEXT =========== */}
            {helperText && (
                <span
                    className={textAreaHelperTextStyles({ state: estadoVisual })}>
                    {helperText}
                </span>
            )}
        </div>
    );
}