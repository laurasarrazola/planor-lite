/****************************************/
/*    TIPOS DEL COMPONENTE TEXTAREA     */
/****************************************/
/* Este archivo centraliza los tipos utilizados por el componente TextArea. Su objetivo es definir los valores permitidos para cada propiedad del sistema de diseño. */

/* =========== Estado visual =========== */
export type TextAreaState=
  |"Default"
  |"Focus"
  |"Disabled";