import { useState } from "react";
import { RegisterModal } from "@/features/auth/components/RegisterModal/RegisterModal";
import { LoginModal } from "@/features/auth/components/LoginModal/LoginModal";
import { Icon } from "@iconify/react";
import { Header } from "@/core/components/layout/Header/Header";
import { Footer } from "@/core/components/layout/Footer/Footer";
import { Button } from "@/core/components/ui/Button/Button";
import { HomeCard } from "../components/HomeCards/HomeCards";
import {
    homePageStyles,
    homeHeroStyles,
    homeHeroContentStyles,
    homeHeroBadgeStyles,
    homeHeroBadgeIconStyles,
    homeHeroTitleStyles,
    homeHeroTitleAccentStyles,
    homeHeroDescriptionStyles,
    homeHeroActionsStyles,
    homeHeroButtonsStyles,
    homeHeroBenefitsStyles,
    homeHeroBenefitStyles,
    homeHeroBenefitIconStyles,
    homeHeroImageContainerStyles,
    homeHeroImageStyles,
    homeHowItWorksStyles,
    homeHowItWorksHeaderStyles,
    homeHowItWorksEyebrowStyles,
    homeHowItWorksTitleStyles,
    homeHowItWorksDescriptionStyles,
    homeHowItWorksStepsStyles,
    homeHowItWorksStepStyles,
    homeHowItWorksStepNumberStyles,
    homeHowItWorksStepIconContainerStyles,
    homeHowItWorksStepIconStyles,
    homeHowItWorksStepTitleStyles,
    homeHowItWorksStepDescriptionStyles,
    homeHowItWorksConnectorStyles,
    homeFeaturesStyles,
    homeFeaturesTitleStyles,
    homeFeaturesCardsStyles,
    homeCtaStyles,
    homeCtaContentStyles,
    homeCtaTitleStyles,
    homeCtaDescriptionStyles,
} from "./HomePage.styles";
import heroImage from "@/assets/hero.png";
import type { ElementoNavegacion } from "@/core/components/layout/Header/Header.types";

const caracteristicasInicio = [
    {
        accent: "Amatista" as const,
        icon: "bi:kanban",
        title: "Ordena tus tareas",
        description:
            "Organiza tus tareas en un tablero Kanban claro, sencillo y fácil de gestionar.",
    },
    {
        accent: "ZafiroLavanda" as const,
        icon: "streamline-plump:task-list-edit-remix",
        title: "Visualiza tu trabajo",
        description:
            "Visualiza el estado de tus tareas y descubre fácilmente qué debes hacer a continuación.",
    },
    {
        accent: "Amatista" as const,
        icon: "nimbus:lock",
        title: "Mantén tu privacidad",
        description:
            "Gestiona tus tableros y mantén tu información organizada y privada.",
    },
    {
        accent: "ZafiroLavanda" as const,
        icon: "gravity-ui:target-dart",
        title: "Alcanza tus objetivos",
        description:
            "Da seguimiento a tus tareas y avanza de forma sencilla hacia tus objetivos y metas.",
    },
];

const beneficiosHeroInicio = [
    {
        texto: "Gratis para empezar",
        icono: "icon-park-outline:check-one",
    },
    {
        texto: "Privado y seguro",
        icono: "nimbus:lock",
    },
    {
        texto: "Fácil de usar",
        icono: "akar-icons:thunder",
    },
];

const pasosComoFunciona = [
    {
        numero: "01",
        icono: "mdi:account-plus-outline",
        titulo: "Crea tu cuenta",
        descripcion:
            "Regístrate en Planor e inicia sesión para acceder a tu espacio personal.",
    },
    {
        numero: "02",
        icono: "bi:kanban",
        titulo: "Crea tu tablero",
        descripcion:
            "Crea un tablero para organizar y visualizar el trabajo que quieres realizar.",
    },
    {
        numero: "03",
        icono: "streamline-plump:task-list-edit-remix",
        titulo: "Crea tus tareas",
        descripcion:
            "Registra tus tareas con la información necesaria para mantener todo organizado.",
    },
    {
        numero: "04",
        icono: "carbon:task-complete",
        titulo: "Organiza y avanza",
        descripcion:
            "Visualiza tus tareas por estado y muévelas a medida que avanzas en tu trabajo.",
    },
    {
        numero: "05",
        icono: "gravity-ui:target-dart",
        titulo: "Alcanza tus objetivos",
        descripcion:
            "Mantén el control de tu trabajo y completa tus tareas de forma clara y enfocada.",
    },
];

