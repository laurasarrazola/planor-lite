/**
 * ============================================================
 * HOME PAGE
 * ============================================================
 */

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

/**
 * ============================================================
 * FEATURES DATA
 * ============================================================
 */

const homeFeatures = [
    {
        accent: "Amatista" as const,
        icon: "mingcute:task-2-fill",
        title: "Organiza tus tareas",
        description:
            "Mantén tus tareas organizadas en un tablero Kanban claro y sencillo.",
    },
    {
        accent: "ZafiroLavanda" as const,
        icon: "mingcute:layout-grid-fill",
        title: "Visualiza tu trabajo",
        description:
            "Visualiza fácilmente el estado de cada tarea y conoce qué debes hacer.",
    },
    {
        accent: "Amatista" as const,
        icon: "mingcute:lock-fill",
        title: "Mantén tu privacidad",
        description:
            "Tus tableros son personales y están pensados para mantener tu información privada.",
    },
    {
        accent: "ZafiroLavanda" as const,
        icon: "mingcute:check-fill",
        title: "Alcanza tus objetivos",
        description:
            "Avanza tus tareas y lleva un seguimiento sencillo de tu progreso.",
    },
];

/**
 * ============================================================
 * HERO BENEFITS DATA
 * ============================================================
 *
 * Se evita repetir tres veces el mismo JSX.
 */

const homeHeroBenefits = [
    "Gratis para empezar",
    "Privado y seguro",
    "Fácil de usar",
];

/**
 * ============================================================
 * HOME PAGE
 * ============================================================
 */

export function HomePage() {
    /**
     * ========================================================
     * HEADER NAVIGATION
     * ========================================================
     */

    const handleNavigationClick = (item: { label: string }) => {
        if (item.label === "Inicio") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            return;
        }

        if (item.label === "Características") {
            document
                .getElementById("caracteristicas")
                ?.scrollIntoView({
                    behavior: "smooth",
                });

            return;
        }

        /*
         * "Cómo funciona" todavía no tiene una sección
         * correspondiente en el diseño proporcionado.
         *
         * No se asigna un destino arbitrario.
         */
    };

    /**
     * ========================================================
     * RENDER
     * ========================================================
     */

    return (
        <div className={homePageStyles}>
            {/* ================= HEADER ================= */}

            <Header
                mode="Guest"
                onNavigationClick={handleNavigationClick}
            />

            {/* ================= MAIN ================= */}

            <main className={homeMainStyles}>
                {/* ================= HERO ================= */}

                <section
                    id="inicio"
                    className={homeHeroStyles}
                >
                    {/* ---------- HERO CONTENT ---------- */}

                    <div className={homeHeroContentStyles}>
                        {/* ---------- BADGE ---------- */}

                        <div className={homeHeroBadgeStyles}>
                            <Icon
                                icon="mingcute:sparkles-fill"
                                className={homeHeroBadgeIconStyles}
                                aria-hidden="true"
                            />

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
                                >
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
                                    }
                                >
                                    Conocer más
                                </Button>
                            </div>

                            {/* ---------- BENEFITS ---------- */}

                            <div className={homeHeroBenefitsStyles}>
                                {homeHeroBenefits.map((benefit) => (
                                    <div
                                        key={benefit}
                                        className={homeHeroBenefitStyles}
                                    >
                                        <Icon
                                            icon="mingcute:question-fill"
                                            className={
                                                homeHeroBenefitIconStyles
                                            }
                                            aria-hidden="true"
                                        />

                                        <span>{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ---------- HERO IMAGE ---------- */}

                    <div className={homeHeroImageContainerStyles}>
                        <img
                            src={heroImage}
                            alt="Vista de los tableros de Planor"
                            className={homeHeroImageStyles}
                        />
                    </div>
                </section>

                {/* ================= FEATURES ================= */}

                <section
                    id="caracteristicas"
                    className={homeFeaturesStyles}
                >
                    <h2 className={homeFeaturesTitleStyles}>
                        Todo lo que necesitas para mantenerte organizado
                    </h2>

                    <div className={homeFeaturesCardsStyles}>
                        {homeFeatures.map((feature) => (
                            <HomeCard
                                key={feature.title}
                                accent={feature.accent}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))}
                    </div>
                </section>

                {/* ================= CTA ================= */}

                <section
                    id="cta"
                    className={homeCtaStyles}
                >
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
                        >
                            Comienza gratis
                        </Button>
                    </div>
                </section>
            </main>

            {/* ================= FOOTER ================= */}

            <Footer />
        </div>
    );
}