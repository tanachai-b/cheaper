import { useEffect, useState } from "react";
import { EntryData } from "../types";

export function useLocalStorage(): {
  initSettings?: { currency: string; decimalDigits: number };
  initEntries?: EntryData[];
} {
  const [isRetrieved, setIsRetrieved] = useState(false);

  useEffect(() => setIsRetrieved(true), []);

  if (isRetrieved) return { initSettings: undefined, initEntries: undefined };

  const { initSettings, initEntries } = retrieveFromStorage();
  return { initSettings, initEntries };
}

function retrieveFromStorage() {
  const version = localStorage.getItem("apiVersion");
  const readSettings = localStorage.getItem("settings");
  const readEntries = localStorage.getItem("entries");

  if (version !== "0.7.0" || readSettings == null || readEntries == null) return {};

  const initSettings = JSON.parse(readSettings, fromJsonReplacer);
  const initEntries = JSON.parse(readEntries, fromJsonReplacer);

  return { initSettings, initEntries };
}

export function saveToStorage(currency: string, decimalDigits: number, entries: EntryData[]) {
  localStorage.clear();

  localStorage.setItem("apiVersion", "0.7.0");

  localStorage.setItem("settings", JSON.stringify({ currency, decimalDigits }));
  localStorage.setItem("entries", JSON.stringify(entries, toJsonReplacer));
}

function fromJsonReplacer(key: string, value: unknown) {
  if (["totalPrice", "itemCount", "itemPrice"].includes(key)) {
    if (value === "Infinity") return Infinity;
    if (value === "NaN") return NaN;
  }
  return value;
}

function toJsonReplacer(_key: string, value: unknown) {
  if (typeof value === "number") {
    if (value === Infinity) return "Infinity";
    if (isNaN(value as number)) return "NaN";
  }
  return value;
}
