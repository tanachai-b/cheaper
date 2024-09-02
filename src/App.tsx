import cx from "classnames";
import { useEffect, useState } from "react";
import { Body, Container, Entry, Header, SettingsPanel } from "./components";
import { saveToStorage, useEntries, useLocalStorage, usePageState, useSelection } from "./hooks";

export default function App() {
  const { initSettings, initEntries } = useLocalStorage();

  const {
    isEditing,
    startEditing,
    stopEditing,

    isShowSettings,
    openSettings,
    closeSettings,
  } = usePageState();

  const [currency, setCurrency] = useState(initSettings?.currency ?? "THB");
  const [decimalDigits, setDecimalDigits] = useState(initSettings?.decimalDigits ?? 2);

  const {
    entries,
    setEntries,

    cheapestPrice,
    setPrices,
  } = useEntries(initEntries);

  const {
    selectionStatus,
    select,
    selectAll,
    deleteSelection,
    //
  } = useSelection({ entries, setEntries });

  useEffect(
    () => saveToStorage(currency, decimalDigits, entries),
    [currency, decimalDigits, entries],
  );

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
              //
              isEditing={isEditing}
              //
              key={entry.key}
              isSelected={entry.isSelected}
              isVisible={entry.isVisible}
              totalPrice={entry.totalPrice}
              itemCount={entry.itemCount}
              itemPrice={entry.itemPrice}
              //
              isCheapest={entry.itemPrice === cheapestPrice}
              //
              onChange={(prices) => setPrices(entry.key, prices)}
              onSelect={(isSelected) => select(entry.key, isSelected)}
            />
          ))}

          <div className={cx("h-[50vh]")} />
        </Body>
      </Container>

      <SettingsPanel
        isVisible={isShowSettings}
        onClose={closeSettings}
        //
        currency={currency}
        decimalDigits={decimalDigits}
        onSetCurrency={setCurrency}
        onSetDecimalDigits={setDecimalDigits}
      />
    </>
  );
}
