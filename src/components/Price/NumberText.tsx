import cx from "classnames";
import { ReactNode, useRef, useState } from "react";
import { Resizable } from "src/common-components";
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

  const formattedValue = formatNumber(value, decimalDigits);

  const [width, setWidth] = useState(0);

  return (
    <div
      className={cx(
        "w-[150px]",

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

      <div
        className={cx(
          "flex-auto",

          "flex",
          "flex-col",

          "gap-[10px]",
        )}
      >
        <div className={cx("text-[12px]", "text-[#00000080]")}>{label}</div>

        <div
          className={cx(
            "flex",
            "flex-row",
            "items-center",

            "gap-[5px]",
          )}
        >
          <Resizable
            className={cx("flex-auto", "h-[30px]", "grid")}
            onResize={({ width }) => setWidth(width)}
          >
            <div
              ref={ref}
              className={cx(
                "grid",
                "items-center",
                "justify-end",

                "overflow-hidden",

                value === defaultValue ? "text-[#00000040]" : "text-[#000000]",
              )}
              style={{
                fontSize: `${Math.min(1.7 * (width / (formattedValue.length || 1)), 30)}px`,
              }}
            >
              {formattedValue}
            </div>
          </Resizable>

          <div className={cx("text-[12px]", "text-[#00000080]")}>{unit}</div>
        </div>
      </div>
    </div>
  );
}
