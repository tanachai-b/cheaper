import cx from "classnames";
import { ReactNode, useRef } from "react";
import { Icon } from "src/common-components";
import { useDivSize, useWindowSize } from "src/common-hooks";
import { NumberField } from "./NumberField";
import { NumberText } from "./NumberText";

export function Entry({
  currency,
  decimalDigits,
  isEditing,
  isSelected,
  isVisible,
  totalPrice,
  itemCount,
  itemPrice,
  isCheapest,
  onChange,
  onSelect,
}: {
  currency: string;
  decimalDigits: number;
  isEditing: boolean;
  isSelected: boolean;
  isVisible: boolean;
  totalPrice: number;
  itemCount: number;
  itemPrice: number;
  isCheapest: boolean;
  onChange: (prices: { totalPrice: number; itemCount: number }) => void;
  onSelect: (isSelected: boolean) => void;
}) {
  const onChangeTotalPrice = (totalPrice: number) => {
    onChange({ totalPrice, itemCount });
  };

  const onChangeItemCount = (itemCount: number) => {
    onChange({ totalPrice, itemCount });
  };

  const { width } = useWindowSize();

  return (
    <Container isVisible={isVisible}>
      <Checkbox isEditing={isEditing} isSelected={isSelected} onSelect={onSelect} />

      <Content isVertical={width < 600} isEditing={isEditing}>
        <Row className={cx("basis-[67%]")}>
          <NumberField
            label="Total Price"
            unit={currency}
            decimalDigits={decimalDigits}
            defaultValue={0}
            initialValue={totalPrice}
            onChange={onChangeTotalPrice}
          />

          <PlainText>÷</PlainText>

          <NumberField
            label="Item Count"
            unit="item/s"
            decimalDigits={0}
            defaultValue={1}
            initialValue={itemCount}
            onChange={onChangeItemCount}
          />
        </Row>

        <Row className={cx("basis-[calc(33%_+_50px)]")}>
          <PlainText>=</PlainText>

          <NumberText
            label="Price per Item"
            unit={currency}
            decimalDigits={decimalDigits}
            defaultValue={0}
            value={itemPrice}
          />

          <CheckIcon isCheapest={isCheapest} />
        </Row>
      </Content>
    </Container>
  );
}

function Container({ isVisible, children }: { isVisible: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { height } = useDivSize(ref);

  return (
    <div
      className={cx(
        "grid",
        "items-start",
        "justify-items-center",

        isVisible ? "visible" : "invisible",

        "transition-all",
        "overflow-clip",
      )}
      style={{ height: `${isVisible ? height : 0}px` }}
    >
      <div
        ref={ref}
        className={cx(
          "w-full",
          "max-w-[1000px]",

          "flex",
          "flex-row",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Checkbox({
  isEditing,
  isSelected,
  onSelect,
}: {
  isEditing: boolean;
  isSelected: boolean;
  onSelect: (isSelected: boolean) => void;
}) {
  return (
    <div
      className={cx(
        "flex-none",
        isEditing ? "w-[50px]" : "w-0",

        "grid",
        "place-items-center",

        "overflow-clip",

        "transition-all",
      )}
    >
      <button
        className={cx(
          "grid",
          "place-items-center",

          "rounded-full",

          "bg-[#ffffff00]",
          "transition-all",
          "duration-[500ms]",

          "p-[10px]",

          "text-[30px]",
          isSelected ? "text-[#ffffff]" : "text-[#ffffff80]",

          "active:bg-[#ffffff40]",
          "active:duration-0",
        )}
        disabled={!isEditing}
        onClick={() => onSelect(!isSelected)}
      >
        {isSelected && <Icon icon="check_circle" />}

        {!isSelected && <Icon icon="circle" fill={false} />}
      </button>
    </div>
  );
}

function Content({
  isVertical,
  isEditing,
  children,
}: {
  isVertical: boolean;
  isEditing: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cx(
        "flex-auto",

        "flex",
        isVertical ? ["flex-col"] : ["flex-row", "justify-center"],

        "p-[20px]",
        "gap-[10px]",

        isEditing && ["opacity-[30%]", "pointer-events-none"],
        "transition-all",
      )}
    >
      {children}
    </div>
  );
}

function Row({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cx(
        "flex-auto",

        "flex",
        "flex-row",
        "items-center",

        "gap-[10px]",

        className,
      )}
    >
      {children}
    </div>
  );
}

function PlainText({ children }: { children: ReactNode }) {
  return <div className={cx("flex-none", "text-[20px]", "text-[#ffffff80]")}>{children}</div>;
}

function CheckIcon({ isCheapest }: { isCheapest: boolean }) {
  return (
    <div
      className={cx(
        "flex-none",

        "grid",
        "text-[25px]",

        isCheapest ? "text-[#ffffff]" : "text-[#ffffff20]",
      )}
    >
      <Icon icon="check_circle" />
    </div>
  );
}
