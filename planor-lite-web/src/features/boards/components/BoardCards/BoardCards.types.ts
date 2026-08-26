export type BoardCardAccent =
    | "Amatista"
    | "ZafiroLavanda";

export interface BoardCardProps {
    accent?: BoardCardAccent;
    title: string;
    description: string;
    onMenuClick?: () => void;
    onOpenClick?: () => void;
}