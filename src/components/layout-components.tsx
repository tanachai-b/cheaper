import cx from "classnames";
import { ReactNode, useEffect, useState } from "react";

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

export function Header() {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onScroll() {
    setScale(1 - Math.min(window.scrollY / (300 - 50), 1));
  }

  return (
    <div
      className={cx(
        "flex-none",
        "h-[300px]",

        "sticky",
        "top-0",

        "invisible",
      )}
    >
      <div
        className={cx(
          "visible",

          "bg-[#00a080]",

          "grid",
          "place-content-center",

          "text-[#ffffff]",
          "tracking-[0.25ch]",
          "font-bold",

          "overflow-clip",
        )}
        style={{
          height: `${50 + (300 - 50) * scale}px`,
          fontSize: `${20 + (40 - 20) * scale}px`,
        }}
      >
        CHEAPEST!
      </div>
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
