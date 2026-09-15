import { Icon } from "@iconify/react";

import { Button } from "@/core/components/ui/Button/Button";

import {
    boardHeaderStyles,
    boardInfoStyles,
    boardTitleStyles,
    boardDescriptionStyles,
    boardHeaderButtonStyles,
} from "./BoardHeader.styles";

import type { BoardHeaderProps } from "./BoardHeader.types";

export function BoardHeader({
    title,
    description,
    onNewTask,
}: BoardHeaderProps) {
    return (
        <section className={boardHeaderStyles}>
            <div className={boardInfoStyles}>
                <h1 className={boardTitleStyles}>
                    {title}
                </h1>

                <p className={boardDescriptionStyles}>
                    {description}
                </p>
            </div>

            <Button
                variant="Primary"
                buttonStyle="Filled"
                size="S"
                onClick={onNewTask}
                className={boardHeaderButtonStyles}
            >
                <Icon icon="lucide:plus" />
                Nueva tarea
            </Button>
        </section>
    );
}