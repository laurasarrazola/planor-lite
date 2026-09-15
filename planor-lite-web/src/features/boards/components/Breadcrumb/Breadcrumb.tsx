import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import {
    breadcrumbStyles,
    breadcrumbLinkStyles,
    breadcrumbCurrentStyles,
    breadcrumbIconStyles,
} from "./Breadcrumb.styles";

import type { BreadcrumbProps } from "./Breadcrumb.types";

export function Breadcrumb({ boardName }: BreadcrumbProps) {
    return (
        <nav
            className={breadcrumbStyles}
            aria-label="Miga de pan"
        >
            <Link
                to="/boards"
                className={breadcrumbLinkStyles}
            >
                Mis tableros
            </Link>

            <Icon
                icon="lucide:chevron-right"
                className={breadcrumbIconStyles}
                aria-hidden="true"
            />

            <span className={breadcrumbCurrentStyles}>
                {boardName}
            </span>
        </nav>
    );
}