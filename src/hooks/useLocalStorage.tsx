import { useCallback, useEffect, useState } from "react";

export type TSetStateLocalStorage<T> = (
  callbackFn: (value: T) => T | T
) => void;

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T
): [T, TSetStateLocalStorage<T>] {
  const [item, setItem] = useState<T>(defaultValue);

  useEffect(() => {
    const storedTransactions = localStorage.getItem(key);
    if (storedTransactions) {
      setItem(JSON.parse(storedTransactions));
    }
  }, [key]);

  const setLocalStorageItem = useCallback<TSetStateLocalStorage<T>>(
    (callbackFn) => {
      setItem((currentItem) => {
        const value =
          typeof callbackFn === "function"
            ? callbackFn(currentItem)
            : callbackFn;
        localStorage.setItem(key, JSON.stringify(value));
        return value;
      });
    },
    [key]
  );

  const localStorageItem = item;

  return [localStorageItem, setLocalStorageItem];
}
