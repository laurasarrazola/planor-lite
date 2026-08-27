import { Button } from "@/core/components/ui/Button/Button";
import { Input } from "@/core/components/ui/Input/Input";
import { TextArea } from "@/core/components/ui/TextArea/TextArea";
import { BadgePriority } from "@/features/tasks/components/BadgePriority/BadgePriority";
import { Modal } from "@/core/components/ui/Modals/Modal";
import { Header } from "@/core/components/layout/Header/Header";
import { Footer } from "@/core/components/layout/Footer/Footer";
import { HomeCard } from "@/features/home/components/HomeCards/HomeCards";
import { BoardCard } from "@/features/boards/components/BoardCards/BoardCards";
import { TaskCard } from "@/features/tasks/components/TaskCards/TaskCards";
import { KanbanColumn } from "../boards/components/KanbanColumns/KanbanColumns";


export const Pruebas: React.FC = () => {

    return (
        <div className="p-10 flex flex-col gap-12">

            {/* ====================================== */}
            {/*              BOTONES                   */}
            {/* ====================================== */}

            <section className="flex flex-col gap-6">

                <h1 className="text-2xl font-bold text-white">
                    Botones
                </h1>

                {/* Primary */}

                <Button>
                    Primary Default
                </Button>

                <Button
                    variant="Primary"
                    size="XS"
                    buttonStyle="Filled"
                >
                    Primary Active
                </Button>

                <Button
                    variant="Primary"
                    size="S"
                    state="Disabled"
                    buttonStyle="Filled"
                >
                    Primary Disabled
                </Button>

                <Button
                    variant="Primary"
                    size="M"
                    buttonStyle="Outlined"
                >
                    Primary Outlined Default
                </Button>

                <Button
                    variant="Primary"
                    size="L"
                    buttonStyle="Outlined"
                >
                    Primary Outlined Active
                </Button>

                <Button
                    variant="Primary"
                    buttonStyle="Outlined"
                    state="Disabled"
                >
                    Primary Outlined Disabled
                </Button>

                {/* CTA */}

                <Button variant="CTA">
                    CTA Default
                </Button>

                <Button
                    variant="CTA"
                >
                    CTA Active
                </Button>

                <Button
                    variant="CTA"
                    state="Disabled"
                >
                    CTA Disabled
                </Button>

                <Button
                    variant="CTA"
                    buttonStyle="Outlined"
                >
                    CTA Outlined Default
                </Button>

                <Button
                    variant="CTA"
                    buttonStyle="Outlined"
                >
                    CTA Outlined Active
                </Button>

                <Button
                    variant="CTA"
                    buttonStyle="Outlined"
                    state="Disabled"
                >
                    CTA Outlined Disabled
                </Button>

                {/* Con iconos */}
                <Button leftIcon="mingcute:user-4-fill">
                    Guardar
                </Button>

                <Button rightIcon="mingcute:arrow-right-fill">
                    Siguiente
                </Button>

                <Button
                    leftIcon="mingcute:user-4-fill"
                    rightIcon="mingcute:user-4-fill">
                    Ambos iconos
                </Button>
            </section>

            {/* ====================================== */}
            {/*               INPUTS                   */}
            {/* ====================================== */}

            <section className="flex flex-col gap-6 max-w-lg">

                <h1 className="text-2xl font-bold text-white">
                    Inputs
                </h1>

                {/* =========== DEFAULT =========== */}

                <Input
                    label="Correo electrónico"
                    helperText="Ingresa tu correo institucional."
                    placeholder="correo@ejemplo.com"
                />

                {/* =========== FOCUS =========== */}

                <Input
                    label="Nombre"
                    helperText="Haz clic sobre el campo para activar Focus."
                    placeholder="Escribe tu nombre"
                />

                {/* =========== DISABLED =========== */}

                <Input
                    label="Usuario"
                    helperText="Este campo está deshabilitado."
                    placeholder="Usuario"
                    state="Disabled"
                />

            </section>


            {/* ====================================== */}
            {/*               TEXTAREAS                */}
            {/* ====================================== */}

            <section className="flex flex-col gap-6 max-w-lg">

                <h1 className="text-2xl font-bold text-white">
                    TextAreas
                </h1>

                {/* =========== DEFAULT =========== */}

                <TextArea
                    label="Descripción"
                    helperText="Ingresa una descripción."
                    placeholder="Escribe aquí..."
                />

                {/* =========== FOCUS =========== */}

                <TextArea
                    label="Comentario"
                    helperText="Estado Focus"
                    placeholder="Haz clic aquí..."
                />

                {/* =========== DISABLED =========== */}

                <TextArea
                    label="Observaciones"
                    helperText="Este campo está deshabilitado."
                    placeholder="No disponible"
                    state="Disabled"
                />

            </section>

            {/* ====================================== */}
            {/*               BADGES                   */}
            {/* ====================================== */}
            <section className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-white">
                    BadgePriority
                </h1>

                <div className="flex gap-4 items-center">
                    <BadgePriority priority="Alta" />
                    <BadgePriority priority="Media" />
                    <BadgePriority priority="Baja" />
                </div>
            </section>

            {/* ====================================== */}
            {/*               MODALS                  */}
            {/* ====================================== */}

            <section className="flex flex-col gap-6">
                <h1 className="text-2xl font-bold text-white">
                    Modals
                </h1>

                <Modal
                    size="Small"
                    title="Eliminar tarea"
                    description="¿Estás seguro de eliminar esta tarea?"
                    onClose={() => console.log("Cerrar")}
                    actions={
                        <>
                            <Button
                                variant="Primary"
                                buttonStyle="Outlined"
                            >
                                Cancelar
                            </Button>

                            <Button>
                                Eliminar
                            </Button>
                        </>
                    }
                >
                    <p className="text-sm font-light text-(--color-vainilla)">
                        Esta acción no se puede deshacer.
                    </p>
                </Modal>
            </section>

            {/* ====================================== */}
            {/*               HEADER                   */}
            {/* ====================================== */}
            <Header mode="Guest" />
            <Header mode="Authenticated" />

            {/* ====================================== */}
            {/*               FOOTER                   */}
            {/* ====================================== */}
            <Footer />

            {/* ====================================== */}
            {/*               HOME CARDS               */}
            {/* ====================================== */}
            <div className="flex gap-6">
                <HomeCard
                    accent="Amatista"
                    icon="lucide:layout-dashboard"
                    title="Organiza"
                    description="Gestiona tus tareas de forma sencilla."
                />

                <HomeCard
                    accent="ZafiroLavanda"
                    icon="lucide:check-circle"
                    title="Completa"
                    description="Visualiza tu progreso y alcanza tus objetivos."
                />
            </div>

            {/* ====================================== */}
            {/*              BOARD CARDS               */}
            {/* ====================================== */}
            <div className="flex gap-6">
                <BoardCard
                    accent="Amatista"
                    title="Mi Tablero"
                    description="Este es mi tablero de tareas." />

                <BoardCard
                    accent="ZafiroLavanda"
                    title="Tablero de Proyecto"
                    description="Tablero para gestionar el proyecto." />
            </div>

            {/* ====================================== */}
            {/*             TASK CARD                  */}
            {/* ====================================== */}
            <TaskCard
                title="Tarea de ejemplo"
                description="Esta es una tarea de ejemplo con un tetxo larguisimo a ver como se comporta la jodida tarjeta."
                priority="Alta"
                dueDate="2026-10-15"
            />

            {/* ====================================== */}
            {/*             KANBAN COLUMNS             */}
            {/* ====================================== */}
            <div className="flex gap-6">
                <KanbanColumn state="Pendiente" />
                <KanbanColumn state="En ejecución" />
                <KanbanColumn state="Terminado" />
                <KanbanColumn state="Aprobado" />
            </div>

        </div>
    );
}