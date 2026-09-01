/****************************************/
/*          COMPONENTE BUTTON           */
/****************************************/
/* Este archivo define el componente reutilizable Button. Su responsabilidad es:
 * 1. Recibir las propiedades del botón.
 * 2. Solicitar las clases CSS a button.styles.ts.
 * 3. Renderizar un elemento <button> con los estilos correspondientes.*/

import {
  useState,
  type ButtonHTMLAttributes,
  type PointerEvent,
} from "react";

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

interface PropiedadesButton
  extends ButtonHTMLAttributes<HTMLButtonElement> {

  variant?: ButtonVariant; // Color.
  buttonStyle?: ButtonStyle; // Estilo (filled u outlined).
  size?: ButtonSize; // Tamaño.
  state?: ButtonState; // Estado visual.
  iconoIzquierdo?: string; // Icono a la izquierda del texto.
  iconoDerecho?: string; // Icono a la derecha del texto.
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
  iconoIzquierdo,
  iconoDerecho,
  disabled,
  className,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  ...props
}: PropiedadesButton) {

  /* =========== Estado interno durante el clic =========== */
  const [estaActivo, setEstaActivo] = useState(false);

  /* =========== Estado deshabilitado =========== */
  /* El botón queda deshabilitado cuando se recibe disabled={true} o el estado visual es "Disabled". */

  const estaDeshabilitado =
    disabled || state === "Disabled";

  /* =========== Estado visual =========== */
  /* Determina el estado visual del botón según las propiedades recibidas y el estado interno. */

  let estadoVisual: ButtonState = "Default";

  if (estaDeshabilitado) {
    estadoVisual = "Disabled";
  } else if (estaActivo) {
    estadoVisual = "Active";
  }

  /* =========== Eventos de interacción =========== */
  /* Mantiene el estado visual Active durante la interacción con mouse, touch o stylus.
   * Los handlers externos continúan ejecutándose sin sobrescribir la lógica interna. */
  const manejarPointerDown = (
    evento: PointerEvent<HTMLButtonElement>
  ) => {
    if (!estaDeshabilitado) {
      setEstaActivo(true);
    }

    if (onPointerDown) {
      onPointerDown(evento);
    }
  };

  const manejarPointerUp = (
    evento: PointerEvent<HTMLButtonElement>
  ) => {
    setEstaActivo(false);

    if (onPointerUp) {
      onPointerUp(evento);
    }
  };

  const manejarPointerLeave = (
    evento: PointerEvent<HTMLButtonElement>
  ) => {
    setEstaActivo(false);

    if (onPointerLeave) {
      onPointerLeave(evento);
    }
  };

  const manejarPointerCancel = (
    evento: PointerEvent<HTMLButtonElement>
  ) => {
    setEstaActivo(false);

    if (onPointerCancel) {
      onPointerCancel(evento);
    }
  };

  /* =========== Render =========== */
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
      onPointerDown={manejarPointerDown}
      onPointerUp={manejarPointerUp}
      onPointerLeave={manejarPointerLeave}
      onPointerCancel={manejarPointerCancel}
      {...props}
    >
      {iconoIzquierdo && (
        <ButtonIcon
          icon={iconoIzquierdo}
          size={size}
        />
      )}

      {children}
      
      {iconoDerecho && (
        <ButtonIcon
          icon={iconoDerecho}
          size={size}
        />
      )}
    </button>
  );
}