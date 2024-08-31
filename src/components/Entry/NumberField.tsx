import cx from "classnames";
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  ReactNode,
  RefObject,
  useRef,
  useState,
} from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocus, setIsFocus] = useState(false);

  const [value, setValue] = useState(`${formatNumber(initialValue, decimalDigits)}`);
  const [numValue, setNumValue] = useState(initialValue);

  function onClick() {
    inputRef.current?.focus();
  }

  function onFocus() {
    setIsFocus(true);
    setValue(`${numValue}`);
    setTimeout(() => inputRef.current?.select(), 0);
  }

  function onBlur() {
    setIsFocus(false);
    setValue(formatNumber(numValue, decimalDigits));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setValue(value);

    if (value.length === 0) {
      setNumValue(defaultValue);
      onChange(defaultValue);
      return;
    }

    const numValue = parseFloat(value);

    if (!isNaN(numValue)) {
      setNumValue(numValue);
      onChange(numValue);
    }
  }

  return (
    <Container isFocus={isFocus} onClick={onClick} onFocus={onFocus} onBlur={onBlur}>
      <Label>{label}</Label>

      <Data>
        <Input
          inputRef={inputRef}
          value={value}
          isChanged={initialValue !== defaultValue}
          handleChange={handleChange}
        />

        <Label>{unit}</Label>
      </Data>
    </Container>
  );
}

function Container({
  isFocus,
  children,
  onClick,
  onFocus,
  onBlur,
}: {
  isFocus: boolean;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
  onFocus: FocusEventHandler<HTMLDivElement>;
  onBlur: FocusEventHandler<HTMLDivElement>;
}) {
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
      {children}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <div className={cx("text-[12px]", "text-[#00000080]")}>{children}</div>;
}

function Data({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "flex",
        "flex-row",
        "items-center",

        "gap-[5px]",
      )}
    >
      {children}
    </div>
  );
}

function Input({
  inputRef,
  value,
  isChanged,
  handleChange,
}: {
  inputRef: RefObject<HTMLInputElement>;
  value: string;
  isChanged: boolean;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const [width, setWidth] = useState(0);

  return (
    <Resizable className={cx("flex-auto")} onResize={({ width }) => setWidth(width)}>
      <input
        ref={inputRef}
        className={cx(
          "w-full",
          "h-[30px]",

          "bg-transparent",
          "outline-none",

          "text-right",

          "placeholder:text-[#00000020]",

          isChanged ? "text-[#000000]" : "text-[#00000040]",
        )}
        style={{ fontSize: `${Math.min(1.7 * (width / (value.length || 1)), 30)}px` }}
        inputMode="decimal"
        value={value}
        onChange={handleChange}
      />
    </Resizable>
  );
}
