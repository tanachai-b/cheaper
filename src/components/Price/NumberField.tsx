import cx from "classnames";
import { ChangeEventHandler, ReactNode, useRef, useState } from "react";

export function NumberField({
  label,
  value,
  unit,
  onChange,
}: {
  label: ReactNode;
  value?: string | number;
  unit: ReactNode;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const [isFocus, setIsFocus] = useState(false);

  return (
    <div
      className={cx(
        "flex",
        "flex-col",

        "rounded-[10px]",

        "p-[10px]",
        "gap-[10px]",

        "leading-none",

        isFocus
          ? [
              "outline",
              "outline-[1px]",
              "outline-[#00000020]",

              "bg-[#00000000]",
              //
            ]
          : ["bg-[#00000008]"],
      )}
      onClick={() => !isFocus && ref.current?.select()}
      onFocus={() => setTimeout(() => setIsFocus(true), 0)}
      onBlur={() => setIsFocus(false)}
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
        <input
          ref={ref}
          className={cx(
            "w-[80px]",
            "h-[30px]",

            "bg-transparent",
            "hide-spinner",
            "outline-none",

            "text-[30px]",
            "text-right",
          )}
          type="number"
          value={value}
          onChange={onChange}
        />

        <div className={cx("text-[12px]", "text-[#00000080]")}>{unit}</div>
      </div>
    </div>
  );
}
