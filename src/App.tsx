import cx from "classnames";
import { ReactNode, useState } from "react";

export default function App() {
  const [itemPrices, setItemPrices] = useState([0, 0, 0, 0, 0]);

  const cheapestIndex = itemPrices.reduce<{ price: number; index: number } | undefined>(
    (cheapest, price, index) =>
      price === 0
        ? cheapest
        : cheapest == null
        ? { price, index }
        : price < cheapest.price
        ? { price, index }
        : cheapest,
    undefined,
  )?.index;

  function updatePrice(index: number, value: number) {
    setItemPrices(itemPrices.map((v, i) => (i === index ? value : v)));
  }

  return (
    <Container>
      <div className={cx("text-[50px]")}>Cheapest!</div>

      <div
        className={cx(
          "grid",
          "grid-cols-6",
          "gap-[50px]",

          "place-items-center",
        )}
      >
        <Header>Item</Header>

        <Header>Count</Header>

        <Header>Total Price</Header>

        <Header>Price / Item</Header>

        <Header>Cheapest!</Header>

        <Header>Actions</Header>

        <Item isCheapest={cheapestIndex === 0} onChange={(price) => updatePrice(0, price)} />

        <Item isCheapest={cheapestIndex === 1} onChange={(price) => updatePrice(1, price)} />

        <Item isCheapest={cheapestIndex === 2} onChange={(price) => updatePrice(2, price)} />

        <Item isCheapest={cheapestIndex === 3} onChange={(price) => updatePrice(3, price)} />

        <Item isCheapest={cheapestIndex === 4} onChange={(price) => updatePrice(4, price)} />
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

function Item({
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
            const itemPrice = totalPrice / itemCount;

            setItemCount(itemCount);
            setItemPrice(itemPrice);

            onChange(itemPrice);
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
            const itemPrice = totalPrice / itemCount;

            setTotalPrice(totalPrice);
            setItemPrice(itemPrice);

            onChange(itemPrice);
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
            const totalPrice = itemPrice * itemCount;

            setItemPrice(itemPrice);
            setTotalPrice(totalPrice);

            onChange(itemPrice);
          }}
        />

        <div>THB</div>
      </div>

      <div>{isCheapest && "X"}</div>

      <button>Remove</button>
    </>
  );
}
