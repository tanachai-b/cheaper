import cx from "classnames";
import { ChangeEventHandler, ReactNode, useRef, useState } from "react";
import { Icon } from "./common-components";

export function Header({ children }: { children?: ReactNode }) {
  return <div className={cx("font-bold", "text-[12px]", "pb-[10px]")}>{children}</div>;
}

export function Item({
  isCheapest,
  onChange,
}: {
  isCheapest: boolean;
  onChange: (itemPrice: number) => void;
}) {
  const [itemCount, setItemCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);

  return (
    <div className={cx("flex", "flex-col", "gap-[10px]")}>
      <div className={cx("flex", "flex-row", "items-center", "gap-[10px]")}>
        <Field
          label="Total Price"
          value={totalPrice}
          unit="THB"
          onChange={(e) => {
            const totalPrice = e.target.valueAsNumber;
            const itemPrice = totalPrice / itemCount;

            setTotalPrice(totalPrice);
            setItemPrice(itemPrice);

            onChange(itemPrice);
          }}
        />

        <div className={cx("text-[30px]")}>÷</div>

        <Field
          label="Item Count"
          value={itemCount}
          unit="item/s"
          onChange={(e) => {
            const itemCount = e.target.valueAsNumber;
            const itemPrice = totalPrice / itemCount;

            setItemCount(itemCount);
            setItemPrice(itemPrice);

            onChange(itemPrice);
          }}
        />
      </div>

      <div className={cx("flex", "flex-row", "items-center", "gap-[10px]", "justify-end")}>
        <div className={cx("text-[30px]")}>=</div>

        <Result label="Price per Item" value={itemPrice.toFixed(2)} unit="THB" />

        <div>
          <div
            className={cx(
              "grid",
              "text-[25px]",
              isCheapest ? "text-[#00A080]" : "text-[#00000008]",
            )}
          >
            <Icon icon="check_circle" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
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

        "bg-[#00000008]",
        "rounded-[10px]",

        "p-[10px]",
        "gap-[10px]",

        "leading-none",

        isFocus && ["outline", "outline-[1px]", "outline-[#00000040]"],
      )}
      onClick={() => !isFocus && ref.current?.select()}
      onFocus={() => setTimeout(() => setIsFocus(true), 0)}
      onBlur={() => setIsFocus(false)}
    >
      <div className={cx("text-[12px]", "text-[#00000080]")}>{label}</div>

      <div className={cx("flex", "flex-row", "items-center", "gap-[5px]")}>
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

function Result({
  label,
  value,
  unit,
}: {
  label: ReactNode;
  value?: string | number;
  unit: ReactNode;
}) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div
      className={cx(
        "flex",
        "flex-col",

        "p-[10px]",
        "gap-[10px]",

        "leading-none",
      )}
    >
      <div className={cx("text-[12px]", "text-[#00000080]")}>{label}</div>

      <div className={cx("flex", "flex-row", "items-center", "gap-[5px]")}>
        <div ref={ref} className={cx("text-[30px]", "text-right")}>
          {value}
        </div>

        <div className={cx("text-[12px]", "text-[#00000080]")}>{unit}</div>
      </div>
    </div>
  );
}
