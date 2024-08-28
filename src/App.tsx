import cx from "classnames";
import { ReactNode, useState } from "react";

export default function App() {
  return (
    <Container>
      <div className={cx("text-[50px]")}>Cheapest!</div>

      <div
        className={cx(
          "grid",
          "grid-cols-5",
          "gap-[50px]",

          "place-items-center",
        )}
      >
        <Header>Item</Header>

        <Header>Count</Header>

        <Header>Total Price</Header>

        <Header>Price / Item</Header>

        <Header>Actions</Header>

        <Item />
      </div>
    </Container>
  );
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "size-full",

        "flex",
        "flex-col",

        "items-center",
        "justify-center",

        "p-[20px]",
        "gap-[100px]",

        "text-[20px]",
      )}
    >
      {children}
    </div>
  );
}

function Header({ children }: { children: ReactNode }) {
  return <div className={cx("font-bold")}>{children}</div>;
}

function Item() {
  const [itemCount, setItemCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);

  return (
    <>
      <div># 1</div>

      <div className={cx("flex", "flex-row")}>
        <div>×</div>

        <input
          className={cx("w-[100px]", "text-center")}
          type="number"
          value={itemCount}
          onChange={(e) => {
            const itemCount = e.target.valueAsNumber;
            setItemCount(itemCount);
            setItemPrice(totalPrice / itemCount);
          }}
        />
      </div>

      <div className={cx("flex", "flex-row")}>
        <input
          className={cx("w-[100px]", "text-center")}
          type="number"
          value={totalPrice}
          onChange={(e) => {
            const totalPrice = e.target.valueAsNumber;
            setTotalPrice(totalPrice);
            setItemPrice(totalPrice / itemCount);
          }}
        />

        <div>THB</div>
      </div>

      <div className={cx("flex", "flex-row")}>
        <input
          className={cx("w-[100px]", "text-center")}
          type="number"
          value={itemPrice}
          onChange={(e) => {
            const itemPrice = e.target.valueAsNumber;
            setItemPrice(itemPrice);
            setTotalPrice(itemPrice * itemCount);
          }}
        />

        <div>THB</div>
      </div>

      <button>Remove</button>
    </>
  );
}
