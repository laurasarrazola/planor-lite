/****************************************/
/*      COMPONENTE BADGE PRIORITY      */
/****************************************/
/* Este archivo define el componente reutilizable BadgePriority. */

import { Flag } from "lucide-react";

import {
  badgePriorityStyles,
  badgeLabelStyles,
} from "./BadgePriority.styles";

import type { BadgePriorityType } from "./BadgePriority.types";

/****************************************/
/*      INTERFAZ DEL COMPONENTE         */
/****************************************/
interface BadgePriorityProps {
  priority: BadgePriorityType;
}

/****************************************/
/*     IMPLEMENTACIÓN DEL COMPONENTE    */
/****************************************/
export function BadgePriority({
  priority,
}: BadgePriorityProps) {
  return (
    <div className={badgePriorityStyles({ priority })}>

      {/* =========== BADGE CONTENT =========== */}
      <div className="flex items-center justify-center gap-2.5 px-2.5 py-2.5 self-stretch">

        {/* =========== LEFT ICON =========== */}
        <Flag
          size={15}
          className={badgeLabelStyles({ priority })}
          strokeWidth={2}
        />

        {/* =========== LABEL =========== */}
        <span className={badgeLabelStyles({ priority })}>
          {priority}
        </span>
      </div>
    </div>
  );
}