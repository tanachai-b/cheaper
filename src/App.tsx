import cx from "classnames";
import { useState } from "react";
import { Body, Container, Entry, Header } from "./components";
import { useEntries } from "./hooks";

export default function App() {
  const {
    entries,
    cheapestPrice,
    selectionStatus,

    setPrice,
    select,
    selectAll,
    deleteSelection,
  } = useEntries();

  const [isEditing, setIsEditing] = useState(false);

  return (
    <Container>
      <Header
        isEditing={isEditing}
        selectionStatus={selectionStatus}
        onClickEdit={() => setIsEditing(true)}
        onClickSettings={() => {}}
        onClickBack={() => {
          setIsEditing(false);
          selectAll(false);
        }}
        onClickSelectAll={() => selectAll(selectionStatus !== "all")}
        onClickDelete={() => {
          deleteSelection();
          setIsEditing(false);
        }}
      />

      <Body>
        {entries.map((entry) => (
          <Entry
            key={entry.key}
            isEditing={isEditing}
            isSelected={entry.isSelected}
            isVisible={entry.isVisible}
            isCheapest={entry.itemPrice === cheapestPrice}
            onSelect={(isSelected) => select(entry.key, isSelected)}
            onChangeItemPrice={(itemPrice) => setPrice(entry.key, itemPrice)}
          />
        ))}

        <div className={cx("h-[50vh]")}></div>
      </Body>
    </Container>
  );
}
