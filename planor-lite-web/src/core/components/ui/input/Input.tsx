/****************************************/
/*           COMPONENTE INPUT           */
/****************************************/
/* Este archivo define el componente reutilizable Input. Su responsabilidad es:
 * 1. Recibir las propiedades del input.
 * 2. Solicitar las clases CSS a input.styles.ts.
 * 3. Controlar el estado visual del componente.
 * 4. Renderizar la estructura completa del componente. */

import {
    useState, //useState es un hook de React que permite agregar estado a un componente funcional.
    type FocusEvent,
    type InputHTMLAttributes,
} from "react";
import {
    inputStyles,
    inputLabelStyles,
    inputContainerStyles,
    inputValueStyles,
    helperTextStyles,
} from "./input.styles";
import type { InputState } from "./input.types";

/****************************************/
/*      INTERFAZ DEL COMPONENTE         */
/****************************************/
/* Extiende todas las propiedades nativas de un input HTML y agrega las propiedades personalizadas del sistema de diseño.*/
interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label?: string; // Texto que se muestra como etiqueta del input.
    helperText?: string; // Texto que se muestra como ayuda debajo del input.
    state?: InputState; // Estado visual del input (Default, Focus o Disabled).
}

/****************************************/
/*     IMPLEMENTACIÓN DEL COMPONENTE    */
/****************************************/
export function Input({
    label,
    helperText,
    state = "Default",
    disabled,
    className,
    onFocus,
    onBlur,
    ...props
}: InputProps) {

    /* ========== ESTADO INTERNO DEL INPUT ========= */
    /* Determina si el input tiene actualmente el foco. */
    const [estaEnFoco, cambiarEstadoFoco] = useState(false);
    //const [valor, cambiarValor] = useState(inicial), isFocused lee el estado del input, setIsFocused cambia el estado del input.

    /* ========== ESTADO DESHABILITADO ========== */
    /* El input queda deshabilitado cuando: 1. Se recibe disabled={true} 2. Se recibe state="Disabled".*/
    const estaDeshabilitado = disabled || state === "Disabled";

    /* ========== ESTADO VISUAL ACTUAL ========== */
    /* El estado visual se determina en este orden: 1. Disabled 2. Focus 3. Default */
    function obtenerEstadoVisual(): InputState {
        if (estaDeshabilitado) return "Disabled";
        if (estaEnFoco) return "Focus";
        return "Default";
    }
    const estadoVisual = obtenerEstadoVisual();

    /* ========== ON FOCUS ========== */
    // Cuando el input recibe el foco, se actualiza el estado interno.
    function manejarFoco(event: FocusEvent<HTMLInputElement>): void {
        cambiarEstadoFoco(true);
        onFocus?.(event);
    }

    /* ========== ON BLUR ========== */
    // Cuando el input pierde el foco, se actualiza el estado interno.
    function manejarDesenfoque(event: FocusEvent<HTMLInputElement>): void {
    cambiarEstadoFoco(false);
    onBlur?.(event);
}

    return (
        <div className={`${inputStyles} ${className ?? ""}`}>

            {/* =========== INPUT CONTENT =========== */}
            <div className="flex flex-col items-start gap-2 self-stretch">

                {/* =========== LABEL =========== */}
                {label && (
                    <label className={inputLabelStyles({ state: estadoVisual })}>
                        {label}
                    </label>
                )}

                {/* =========== INPUT CONTAINER =========== */}
                <div className={inputContainerStyles({ state: estadoVisual })}>

                    {/* =========== INPUT =========== */}
                    <input
                        className={inputValueStyles({ state: estadoVisual })}
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
                    className={helperTextStyles({ state: estadoVisual })}>
                    {helperText}
                </span>
            )}
        </div>
    );
}