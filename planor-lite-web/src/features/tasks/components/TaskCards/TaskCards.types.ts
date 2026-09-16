import type { BadgePriorityType } from "../BadgePriority/BadgePriority.types";

export interface TaskCardProps {
    id: number;
    title: string;
    description: string;
    priority: BadgePriorityType;
    dueDate?: string;
    onOpenClick?: () => void;
    onMenuClick?: () => void;
}