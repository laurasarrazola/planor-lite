/****************************************/
/*           COMPONENTE INPUT           */
/****************************************/
/* Este archivo define el componente reutilizable Input. Su responsabilidad es:
 * 1. Recibir las propiedades del input.
 * 2. Solicitar las clases CSS a input.styles.ts.
 * 3. Controlar el estado visual del componente.
 * 4. Renderizar la estructura completa del componente. */

import {
    useState,
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
    label?: string;
    helperText?: string;
    state?: InputState;
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

    /************************************/
    /*      ESTADO INTERNO DEL INPUT    */
    /************************************/
    /* Determina si el input tiene actualmente el foco. */
    const [isFocused, setIsFocused] = useState(false);

    /************************************/
    /*      ESTADO DESHABILITADO        */
    /************************************/

    /* El input queda deshabilitado cuando:
     * 1. Se recibe disabled={true}.
     * 2. Se recibe state="Disabled".*/
    const isDisabled =
        disabled || state === "Disabled";

    /************************************/
    /*       ESTADO VISUAL ACTUAL       */
    /************************************/

    /* El estado visual se determina en este orden:
     *
     * 1. Disabled
     * 2. Focus
     * 3. Default
     */
    const visualState: InputState =
        isDisabled
            ? "Disabled"
            : isFocused
                ? "Focus"
                : "Default";

    /************************************/
    /*             ON FOCUS             */
    /************************************/

    const handleFocus = (
        event: FocusEvent<HTMLInputElement>
    ) => {

        setIsFocused(true);

        onFocus?.(event);
    };

    /************************************/
    /*              ON BLUR              */
    /************************************/

    const handleBlur = (
        event: FocusEvent<HTMLInputElement>
    ) => {

        setIsFocused(false);

        onBlur?.(event);
    };

    return (

        <div
            className={inputStyles({
                state: visualState,
                className,
            })}
        >

            {/* ==================================== */}
            {/*            INPUT CONTENT             */}
            {/* ==================================== */}

            <div className="flex flex-col items-start gap-2 self-stretch">

                {/* =========== LABEL =========== */}

                {label && (

                    <label
                        className={inputLabelStyles({
                            state: visualState,
                        })}
                    >
                        {label}
                    </label>

                )}

                {/* =========== INPUT CONTAINER =========== */}

                <div
                    className={inputContainerStyles({
                        state: visualState,
                    })}
                >

                    {/* =========== INPUT =========== */}

                    <input
                        className={inputValueStyles({
                            state: visualState,
                        })}
                        disabled={isDisabled}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        {...props}
                    />

                </div>

            </div>

            {/* =========== HELPER TEXT =========== */}

            {helperText && (

                <span
                    className={helperTextStyles({
                        state: visualState,
                    })}
                >
                    {helperText}
                </span>

            )}

        </div>
    );
}