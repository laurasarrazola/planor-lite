/****************************************/
/*          COMPONENTE BUTTON           */
/****************************************/
/* Este archivo define el componente reutilizable Button. Su responsabilidad es:
 * 1. Recibir las propiedades del botón.
 * 2. Solicitar las clases CSS a button.styles.ts.
 * 3. Renderizar un elemento <button> con los estilos correspondientes.*/

import { useState, type ButtonHTMLAttributes } from "react";
import { buttonStyles } from "./Button.styles";
import { ButtonIcon } from "./ButtonIcon";
import type {
  ButtonVariant,
  ButtonStyle,
  ButtonSize,
  ButtonState,
} from "./Button.types";

/****************************************/
/*      INTERFAZ DEL COMPONENTE         */
/****************************************/
/* Extiende todas las propiedades nativas de un botón HTML (onClick, type, disabled, aria-label, etc.) y agrega las propiedades personalizadas del sistema de diseño. */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; // Color.
  buttonStyle?: ButtonStyle; // Estilo (filled u outlined).
  size?: ButtonSize; // Tamaño.
  state?: ButtonState; // Estado visual.
  leftIcon?: string; // Icono a la izquierda del texto.
  rightIcon?: string; // Icono a la derecha del texto.
}

/****************************************/
/*     IMPLEMENTACIÓN DEL COMPONENTE    */
/****************************************/
export function Button({
  children,
  variant = "Primary",
  buttonStyle = "Filled",
  size = "XS",
  state = "Default",
  leftIcon,
  rightIcon,
  disabled,
  className,
  ...props
}: ButtonProps) {
  /* =========== Estado interno durante el clic =========== */
  const [estaActivo, setEstaActivo] = useState(false);

  /* =========== Estado deshabilitado =========== */
  /* El botón queda deshabilitado cuando se recibe disabled={true} o el estado visual es "Disabled" */
  const estaDeshabilitado = disabled || state === "Disabled";

  /* Determina el estado visual del botón según las propiedades recibidas y el estado interno. */
  let estadoVisual: ButtonState = "Default";
  if (estaDeshabilitado) {
    estadoVisual = "Disabled";
  } else if (estaActivo) {
    estadoVisual = "Active";
  }

  return (
    <button
      className={buttonStyles({
        variant,
        buttonStyle,
        size,
        state: estadoVisual,
        className,
      })}
      disabled={estaDeshabilitado}
      onMouseDown={() => setEstaActivo(true)}
      onMouseUp={() => setEstaActivo(false)}
      onMouseLeave={() => setEstaActivo(false)}
      {...props}
    >
      {leftIcon && (
        <ButtonIcon icon={leftIcon} />
      )}
      {children}
      {rightIcon && (
        <ButtonIcon icon={rightIcon} />
      )}
    </button>
  );
}