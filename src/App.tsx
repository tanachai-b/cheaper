import { useState } from "react";
import { Body, Container, Entry, Header } from "./components";

export default function App() {
  const [itemPrices, setItemPrices] = useState([0, 0, 0, 0, 0]);

  const cheapestPrice = itemPrices.reduce<number | undefined>((cheapest, price) => {
    if (price === 0) return cheapest;
    if (cheapest == null) return price;
    if (price < cheapest) return price;
    return cheapest;
  }, undefined);

  function updatePrice(index: number, value: number) {
    setItemPrices(itemPrices.map((v, i) => (i === index ? value : v)));
  }

  return (
    <Container>
      <Header />

      <Body>
        <Entry
          isCheapest={itemPrices[0] === cheapestPrice}
          onChangeItemPrice={(price) => updatePrice(0, price)}
        />

        <Entry
          isCheapest={itemPrices[1] === cheapestPrice}
          onChangeItemPrice={(price) => updatePrice(1, price)}
        />

        <Entry
          isCheapest={itemPrices[2] === cheapestPrice}
          onChangeItemPrice={(price) => updatePrice(2, price)}
        />

        <Entry
          isCheapest={itemPrices[3] === cheapestPrice}
          onChangeItemPrice={(price) => updatePrice(3, price)}
        />

        <Entry
          isCheapest={itemPrices[4] === cheapestPrice}
          onChangeItemPrice={(price) => updatePrice(4, price)}
        />
      </Body>
    </Container>
  );
}
