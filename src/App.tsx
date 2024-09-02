import cx from "classnames";
import { useState } from "react";
import { Body, Container, Entry, Header, SettingsPanel } from "./components";
import { useEntries, usePageState } from "./hooks";

export default function App() {
  const {
    isEditing,
    isShowSettings,

    startEditing,
    stopEditing,
    openSettings,
    closeSettings,
  } = usePageState();

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

  return (
    <>
      <Container>
        <Header
          isEditing={isEditing}
          selectionStatus={selectionStatus}
          onClickEdit={startEditing}
          onClickBack={() => {
            selectAll(false);
            stopEditing();
          }}
          onClickSelectAll={() => selectAll(selectionStatus !== "all")}
          onClickDelete={() => {
            deleteSelection();
            stopEditing();
          }}
          onClickSettings={openSettings}
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
        onClose={closeSettings}
        onSetCurrency={setCurrency}
        onSetDecimalDigits={setDecimalDigits}
      />
    </>
  );
}
