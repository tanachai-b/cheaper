import { useState } from "react";

type EntryData = {
  key: string;
  itemPrice: number;
  isSelected: boolean;
  isVisible: boolean;
};

function getBlankEntry() {
  const key = Math.floor(Math.random() * 36 ** 4).toString(36);

  const newEntry: EntryData = { key, itemPrice: 0, isSelected: false, isVisible: true };

  return newEntry;
}

export function useEntries() {
  const [entries, setEntries] = useState<EntryData[]>([getBlankEntry()]);

  const cheapestPrice = entries.reduce<number | undefined>((cheapest, price) => {
    if (price.itemPrice === 0) return cheapest;
    if (cheapest == null) return price.itemPrice;
    if (price.itemPrice < cheapest) return price.itemPrice;
    return cheapest;
  }, undefined);

  const selectionCount = entries.reduce(
    (count, entry) => (entry.isSelected ? count + 1 : count),
    0,
  );

  const selectionStatus: "none" | "some" | "all" =
    selectionCount === 0 ? "none" : selectionCount < entries.length ? "some" : "all";

  const setPrice = (key: string, itemPrice: number): void => {
    const updatedEntry = entries.map(
      (value): EntryData => (value.key === key ? { ...value, itemPrice } : value),
    );

    const lastEntryIsZero = updatedEntry.slice(-1)[0].itemPrice === 0;

    const addedNewEntry = !lastEntryIsZero ? [...updatedEntry, getBlankEntry()] : updatedEntry;

    setEntries(addedNewEntry);
  };

  function select(key: string, isSelected: boolean): void {
    const updatedEntry = entries.map(
      (value): EntryData => (value.key === key ? { ...value, isSelected } : value),
    );
    setEntries(updatedEntry);
  }

  function selectAll(isSelected: boolean): void {
    const updatedEntry = entries.map((value): EntryData => ({ ...value, isSelected }));
    setEntries(updatedEntry);
  }

  function deleteSelection(): void {
    const updatedEntry = entries.map(
      (value): EntryData => (value.isSelected ? { ...value, isVisible: false } : value),
    );
    setEntries(updatedEntry);

    setTimeout(
      () =>
        setEntries((entries) => {
          const removedEntries = entries.filter((value) => value.isVisible);

          const lastEntryIsZero =
            removedEntries.length > 0 && removedEntries.slice(-1)[0].itemPrice === 0;

          const addedNewEntry =
            removedEntries.length === 0 || !lastEntryIsZero
              ? [...removedEntries, getBlankEntry()]
              : removedEntries;

          return addedNewEntry;
        }),
      150,
    );
  }

  return {
    entries,
    cheapestPrice,
    selectionStatus,
    setPrice,
    select,
    selectAll,
    deleteSelection,
  };
}
