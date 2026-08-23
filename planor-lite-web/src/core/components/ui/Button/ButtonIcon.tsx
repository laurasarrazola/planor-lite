/****************************************/
/*        COMPONENTE BUTTON ICON        */
/****************************************/
/* Este componente representa el contenedor reutilizable de un icono dentro del botón. Su responsabilidad es:
1. Reservar el espacio definido para el icono.
2. Centrar el icono.
3. Mantener un tamaño uniforme para los iconos.
4. Utilizar Iconify como sistema de iconos de la aplicación. */

import { Icon } from "@iconify/react";

/****************************************/
/*        INTERFAZ DEL COMPONENTE       */
/****************************************/
/* Define las propiedades que puede recibir ButtonIcon. icon identifica el icono de Iconify que será mostrado. */
interface ButtonIconProps {
    icon: string;
}

/****************************************/
/*     IMPLEMENTACIÓN DEL COMPONENTE    */
/****************************************/
export function ButtonIcon({
    icon,
}: ButtonIconProps) {
    return (
        <span className="flex h-6 w-6 items-center justify-center shrink-0" >
              <Icon
                icon={icon}
                aria-hidden="true"
                className="h-full w-full"
            />
        </span>
    );
}