export function HomePage() {
    const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
    const [mostrarModalLogin, setMostrarModalLogin] = useState(false);

    function manejarAbrirModalRegistro(): void {
        setMostrarModalRegistro(true);
    }

    function manejarCerrarModalRegistro(): void {
        setMostrarModalRegistro(false);
    }

    function manejarAbrirModalLogin(): void {
        setMostrarModalLogin(true);
    }

    function manejarCerrarModalLogin(): void {
        setMostrarModalLogin(false);
    }

    /* Desplaza suavemente la vista hacia una sección de la página. */
    function desplazarASeccion(idSeccion: string): void {
        document
            .getElementById(idSeccion)
            ?.scrollIntoView({
                behavior: "smooth",
            });
    }

    /* Gestiona la navegación interna del Header. */
    function manejarClicNavegacion(
        elemento: ElementoNavegacion
    ): void {
        if (elemento.label === "Inicio") {
            desplazarASeccion("inicio");
            return;
        }

        if (elemento.label === "Cómo funciona") {
            desplazarASeccion("como-funciona");
            return;
        }

        if (elemento.label === "Características") {
            desplazarASeccion("caracteristicas");
            return;
        }
    }

    return (
        <div className={homePageStyles}>

            {/* ========== HEADER ========== */}
            <Header
                modo="Guest"
                alHacerClickNavegacion={manejarClicNavegacion}
                alIniciarSesion={manejarAbrirModalLogin}
                alRegistrar={manejarAbrirModalRegistro}
            />

            {/* ========== MAIN ========== */}
            <main>

                {/* ========== HERO ========== */}
                <section
                    id="inicio"
                    className={homeHeroStyles}>
                    {/* ---------- HERO CONTENT ---------- */}

                    <div className={homeHeroContentStyles}>
                        {/* ---------- BADGE ---------- */}
                        <div className={homeHeroBadgeStyles}>
                            <Icon
                                icon="hugeicons:stars"
                                className={homeHeroBadgeIconStyles}
                                aria-hidden="true" />
                            <span>
                                Tu espacio, tus tareas, tu enfoque
                            </span>
                        </div>

                        {/* ---------- TITLE ---------- */}
                        <h1 className={homeHeroTitleStyles}>
                            Organiza tu trabajo
                            <br />
                            <span className={homeHeroTitleAccentStyles}>
                                Alcanza tus metas.
                            </span>
                        </h1>

                        {/* ---------- DESCRIPTION ---------- */}
                        <p className={homeHeroDescriptionStyles}>
                            Planor es tu tablero Kanban personal para
                            planificar, organizar y completar tareas de la
                            manera más eficiente.
                            <br />
                            Sin distracciones, sin complicaciones.
                        </p>

                        {/* ---------- ACTIONS ---------- */}
                        <div className={homeHeroActionsStyles}>

                            {/* ---------- BUTTONS ---------- */}
                            <div className={homeHeroButtonsStyles}>
                                <Button
                                    variant="Primary"
                                    buttonStyle="Filled"
                                    size="L"
                                    onClick={manejarAbrirModalRegistro}>
                                    Comienza gratis
                                </Button>

                                <Button
                                    variant="CTA"
                                    buttonStyle="Outlined"
                                    size="L"
                                    onClick={() => desplazarASeccion("caracteristicas")}>
                                    Conocer más
                                </Button>
                            </div>

                            {/* ---------- BENEFITS ---------- */}
                            <div className={homeHeroBenefitsStyles}>
                                {beneficiosHeroInicio.map((beneficio) => (
                                    <div
                                        key={beneficio.texto}
                                        className={homeHeroBenefitStyles}>
                                        <Icon
                                            icon={beneficio.icono}
                                            className={homeHeroBenefitIconStyles}
                                            aria-hidden="true" />

                                        <span>
                                            {beneficio.texto}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ---------- HERO IMAGE ---------- */}
                    <div className={homeHeroImageContainerStyles}>
                        <img
                            src={heroImage}
                            className={homeHeroImageStyles}
                            alt="Vista previa de Planor" />
                    </div>
                </section>

                {/* ========== CÓMO FUNCIONA ========== */}
                <section
                    id="como-funciona"
                    className={homeHowItWorksStyles}>

                    <div className={homeHowItWorksHeaderStyles}>
                        <span className={homeHowItWorksEyebrowStyles}>
                            SIMPLE Y ENFOCADO
                        </span>

                        <h2 className={homeHowItWorksTitleStyles}>
                            Organiza tu trabajo en pocos pasos
                        </h2>

                        <p className={homeHowItWorksDescriptionStyles}>
                            Planor te permite organizar tus tareas, visualizar tu progreso
                            y mantener el control de tu trabajo desde un solo lugar.
                        </p>
                    </div>

                    <div className={homeHowItWorksStepsStyles}>
                        {pasosComoFunciona.map((paso, indice) => (
                            <div key={paso.numero} className={homeHowItWorksStepStyles}>
                                <div className={homeHowItWorksStepNumberStyles}>
                                    {paso.numero}
                                </div>

                                <div className={homeHowItWorksStepIconContainerStyles}>
                                    <Icon
                                        icon={paso.icono}
                                        className={homeHowItWorksStepIconStyles}
                                        aria-hidden="true" />
                                </div>

                                <h3 className={homeHowItWorksStepTitleStyles}>
                                    {paso.titulo}
                                </h3>

                                <p className={homeHowItWorksStepDescriptionStyles}>
                                    {paso.descripcion}
                                </p>

                                {indice < pasosComoFunciona.length - 1 && (
                                    <div
                                        className={homeHowItWorksConnectorStyles}
                                        aria-hidden="true" />)}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ========== FEATURES ========== */}
                <section id="caracteristicas" className={homeFeaturesStyles}>
                    <h2 className={homeFeaturesTitleStyles}>
                        Todo lo que necesitas para mantenerte organizado
                    </h2>

                    <div className={homeFeaturesCardsStyles}>
                        {caracteristicasInicio.map((caracteristica) => (
                            <HomeCard
                                key={caracteristica.title}
                                accent={caracteristica.accent}
                                icon={caracteristica.icon}
                                title={caracteristica.title}
                                description={caracteristica.description} />
                        ))}
                    </div>
                </section>

                {/* ========== CTA ========== */}
                <section id="cta" className={homeCtaStyles}>
                    <div className={homeCtaContentStyles}>
                        <h2 className={homeCtaTitleStyles}>
                            Comienza a organizar tu trabajo hoy.
                        </h2>

                        <p className={homeCtaDescriptionStyles}>
                            Crea tu primer tablero en minutos y mantén todas
                            tus tareas en un solo lugar. Sin complicaciones,
                            con una experiencia simple y enfocada.
                        </p>

                        <Button
                            variant="Primary"
                            buttonStyle="Filled"
                            size="L"
                            onClick={manejarAbrirModalRegistro}>
                            Comienza gratis
                        </Button>
                    </div>
                </section>
            </main>

            {/* ========== REGISTER MODAL ========== */}
            {mostrarModalRegistro && (
                <RegisterModal onClose={manejarCerrarModalRegistro} />
            )}

            {/* ========== LOGIN MODAL ========== */}
            {mostrarModalLogin && (
                <LoginModal onClose={manejarCerrarModalLogin} />
            )}

            {/* ========== FOOTER ========== */}
            <Footer />
        </div>
    );
}