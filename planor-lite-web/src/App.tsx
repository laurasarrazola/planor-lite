import { Button } from "@/core/components/ui/Button/Button";
import { Input } from "@/core/components/ui/input/Input";
import { Plus } from "lucide-react";

function App() {
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
          state="Hover"
          buttonStyle="Filled"
        >
          Primary Hover
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
          state="Hover"
        >
          Primary Outlined Hover
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
          state="Hover"
        >
          CTA Hover
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
          state="Hover"
        >
          CTA Outlined Hover
        </Button>

        <Button
          variant="CTA"
          buttonStyle="Outlined"
          state="Disabled"
        >
          CTA Outlined Disabled
        </Button>

        {/* Con iconos */}

        <Button leftIcon={<Plus />}>
          Guardar
        </Button>

        <Button rightIcon={<Plus />}>
          Siguiente
        </Button>

        <Button
          leftIcon={<Plus />}
          rightIcon={<Plus />}
        >
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

    </div>
  );
}

export default App;