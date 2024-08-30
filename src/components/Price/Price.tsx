import cx from "classnames";
import { ReactNode, useState } from "react";
import { Icon } from "src/common-components";
import { NumberField } from "./NumberField";
import { NumberText } from "./NumberText";

export function Price({
  isCheapest,
  onChange,
}: {
  isCheapest: boolean;
  onChange: (itemPrice: number) => void;
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCount, setItemCount] = useState(1);
  const [itemPrice, setItemPrice] = useState(0);

  const onChangeTotalPrice = (totalPrice: number) => {
    const itemPrice = totalPrice / itemCount;

    setTotalPrice(totalPrice);
    setItemPrice(itemPrice);
    onChange(itemPrice);
  };

  const onChangeItemCount = (itemCount: number) => {
    const itemPrice = totalPrice / itemCount;

    setItemCount(itemCount);
    setItemPrice(itemPrice);
    onChange(itemPrice);
  };

  return (
    <div className={cx("flex", "flex-col", "gap-[10px]")}>
      <div
        className={cx(
          "flex",
          "flex-row",
          "items-center",

          "gap-[10px]",
        )}
      >
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
      </div>

      <div
        className={cx(
          "flex",
          "flex-row",
          "items-center",

          "gap-[10px]",
          "justify-end",
        )}
      >
        <PlainText>=</PlainText>

        <NumberText
          label="Price per Item"
          unit="THB"
          decimalDigits={2}
          defaultValue={0}
          value={itemPrice}
          //
        />

        <CheckIcon isCheapest={isCheapest} />
      </div>
    </div>
  );
}

function PlainText({ children }: { children: ReactNode }) {
  return <div className={cx("text-[30px]", "text-[#00000080]", "font-light")}>{children}</div>;
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
