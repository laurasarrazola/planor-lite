/****************************************/
/*      COMPONENTE HEADER               */
/****************************************/
/*
 * Este archivo define el componente reutilizable Header.
 * Responsabilidades:
 * 1. Recibir las propiedades del header.
 * 2. Gestionar el estado del menú móvil.
 * 3. Solicitar los estilos a Header.styles.ts.
 * 4. Renderizar el header.
 */

import { useState } from "react";
import type { ReactNode } from "react";
import { Icon } from "@iconify/react";
import logo from "@/assets/logo/Planor-logo.svg";
import { Button } from "../../ui/Button/Button";
import {
    headerStyles,
    logoStyles,
    navigationStyles,
    navigationItemStyles,
    actionsStyles,
    userIconStyles,
    menuButtonStyles,
    menuIconStyles,
    mobileMenuStyles,
    mobileMenuItemStyles,
    mobileMenuDividerStyles,
} from "./Header.styles";
import type {
    ModoHeader,
    ElementoNavegacion,
} from "./Header.types";

/****************************************/
/*      INTERFAZ DEL COMPONENTE         */
/****************************************/
/* Define las propiedades que recibe el componente Header */
interface PropiedadesHeader {
    modo?: ModoHeader;
    alHacerClickNavegacion?: (elemento: ElementoNavegacion) => void;
    alHacerClickPerfil?: () => void;
    alIniciarSesion?: () => void;
    alRegistrar?: () => void;
}

/****************************************/
/*    IMPLEMENTACIÓN DEL COMPONENTE    */
/****************************************/
export function Header({
    modo = "Guest",
    alHacerClickNavegacion,
    alHacerClickPerfil,
    alIniciarSesion,
    alRegistrar,
}: PropiedadesHeader) {

    /****************************************/
    /*       ESTADO DEL MENÚ MÓVIL         */
    /****************************************/
    const [menuAbierto, establecerMenuAbierto] = useState(false);

    /****************************************/
    /*             NAVEGACIÓN              */
    /****************************************/
    let elementosNavegacion: ElementoNavegacion[];

    if (modo === "Authenticated") {
        elementosNavegacion = [{ label: "Mis tableros" }];
    } else {
        elementosNavegacion = [
            { label: "Inicio" },
            { label: "Características" },
            { label: "Cómo funciona" },
        ];
    }

    /****************************************/
    /*             ACCIONES                */
    /****************************************/
    const cerrarMenu = () => {
        establecerMenuAbierto(false);
    };

    const ejecutarAccion = (funcion?: () => void) => {
        if (funcion) {
            funcion();
        } else {
            cerrarMenu();
            return;
        }
        cerrarMenu();
    };

    const manejarNavegacion = (elemento: ElementoNavegacion) => {
        if (alHacerClickNavegacion) {
            alHacerClickNavegacion(elemento);
        }
        cerrarMenu();
    };

    /****************************************/
    /*          ACCIONES DESKTOP           */
    /****************************************/
    let acciones: ReactNode;

    if (modo === "Authenticated") {
        acciones = (
            <button
                type="button"
                className="border-0 bg-transparent p-0"
                onClick={() => ejecutarAccion(alHacerClickPerfil)}
                aria-label="Abrir perfil"
            >
                <Icon
                    icon="mingcute:user-4-fill"
                    className={userIconStyles}
                    aria-hidden="true"
                />
            </button>
        );
    } else {
        acciones = (
            <>
                <Button
                    variant="CTA"
                    buttonStyle="Outlined"
                    onClick={() => ejecutarAccion(alIniciarSesion)}
                >
                    Iniciar sesión
                </Button>

                <Button
                    variant="Primary"
                    buttonStyle="Filled"
                    onClick={() => ejecutarAccion(alRegistrar)}
                >
                    Registrarse
                </Button>
            </>
        );
    }

    /****************************************/
    /*        CONTROLES DEL MENÚ           */
    /****************************************/
    let etiquetaMenu: string;
    let iconoMenu: string;

    if (menuAbierto) {
        etiquetaMenu = "Cerrar menú";
        iconoMenu = "mingcute:close-fill";
    } else {
        etiquetaMenu = "Abrir menú";
        iconoMenu = "mingcute:menu-fill";
    }

    /****************************************/
    /*        CONTENIDO MENÚ MÓVIL         */
    /****************************************/
    let contenidoMenuMovil: ReactNode;

    if (modo === "Authenticated") {
        contenidoMenuMovil = (
            <button
                type="button"
                className={mobileMenuItemStyles}
                onClick={() => ejecutarAccion(alHacerClickPerfil)}
            >
                Perfil
            </button>
        );
    } else {
        contenidoMenuMovil = (
            <>
                <button
                    type="button"
                    className={mobileMenuItemStyles}
                    onClick={() => ejecutarAccion(alIniciarSesion)}
                >
                    Iniciar sesión
                </button>

                <button
                    type="button"
                    className={mobileMenuItemStyles}
                    onClick={() => ejecutarAccion(alRegistrar)}
                >
                    Registrarse
                </button>
            </>
        );
    }

    /****************************************/
    /*             RENDER                  */
    /****************************************/
    return (
        <header className={headerStyles}>

            {/* ========== LOGO ========== */}

            <img
                src={logo}
                alt="Planor"
                className={logoStyles}
            />

            {/* ========== NAVEGACIÓN DESKTOP ========== */}
            <nav
                className={navigationStyles}
                aria-label="Navegación principal"
            >
                {elementosNavegacion.map((item) => (
                    <button
                        key={item.label}
                        type="button"
                        className={navigationItemStyles}
                        onClick={() => manejarNavegacion(item)}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* ========== ACCIONES DESKTOP ========== */}
            <div className={actionsStyles}>
                {acciones}
            </div>

            {/* ========== MENÚ HAMBURGUESA ========== */}
            <button
                type="button"
                className={menuButtonStyles}
                onClick={() => establecerMenuAbierto((estadoActual) => !estadoActual)}
                aria-label={etiquetaMenu}
                aria-expanded={menuAbierto}
                aria-controls="mobile-navigation"
            >
                <Icon
                    icon={iconoMenu}
                    className={menuIconStyles}
                    aria-hidden="true"
                />
            </button>

            {/* ========== MENÚ MÓVIL ========== */}
            {menuAbierto && (
                <nav
                    id="mobile-navigation"
                    className={mobileMenuStyles}
                    aria-label="Navegación móvil"
                >

                    {/* ========== NAVEGACIÓN ========== */}
                    {elementosNavegacion.map((item) => (
                        <button
                            key={item.label}
                            type="button"
                            className={mobileMenuItemStyles}
                            onClick={() => manejarNavegacion(item)}
                        >
                            {item.label}
                        </button>
                    ))}

                    <div className={mobileMenuDividerStyles} />

                    {/* ========== ACCIONES ========== */}
                    {contenidoMenuMovil}

                </nav>
            )}
        </header>
    );
}