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
  const formattedValue = formatNumber(value, decimalDigits);

  return (
    <Container>
      <Line isChanged={value !== defaultValue} />

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
        "w-[150px]",

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

function Line({ isChanged }: { isChanged: boolean }) {
  return (
    <div
      className={cx(
        "w-[2px]",

        isChanged ? "bg-[#00a080]" : "bg-[#00000040]",
      )}
    />
  );
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
  return <div className={cx("text-[12px]", "text-[#00000080]")}>{children}</div>;
}

function Value({ isChanged, formattedValue }: { isChanged: boolean; formattedValue: string }) {
  const ref = useRef<HTMLInputElement>(null);

  const [width, setWidth] = useState(0);

  return (
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

          isChanged ? "text-[#000000]" : "text-[#00000040]",
        )}
        style={{ fontSize: `${Math.min(1.7 * (width / (formattedValue.length || 1)), 30)}px` }}
      >
        {formattedValue}
      </div>
    </Resizable>
  );
}
