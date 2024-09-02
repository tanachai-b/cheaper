import { Dispatch, SetStateAction } from "react";
import { EntryData, getBlankEntry } from "src/types";

export function useSelection({
  entries,
  setEntries,
}: {
  entries: EntryData[];
  setEntries: Dispatch<SetStateAction<EntryData[]>>;
}) {
  const selectionCount = entries.reduce(
    (count, entry) => (entry.isSelected ? count + 1 : count),
    0,
  );

  const selectionStatus: "none" | "some" | "all" =
    selectionCount === 0 ? "none" : selectionCount < entries.length ? "some" : "all";

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
    selectionStatus,
    select,
    selectAll,
    deleteSelection,
  };
}
