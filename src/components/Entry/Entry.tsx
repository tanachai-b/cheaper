import cx from "classnames";
import { ReactNode, useEffect, useState } from "react";
import { Icon } from "src/common-components";
import { NumberField } from "./NumberField";
import { NumberText } from "./NumberText";

export function Entry({
  isCheapest,
  onChangeItemPrice,
}: {
  isCheapest: boolean;
  onChangeItemPrice: (itemPrice: number) => void;
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCount, setItemCount] = useState(1);
  const [itemPrice, setItemPrice] = useState(0);

  const onChangeTotalPrice = (totalPrice: number) => {
    const itemPrice = totalPrice / itemCount;

    setTotalPrice(totalPrice);
    setItemPrice(itemPrice);
    onChangeItemPrice(itemPrice);
  };

  const onChangeItemCount = (itemCount: number) => {
    const itemPrice = totalPrice / itemCount;

    setItemCount(itemCount);
    setItemPrice(itemPrice);
    onChangeItemPrice(itemPrice);
  };

  const [width, setWidth] = useState(0);

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });

  function onResize() {
    setWidth(window.innerWidth);
  }

  return (
    <Container isVertical={width < 600}>
      <Row>
        <NumberField
          label="Total Price"
          unit="THB"
          decimalDigits={2}
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

      <Row className={cx("justify-end")}>
        <PlainText>=</PlainText>

        <NumberText
          label="Price per Item"
          unit="THB"
          decimalDigits={2}
          defaultValue={0}
          value={itemPrice}
        />

        <CheckIcon isCheapest={isCheapest} />
      </Row>
    </Container>
  );
}

function Container({ isVertical, children }: { isVertical: boolean; children: ReactNode }) {
  return (
    <div
      className={cx(
        "flex",
        isVertical ? ["flex-col"] : ["flex-row", "justify-center"],

        "gap-[10px]",
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
  return <div className={cx("text-[20px]", "text-[#00000040]")}>{children}</div>;
}

function CheckIcon({ isCheapest }: { isCheapest: boolean }) {
  return (
    <div
      className={cx(
        "grid",
        "text-[25px]",

        isCheapest ? "text-[#00a080]" : "text-[#00000008]",
      )}
    >
      <Icon icon="check_circle" />
    </div>
  );
}
