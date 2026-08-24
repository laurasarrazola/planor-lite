/****************************************/
/*          TIPOS DEL HOME CARD         */
/****************************************/
export type HomeCardAccent =
    | "Amatista"
    | "ZafiroLavanda";

export interface HomeCardProps {
    accent?: HomeCardAccent; 
    icon: string; 
    title: string;
    description: string;
}