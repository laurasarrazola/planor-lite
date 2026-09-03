import { useState } from "react";
import { RegisterModal } from "@/features/auth/components/RegisterModal/RegisterModal";
import { Icon } from "@iconify/react";
import { Header } from "@/core/components/layout/Header/Header";
import { Footer } from "@/core/components/layout/Footer/Footer";
import { Button } from "@/core/components/ui/Button/Button";
import { HomeCard } from "../components/HomeCards/HomeCards";
import {
    homePageStyles,
    homeMainStyles,
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

//Se declaran las características y beneficios, estas se declaran fuera de la fn HomePage para evitar recrearlas en cada renderizado, mejorando el rendimiento y manteniendo constantes los datos de contenido de la página.
/************************************/
/*        HOME CARDS CONTENT        */
/************************************/
const caracteristicasInicio = [
    {
        accent: "Amatista" as const,
        icon: "bi:kanban",
        title: "Ordena tus tareas",
        description: "Organiza tus tareas en un tablero Kanban claro, sencillo y fácil de gestionar.",
    },
    {
        accent: "ZafiroLavanda" as const,
        icon: "streamline-plump:task-list-edit-remix",
        title: "Visualiza tu trabajo",
        description: "Visualiza el estado de tus tareas y descubre fácilmente qué debes hacer a continuación.",
    },
    {
        accent: "Amatista" as const,
        icon: "nimbus:lock",
        title: "Mantén tu privacidad",
        description: "Gestiona tus tableros y mantén tu información organizada y privada.",
    },
    {
        accent: "ZafiroLavanda" as const,
        icon: "gravity-ui:target-dart",
        title: "Alcanza tus objetivos",
        description: "Da seguimiento a tus tareas y avanza de forma sencilla hacia tus objetivos y metas.",
    },
];

/************************************/
/*          HOME BENEFITS           */
/************************************/
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

/************************************/
/*       HOME PAGE FUNCTION         */
/************************************/
// `HomePage` es el componente principal de inicio. Renderiza el encabezado, Hero, características, llamada a la acción y pie de página, además de gestionar la navegación hacia las distintas secciones mediante desplazamiento suave.
export function HomePage() {
    const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);

    function manejarAbrirModalRegistro(): void {
        setMostrarModalRegistro(true);
    }

    function manejarCerrarModalRegistro(): void {
        setMostrarModalRegistro(false);
    }

    /************************************/
    /*         HEADER NAVIGATION        */
    /************************************/
    // Gestiona la navegación interna, desplazando la vista hacia la sección seleccionada, como inicio o características.
    const manejarClicNavegacion = (elemento: ElementoNavegacion) => {
        if (elemento.label === "Inicio") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            return;
        }

        if (elemento.label === "Características") {
            document
                .getElementById("caracteristicas")
                ?.scrollIntoView({
                    behavior: "smooth",
                });
            return;
        }
    };

    /************************************/
    /*           RENDERIZADO            */
    /************************************/
    return (
        <div className={homePageStyles}>

            {/* ========== HEADER ========== */}
            <Header
                modo="Guest"
                alHacerClickNavegacion={manejarClicNavegacion} />

            {/* ========== MAIN ========== */}
            <main className={homeMainStyles}>

                {/* ========== HERO ========== */}
                <section
                    id="inicio"
                    className={homeHeroStyles}
                >

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
                                    onClick={() =>
                                        document
                                            .getElementById("caracteristicas")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            })
                                    }>
                                    Conocer más
                                </Button>
                            </div>

                            {/* ---------- BENEFITS ---------- */}
                            <div className={homeHeroBenefitsStyles}>
                                {beneficiosHeroInicio.map((beneficio) => (
                                    <div
                                        key={beneficio.texto}
                                        className={homeHeroBenefitStyles} >
                                        <Icon
                                            icon={beneficio.icono}
                                            className={homeHeroBenefitIconStyles} />
                                        <span>{beneficio.texto}</span>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>

                    {/* ---------- HERO IMAGE ---------- */}
                    <div className={homeHeroImageContainerStyles}>
                        <img
                            src={heroImage}
                            className={homeHeroImageStyles} />
                    </div>

                </section>

                {/* ========== FEATURES ========== */}
                <section
                    id="caracteristicas"
                    className={homeFeaturesStyles}>
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
                <section
                    id="cta"
                    className={homeCtaStyles}>
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
                <RegisterModal
                    onClose={manejarCerrarModalRegistro}
                />
            )}

            {/* ========== FOOTER ========== */}
            <Footer />

        </div>
    );
}