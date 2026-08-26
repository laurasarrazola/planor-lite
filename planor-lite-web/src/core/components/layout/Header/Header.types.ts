/****************************************/
/*            TIPOS DEL HEADER          */
/****************************************/

export type HeaderMode =
  | "Authenticated"
  | "Guest";

export interface NavigationItem {
  label: string;
  href?: string;
}