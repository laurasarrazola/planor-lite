/****************************************/
/*     TIPOS DEL COMPONENTE INPUT      */
/****************************************/
/* Este archivo centraliza los tipos utilizados por el componente Input. Su objetivo es definir los valores permitidos para cada propiedad del sistema de diseño. */

/* =========== Estado visual =========== */
export type InputState=
  |"Default"
  |"Focus"
  |"Disabled";