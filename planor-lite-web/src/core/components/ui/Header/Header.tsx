/****************************************/
/*      COMPONENTE HEADER                */
/****************************************/
/* Este archivo define el componente reutilizable Header. Responsabilidades:
 * 1. Recibir las propiedades del header.
 * 2. Solicitar los estilos a Header.styles.ts.
 * 3. Renderizar el header.*/

import { Icon } from "@iconify/react";
import logo from "@/assets/logo/Planor-logo.svg";
import { Button } from "../Button/Button";
import {
  headerStyles,
  logoStyles,
  navigationStyles,
  navigationItemStyles,
  actionsStyles,
  userIconStyles,
} from "./Header.styles";
import type {
  HeaderMode,
  NavigationItem,
} from "./Header.types";

/****************************************/
/*      INTERFAZ DEL COMPONENTE         */
/****************************************/
/* Define las propiedades que recibe el componente Header */
interface HeaderProps {
  mode?: HeaderMode; // Define si el header corresponde a un usuario autenticado o invitado.
  navigationItems: NavigationItem[]; // Contiene los elementos que aparecerán en la navegación.
  onNavigationClick?: (item: NavigationItem) => void; // Función ejecutada cuando el usuario selecciona un elemento de navegación.
  onProfileClick?: () => void;  // Función ejecutada cuando el usuario hace clic en el perfil.
  onLogin?: () => void; // Función ejecutada cuando el usuario hace clic en iniciar sesión.
  onRegister?: () => void; // Función ejecutada cuando el usuario hace clic en registrarse.
}

/****************************************/
/*     IMPLEMENTACIÓN DEL COMPONENTE    */
/****************************************/
export function Header({
  mode = "Guest",
  navigationItems,
  onNavigationClick,
  onProfileClick,
  onLogin,
  onRegister,
}: HeaderProps) {

let acciones;

if (mode === "Authenticated") {
  acciones = (
    <Icon
      icon="mingcute:user-4-fill"
      className={userIconStyles}
      onClick={onProfileClick}
    />
  );
} else {
  acciones = (
    <>
      <Button
        variant="CTA"
        buttonStyle="Outlined"
        onClick={onLogin}
      >
        Iniciar sesión
      </Button>

      <Button
        variant="Primary"
        buttonStyle="Filled"
        onClick={onRegister}
      >
        Registrarse
      </Button>
    </>
  );
}

  return (
    <header className={headerStyles({ mode })}>

      {/* ========== LOGO ========== */}
      <img
        src={logo}
        alt="Planor"
        className={logoStyles}
      />

      {/* ========== NAVEGACIÓN ========== */}
      <nav className={navigationStyles}>
        {navigationItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={navigationItemStyles}
            onClick={() => onNavigationClick?.(item)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* ========== ACCIONES ========== */}
      <div className={actionsStyles}>
        {acciones}
      </div>
    </header>
  );
}