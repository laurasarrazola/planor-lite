/****************************************/
/*     TIPOS DEL COMPONENTE BUTTON      */
/****************************************/
/* Este archivo centraliza los tipos utilizados por el componente Button. Su objetivo es definir los valores permitidos para cada propiedad del sistema de diseño, garantizando consistencia y seguridad de tipos en toda la aplicación. */

/* =========== Color =========== */
export type ButtonVariant=
  |"Primary"
  |"Secondary"
  |"CTA";

/* =========== Estilo =========== */
export type ButtonStyle=
  |"Filled"
  |"Outlined";

/* =========== Tamaño =========== */
export type ButtonSize=
  |"XS"
  |"S"
  |"M"
  |"L";

/* ======== Estado visual ======== */
export type ButtonState =
  | "Default"
  | "Active"
  | "Disabled";