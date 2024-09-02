export type EntryData = {
  key: string;
  isSelected: boolean;
  isVisible: boolean;
  totalPrice: number;
  itemCount: number;
  itemPrice: number;
};

export function getBlankEntry() {
  const key = Math.floor(Math.random() * 36 ** 4).toString(36);

  const newEntry: EntryData = {
    key,
    isSelected: false,
    isVisible: true,
    totalPrice: 0,
    itemCount: 1,
    itemPrice: 0,
  };

  return newEntry;
}
