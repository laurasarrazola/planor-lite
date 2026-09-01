/****************************************/
/*        COMPONENTE BUTTON ICON        */
/****************************************/
/* Este componente representa el contenedor reutilizable de un icono dentro del botón. Su responsabilidad es:
1. Reservar el espacio definido para el icono.
2. Centrar el icono.
3. Mantener un tamaño uniforme según el tamaño del botón.
4. Utilizar Iconify como sistema de iconos de la aplicación. */

import { Icon } from "@iconify/react";

import type { ButtonSize } from "./Button.types";

/****************************************/
/*        INTERFAZ DEL COMPONENTE       */
/****************************************/
/* Define las propiedades que puede recibir ButtonIcon. */

interface ButtonIconProps {
    icon: string;
    size: ButtonSize;
}

/****************************************/
/*     IMPLEMENTACIÓN DEL COMPONENTE    */
/****************************************/
export function ButtonIcon({
    icon,
    size,
}: ButtonIconProps) {

    let tamañoIcono: string;

    if (size === "XS") {
        tamañoIcono = "h-4 w-4";
    } else if (size === "S") {
        tamañoIcono = "h-5 w-5";
    } else if (size === "M") {
        tamañoIcono = "h-5 w-5";
    } else {
        tamañoIcono = "h-6 w-6";
    }

    return (
        <span
            className={`flex ${tamañoIcono} shrink-0 items-center justify-center`}
        >
            <Icon
                icon={icon}
                aria-hidden="true"
                className="h-full w-full"
            />
        </span>
    );
}