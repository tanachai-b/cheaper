import cx from "classnames";
import { ReactNode, useRef } from "react";

export function NumberText({
  label,
  value,
  unit,
}: {
  label: ReactNode;
  value?: string | number;
  unit: ReactNode;
}) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div
      className={cx(
        "flex",
        "flex-row",

        "p-[10px]",
        "gap-[10px]",

        "leading-none",
      )}
    >
      <div className={cx("bg-[#00a080]", "w-[2px]")} />

      <div className={cx("flex", "flex-col", "gap-[10px]")}>
        <div className={cx("text-[12px]", "text-[#00000080]")}>{label}</div>

        <div
          className={cx(
            "flex",
            "flex-row",
            "items-center",

            "gap-[5px]",
          )}
        >
          <div ref={ref} className={cx("text-[30px]", "text-right")}>
            {value}
          </div>

          <div className={cx("text-[12px]", "text-[#00000080]")}>{unit}</div>
        </div>
      </div>
    </div>
  );
}
