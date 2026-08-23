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
  brandingStyles,
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

interface HeaderProps {
  mode?: HeaderMode;
  navigationItems: NavigationItem[];
  onNavigationClick?: (item: NavigationItem) => void;
  onProfileClick?: () => void;
  onLogin?: () => void;
  onRegister?: () => void;
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
  return (
    <header className={headerStyles({ mode })}>

      {/* ========== BRANDING ========== */}
      <div className={brandingStyles}>
        <img
          src={logo}
          alt="Planor"
          className={logoStyles}
        />
      </div>

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

        {mode === "Authenticated" ? (

          <Icon
            icon="mingcute:user-4-fill"
            className={userIconStyles}
            onClick={onProfileClick}
          />

        ) : (

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
        )}

      </div>
    </header>
  );
}