import type { BadgePriorityType } from "../BadgePriority/BadgePriority.types";

export interface TaskCardProps {
    id: number;
    title: string;
    description: string;
    priority: BadgePriorityType | null;
    dueDate?: string;
    onOpenClick?: () => void;
    onEditClick?: () => void;
    onDeleteClick?: () => void;
    esVistaPrevia?: boolean;
}
