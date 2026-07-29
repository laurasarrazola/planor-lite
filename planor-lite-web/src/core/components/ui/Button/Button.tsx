/****************************************/
/*          COMPONENTE BUTTON           */
/****************************************/
/* Este archivo define el componente reutilizable Button. Su responsabilidad es:
 * 1. Recibir las propiedades del botón.
 * 2. Solicitar las clases CSS a button.styles.ts.
 * 3. Renderizar un elemento <button> con los estilos correspondientes.*/
import type { ButtonHTMLAttributes } from "react";
import { buttonStyles } from "./button.styles";
import type {
ButtonVariant,
ButtonStyle,
ButtonSize,
ButtonEstate,
} from "./button.types";

/****************************************/
/*      INTERFAZ DEL COMPONENTE         */
/****************************************/
/* Extiende todas las propiedades nativas de un botón HTML (onClick, type, disabled, aria-label, etc.) y agrega las propiedades personalizadas del sistema de diseño. */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
variant?: ButtonVariant; // Color.
buttonStyle?: ButtonStyle; // Estilo (filled u outlined).
size?: ButtonSize; // Tamaño.
estate?: ButtonEstate; // Estado visual.
}

/****************************************/
/*     IMPLEMENTACIÓN DEL COMPONENTE    */
/****************************************/
export function Button({
  children,

  variant="Primary",
  buttonStyle="Filled",
  size="XS",
  estate="Default",

  disabled,
  className,

  ...props
}: ButtonProps) {
  /* =========== Estado deshabilitado =========== */
  /* El botón queda deshabilitado cuando se recibe disabled={true} o el estado visual es "Disabled" */
  const isDisabled = disabled || estate === "Disabled";
  return (
<button
/* Obtiene las clases CSS generadas por CVA. */
className={buttonStyles({
  variant,
  buttonStyle,
  size,
  estate,
  className,
})}
  /* Aplica el estado deshabilitado al elemento HTML. */
  disabled={isDisabled}
  {...props}
>
{children}
</button>
);
}