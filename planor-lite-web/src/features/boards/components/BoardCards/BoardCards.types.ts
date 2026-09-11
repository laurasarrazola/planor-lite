export type BoardCardAccent =
    | "Amatista"
    | "ZafiroLavanda";

export interface BoardCardProps {
    accent?: BoardCardAccent;
    title: string;
    description: string;
    onEditClick?: () => void;
    onDeleteClick?: () => void;
    onOpenClick?: () => void;
}