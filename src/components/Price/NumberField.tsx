import cx from "classnames";
import { ChangeEvent, ReactNode, useRef, useState } from "react";
import { Resizable } from "src/common-components";
import { formatNumber } from "src/common-functions";

export function NumberField({
  label,
  unit,
  decimalDigits,
  defaultValue,
  initialValue,
  onChange,
}: {
  label: ReactNode;
  unit: ReactNode;
  decimalDigits: number;
  defaultValue: number;
  initialValue: number;
  onChange: (value: number) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const [isFocus, setIsFocus] = useState(false);

  const [hint, setHint] = useState(`${formatNumber(initialValue, decimalDigits)}`);
  const [value, setValue] = useState(`${formatNumber(initialValue, decimalDigits)}`);
  const [numValue, setNumValue] = useState(initialValue);

  function onClick() {
    if (!isFocus) ref.current?.select();
  }

  function onFocus() {
    setHint(`${numValue}`);
    setValue("");
    setTimeout(() => setIsFocus(true), 0);
  }

  function onBlur() {
    setIsFocus(false);

    setValue(
      numValue.toLocaleString("en-US", {
        minimumFractionDigits: decimalDigits,
        maximumFractionDigits: decimalDigits,
      }),
    );
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setValue(value);

    if (value.length === 0) {
      setNumValue(0);
      onChange(0);
      return;
    }

    const numValue = parseFloat(value);

    if (!isNaN(numValue)) {
      setNumValue(numValue);
      onChange(numValue);
    }
  }

  const [width, setWidth] = useState(0);

  return (
    <div
      className={cx(
        "w-[150px]",

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
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
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
        <Resizable className={cx("flex-auto")} onResize={({ width }) => setWidth(width)}>
          <input
            ref={ref}
            className={cx(
              "w-full",
              "h-[30px]",

              "bg-transparent",
              "outline-none",

              "text-right",

              "placeholder:text-[#00000020]",

              initialValue === defaultValue ? "text-[#00000040]" : "text-[#000000]",
            )}
            style={{
              fontSize: `${Math.min(1.7 * (width / (value.length || hint.length || 1)), 30)}px`,
            }}
            placeholder={hint}
            inputMode="decimal"
            value={value}
            onChange={handleChange}
          />
        </Resizable>

        <div className={cx("text-[12px]", "text-[#00000080]")}>{unit}</div>
      </div>
    </div>
  );
}
