import cx from "classnames";
import { useState } from "react";
import { Body, Container, Entry, Header, SettingsPanel } from "./components";
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

  const [currency, setCurrency] = useState("THB");
  const [decimalDigits, setDecimalDigits] = useState(2);

  const [isEditing, setIsEditing] = useState(false);
  const [isShowSettings, setIsShowSettings] = useState(false);

  return (
    <>
      <Container>
        <Header
          isEditing={isEditing}
          selectionStatus={selectionStatus}
          onClickEdit={() => setIsEditing(true)}
          onClickSettings={() => setIsShowSettings(true)}
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
              currency={currency}
              decimalDigits={decimalDigits}
              isEditing={isEditing}
              key={entry.key}
              isSelected={entry.isSelected}
              isVisible={entry.isVisible}
              isCheapest={entry.itemPrice === cheapestPrice}
              onChangeItemPrice={(itemPrice) => setPrice(entry.key, itemPrice)}
              onSelect={(isSelected) => select(entry.key, isSelected)}
            />
          ))}

          <div className={cx("h-[50vh]")}></div>
        </Body>
      </Container>

      <SettingsPanel
        isVisible={isShowSettings}
        onClose={() => setIsShowSettings(false)}
        onSetCurrency={setCurrency}
        onSetDecimalDigits={setDecimalDigits}
      />
    </>
  );
}
