import cx from "classnames";
import { ReactNode, useRef } from "react";
import { formatNumber } from "src/common-functions";

export function NumberText({
  label,
  unit,
  decimalDigits,
  defaultValue,
  value,
}: {
  label: ReactNode;
  unit: ReactNode;
  decimalDigits: number;
  defaultValue: number;
  value: number;
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
      <div
        className={cx(
          "w-[2px]",

          value === defaultValue ? "bg-[#00000040]" : "bg-[#00a080]",
        )}
      />

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
          <div
            ref={ref}
            className={cx(
              "text-[30px]",
              "text-right",

              value === defaultValue ? "text-[#00000040]" : "text-[#000000]",
            )}
          >
            {formatNumber(value, decimalDigits)}
          </div>

          <div className={cx("text-[12px]", "text-[#00000080]")}>{unit}</div>
        </div>
      </div>
    </div>
  );
}
