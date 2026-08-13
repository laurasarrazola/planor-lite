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
} from "./textArea.styles";

import type { TextAreaState } from "./textArea.types";


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

    /************************************/
    /*    ESTADO INTERNO DEL TEXTAREA   */
    /************************************/
    /* Determina si el textarea tiene actualmente el foco. */
    const [isFocused, setIsFocused] = useState(false);

    /************************************/
    /*       ESTADO DESHABILITADO       */
    /************************************/
    /* El textarea queda deshabilitado cuando:
     * 1. Se recibe disabled={true}.
     * 2. Se recibe state="Disabled". */
    const isDisabled =
        disabled || state === "Disabled";

    /************************************/
    /*        ESTADO VISUAL ACTUAL      */
    /************************************/
    /* El estado visual se determina en este orden: 1. Disabled 2. Focus 3. Default */
    const visualState: TextAreaState =
        isDisabled
            ? "Disabled"
            : isFocused
                ? "Focus"
                : "Default";


    /************************************/
    /*             ON FOCUS             */
    /************************************/
    const handleFocus = (
        event: FocusEvent<HTMLTextAreaElement>
    ) => {
        setIsFocused(true);
        onFocus?.(event);
    };


    /************************************/
    /*              ON BLUR             */
    /************************************/
    const handleBlur = (
        event: FocusEvent<HTMLTextAreaElement>
    ) => {
        setIsFocused(false);
        onBlur?.(event);
    };

    /************************************/
    /*              RENDER              */
    /************************************/
    return (
        <div className={`${textAreaStyles} ${className ?? ""}`}>

            {/* ==================================== */}
            {/*          TEXTAREA CONTENT            */}
            {/* ==================================== */}

            <div className={textAreaContentStyles}>

                {/* =========== LABEL =========== */}
                {label && (
                    <label
                        className={textAreaLabelStyles({
                            state: visualState,
                        })}
                    >
                        {label}
                    </label>
                )}


                {/* ======== TEXTAREA CONTAINER ======== */}
                <div
                    className={textAreaContainerStyles({
                        state: visualState,
                    })}>

                    {/* =========== TEXTAREA =========== */}

                    <textarea
                        className={textAreaValueStyles({
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
                    className={textAreaHelperTextStyles({
                        state: visualState,
                    })}
                >
                    {helperText}
                </span>

            )}

        </div>
    );
}