import cx from "classnames";
import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "min-w-full",
        "min-h-full",

        "flex",
        "flex-col",

        "text-[15px]",
        "font-medium",
      )}
    >
      {children}
    </div>
  );
}

export function Body({ children }: { children: ReactNode }) {
  return <div className={cx("flex", "flex-col")}>{children}</div>;
}
