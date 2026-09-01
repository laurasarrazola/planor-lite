/****************************************/
/*            TIPOS DEL HEADER          */
/****************************************/

export type ModoHeader =
  | "Authenticated"
  | "Guest";

export interface ElementoNavegacion {
  label: string;
  href?: string;
}