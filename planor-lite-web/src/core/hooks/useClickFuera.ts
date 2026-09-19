import { useEffect, type RefObject } from "react";

export function useClickFuera(
    referenciaElemento: RefObject<HTMLElement | null>,
    estaAbierto: boolean,
    alHacerClickFuera: () => void
): void {
    useEffect(() => {
        function manejarClickFuera(evento: MouseEvent): void {
            if (!referenciaElemento.current) {
                return;
            }

            if (
                evento.target instanceof Node &&
                !referenciaElemento.current.contains(evento.target)
            ) {
                alHacerClickFuera();
            }
        }

        if (estaAbierto) {
            document.addEventListener("mousedown", manejarClickFuera);
        }

        return () => {
            document.removeEventListener("mousedown", manejarClickFuera);
        };
    }, [referenciaElemento, estaAbierto, alHacerClickFuera]);
}
