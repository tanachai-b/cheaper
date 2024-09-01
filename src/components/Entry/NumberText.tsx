import cx from "classnames";
import { ReactNode, useRef } from "react";
import { formatNumber } from "src/common-functions";
import { useDivSize } from "src/common-hooks";

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
  const formattedValue = formatNumber(value, decimalDigits);

  return (
    <Container>
      <Line />

      <Content>
        <Label>{label}</Label>

        <Data>
          <Value isChanged={value !== defaultValue} formattedValue={formattedValue} />

          <Label>{unit}</Label>
        </Data>
      </Content>
    </Container>
  );
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "flex-auto",

        "flex",
        "flex-row",

        "p-[10px]",
        "gap-[10px]",

        "leading-none",
      )}
    >
      {children}
    </div>
  );
}

function Line() {
  return <div className={cx("flex-none", "w-[2px]", "bg-[#ffffff20]")} />;
}

function Content({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "flex-auto",

        "flex",
        "flex-col",

        "gap-[10px]",
      )}
    >
      {children}
    </div>
  );
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

function Label({ children }: { children: ReactNode }) {
  return <div className={cx("flex-none", "text-[12px]", "text-[#ffffff80]")}>{children}</div>;
}

function Value({ isChanged, formattedValue }: { isChanged: boolean; formattedValue: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const { width } = useDivSize(ref);

  const hiddenRef = useRef<HTMLDivElement>(null);
  const { width: hiddenWidth } = useDivSize(hiddenRef);

  return (
    <div className={cx("flex-auto", "grid")}>
      <div
        ref={ref}
        className={cx(
          "h-[30px]",

          "grid",
          "items-center",
          "justify-end",

          "overflow-hidden",

          isChanged ? "text-[#ffffff]" : "text-[#ffffff40]",
          "transition-all",
        )}
        style={{ fontSize: `${Math.min(30 * (width / hiddenWidth), 30)}px` }}
      >
        {formattedValue}
      </div>

      <div className={cx("w-0", "overflow-clip", "relative")}>
        <div ref={hiddenRef} className={cx("absolute", "text-[30px]", "whitespace-pre")}>
          {formattedValue}
        </div>
      </div>
    </div>
  );
}
