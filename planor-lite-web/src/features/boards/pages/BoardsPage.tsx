import { Button } from "@/core/components/ui/Button/Button";
import { Footer } from "@/core/components/layout/Footer/Footer";
import { Header } from "@/core/components/layout/Header/Header";
import { Icon } from "@iconify/react";
import {
    boardsGridStyles,
    boardsPageDescriptionStyles,
    boardsPageHeaderStyles,
    boardsPageInfoStyles,
    boardsPageMainStyles,
    boardsPageStyles,
    boardsPageTitleStyles,
    boardsSectionStyles,
} from "./BoardsPage.styles";

export function BoardsPage() {
    return (
        <div className={boardsPageStyles}>
            <Header modo="Authenticated" />

            <main className={boardsPageMainStyles}>
                <section className={boardsPageHeaderStyles}>
                    <div className={boardsPageInfoStyles}>
                        <h1 className={boardsPageTitleStyles}>
                            Mis tableros
                        </h1>

                        <p className={boardsPageDescriptionStyles}>
                            Organiza tus proyectos y tareas en tus tableros Kanban personales.
                        </p>
                    </div>

                    <Button
                        variant="Primary"
                        buttonStyle="Filled"
                        size="S"
                    >
                        <Icon icon="lucide:plus" />
                        Crear nuevo tablero
                    </Button>
                </section>

                <section className={boardsSectionStyles}>
                    <div className={boardsGridStyles}>
                        {/* BoardCards */}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}