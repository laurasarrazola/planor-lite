/****************************************/
/*        COMPONENTE BUTTON ICON        */
/****************************************/
/* Este componente representa el contenedor reutilizable de un icono dentro del botón. Su única responsabilidad es:
 1. Reservar el espacio definido en Figma.
 2. Centrar el icono.
 3. Garantizar el mismo tamaño para todos los iconos del sistema. */
import type { ReactNode } from "react";

/****************************************/
/*        INTERFAZ DEL COMPONENTE       */
/****************************************/
/* Define las propiedades permitidas para ButtonIcon. children representa el icono que será renderizado dentro del contenedor */
interface ButtonIconProps {
    children: ReactNode;
}

/****************************************/
/*     IMPLEMENTACIÓN DEL COMPONENTE    */
/****************************************/
export function ButtonIcon({
    children,
}: ButtonIconProps) {
    return (
        <span className="flex h-6 w-6 items-center justify-center shrink-0" >
            {children}
        </span>
    );
}