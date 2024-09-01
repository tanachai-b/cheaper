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
import { useDivSize } from "src/common-hooks";

export function TextField({
  label,
  defaultValue,
  initialValue,
  onChange,
}: {
  label: ReactNode;
  defaultValue: string;
  initialValue: string;
  onChange: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocus, setIsFocus] = useState(false);

  const [value, setValue] = useState(initialValue);
  const [output, setOutput] = useState(initialValue);

  function onClick() {
    inputRef.current?.focus();
  }

  function onFocus() {
    setIsFocus(true);
    setTimeout(() => inputRef.current?.select(), 0);
  }

  function onBlur() {
    setIsFocus(false);
    setValue(output);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setValue(value);

    if (value.length > 0) {
      setOutput(value.trim().substring(0, 3).toUpperCase());
      onChange(value.trim().substring(0, 3).toUpperCase());
    } else {
      setOutput(defaultValue);
      onChange(defaultValue);
    }
  }

  return (
    <Container isFocus={isFocus} onClick={onClick} onFocus={onFocus} onBlur={onBlur}>
      <Label>{label}</Label>

      <Data>
        <Input
          inputRef={inputRef}
          value={value}
          isChanged={output !== defaultValue}
          handleChange={handleChange}
        />
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
              "outline-[#ffffff40]",

              "bg-[#ffffff00]",
              //
            ]
          : ["bg-[#ffffff10]"],
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
  return <div className={cx("flex-none", "text-[12px]", "text-[#ffffff80]")}>{children}</div>;
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
  const { width } = useDivSize(inputRef);

  const hiddenRef = useRef<HTMLDivElement>(null);
  const { width: hiddenWidth } = useDivSize(hiddenRef);

  return (
    <div className={cx("flex-auto", "grid")}>
      <input
        ref={inputRef}
        className={cx(
          "w-full",
          "h-[30px]",

          "bg-transparent",
          "outline-none",

          // "text-right",

          isChanged ? "text-[#ffffff]" : "text-[#ffffff40]",
          "transition-all",
        )}
        style={{ fontSize: `${Math.min(30 * (width / hiddenWidth), 30)}px` }}
        value={value}
        onChange={handleChange}
        onKeyUp={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
        }}
      />

      <div className={cx("w-0", "overflow-clip", "relative")}>
        <div ref={hiddenRef} className={cx("absolute", "text-[30px]", "whitespace-pre")}>
          {value}
        </div>
      </div>
    </div>
  );
}
