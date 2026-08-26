import logo from "@/assets/logo/Planor-logo.svg";
import {
    footerStyles,
    footerContentStyles,
    footerNavigationStyles,
    footerNavigationItemStyles,
    footerBottomStyles,
    footerTextStyles,
} from "./Footer.styles";

export function Footer() {
    return (
        <footer className={footerStyles}>

            {/* ========== FOOTER CONTENT ========== */}
            <div className={footerContentStyles}>
                {/* ========== LOGO ========== */}
                <img src={logo} alt="Planor"/>

                {/* ========== FOOTER NAVIGATION ========== */}
                <nav
                    className={footerNavigationStyles}
                    aria-label="Navegación del footer">
                    <a href="#caracteristicas" className={footerNavigationItemStyles} >
                        Características
                    </a>
                    <a href="#como-funciona" className={footerNavigationItemStyles} >
                        Cómo funciona
                    </a>
                    <a href="#contacto" className={footerNavigationItemStyles} >
                        Contacto
                    </a>
                </nav>
            </div>

            {/* ========== FOOTER BOTTOM ========== */}
            <div className={footerBottomStyles}>
                <span className={footerTextStyles}>
                    © 2026 Planor
                </span>
                <span className={footerTextStyles}>
                    Versión 1.0
                </span>
            </div>

        </footer>
    );
}