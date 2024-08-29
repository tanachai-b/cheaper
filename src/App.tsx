import cx from "classnames";
import { ReactNode, useState } from "react";
import { Item } from "./components";

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
      <div
        className={cx(
          "py-[100px]",
          "bg-[#00A080]",

          "grid",
          "place-items-center",

          "text-[50px]",
          "text-[#ffffff]",
        )}
      >
        Cheapest!
      </div>

      <div
        className={cx(
          "flex",
          "flex-col",

          "p-[20px]",
          "gap-[30px]",
        )}
      >
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

        "grid",
        "place-items-center",
      )}
    >
      <div
        className={cx(
          "w-full",
          "max-w-[400px]",

          "flex",
          "flex-col",

          "text-[15px]",
          "font-medium",
        )}
      >
        {children}
      </div>
    </div>
  );
}
