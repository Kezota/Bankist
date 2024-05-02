import { createContext, useContext, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorage";
import calcBalance from "../utils/calcBalance";
import { TransactionProps } from "../types/transactionProps";

interface AppContextProps {
  transactions: TransactionProps[];
  onAddTransaction: (newTransaction: TransactionProps) => void;
  selectedTransaction: TransactionProps | undefined;
  onSelectTransaction: (transaction: TransactionProps) => void;
  sort: boolean;
  onSort: () => void;
  togglePopup: boolean;
  onClosePopup: () => void;
  balance: number;
  sortedTransactions: TransactionProps[];
  onDeleteTransaction: () => void;
}

const AppContext = createContext<AppContextProps>({
  transactions: [],
  onAddTransaction: () => {},
  selectedTransaction: undefined,
  onSelectTransaction: () => {},
  sort: false,
  onSort: () => {},
  togglePopup: false,
  onClosePopup: () => {},
  balance: 0,
  sortedTransactions: [],
  onDeleteTransaction: () => {},
});

function AppProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useLocalStorageState<
    TransactionProps[]
  >("transactions", []);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionProps>();
  const [sort, setSort] = useState(false);
  const [togglePopup, setTogglePopup] = useState(false);

  const balance = calcBalance(transactions);
  const sortedTransactions = transactions
    .slice()
    .sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));

  if (selectedTransaction && !togglePopup) {
    setTransactions((currentTransactions) => {
      return currentTransactions.filter(
        (transaction: TransactionProps) => transaction !== selectedTransaction
      );
    });

    setSelectedTransaction(undefined);
  }

  function handleAddTransaction(newTransaction: TransactionProps) {
    setTransactions((currentTransactions) => [
      ...currentTransactions,
      newTransaction,
    ]);
  }

  function handleSort() {
    setSort((prev) => !prev);
  }

  function handleSelectTransaction(transaction: TransactionProps) {
    setSelectedTransaction(transaction);
    setTogglePopup(true);
  }

  function handleClosePopup() {
    setTogglePopup(false);
    setSelectedTransaction(undefined);
  }

  function handleDeleteTransaction() {
    setTogglePopup(false);
  }

  return (
    <AppContext.Provider
      value={{
        transactions,
        onAddTransaction: handleAddTransaction,
        selectedTransaction,
        onSelectTransaction: handleSelectTransaction,
        sort,
        onSort: handleSort,
        togglePopup,
        onClosePopup: handleClosePopup,
        balance,
        sortedTransactions,
        onDeleteTransaction: handleDeleteTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);

  if (context === undefined)
    throw new Error("useAppContext must be used within a AppProvider");

  return context;
};

export { AppProvider, useAppContext };
