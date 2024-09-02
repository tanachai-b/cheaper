import { useState } from "react";
import { EntryData, getBlankEntry } from "src/types";

export function useEntries(initEntries?: EntryData[]) {
  const [entries, setEntries] = useState<EntryData[]>(initEntries ?? [getBlankEntry()]);

  const cheapestPrice = entries.reduce<number | undefined>((cheapest, price) => {
    if (price.itemPrice === 0) return cheapest;
    if (cheapest == null) return price.itemPrice;
    if (price.itemPrice < cheapest) return price.itemPrice;
    return cheapest;
  }, undefined);

  const setPrices = (key: string, prices: { totalPrice: number; itemCount: number }): void => {
    const itemPrice = prices.totalPrice / prices.itemCount;

    const updatedEntry = entries.map(
      (value): EntryData => (value.key === key ? { ...value, ...prices, itemPrice } : value),
    );

    const lastEntryIsZero = updatedEntry.slice(-1)[0].itemPrice === 0;

    const addedNewEntry = !lastEntryIsZero ? [...updatedEntry, getBlankEntry()] : updatedEntry;

    setEntries(addedNewEntry);
  };

  return {
    entries,
    setEntries,

    cheapestPrice,
    setPrices,
  };
}
