import { useState } from "react";
import { Body, Container, Header, Price } from "./components";

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
        <Price
          isCheapest={itemPrices[0] === cheapestPrice}
          onChange={(price) => updatePrice(0, price)}
        />

        <Price
          isCheapest={itemPrices[1] === cheapestPrice}
          onChange={(price) => updatePrice(1, price)}
        />

        <Price
          isCheapest={itemPrices[2] === cheapestPrice}
          onChange={(price) => updatePrice(2, price)}
        />

        <Price
          isCheapest={itemPrices[3] === cheapestPrice}
          onChange={(price) => updatePrice(3, price)}
        />

        <Price
          isCheapest={itemPrices[4] === cheapestPrice}
          onChange={(price) => updatePrice(4, price)}
        />
      </Body>
    </Container>
  );
}
