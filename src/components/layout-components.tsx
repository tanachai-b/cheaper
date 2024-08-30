import cx from "classnames";
import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "size-full",

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

export function Header() {
  return (
    <div
      className={cx(
        "py-[100px]",
        "bg-[#00a080]",

        "grid",
        "place-items-center",

        "text-[50px]",
        "text-[#ffffff]",
      )}
    >
      Cheapest!
    </div>
  );
}

export function Body({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "flex",
        "flex-col",

        "p-[20px]",
        "gap-[30px]",
      )}
    >
      {children}
    </div>
  );
}
