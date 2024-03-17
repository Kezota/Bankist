import { useEffect, useState } from "react";
import logo from "./assets/logo.png";

import Balance from "./Components/Balance";
import Movements from "./Components/Movements";
import Summary from "./Components/Summary";
import { Transaction } from "./Components/Transaction";
import Popup from "./Components/Popup";
import { useLocalStorageState } from "./hooks/useLocalStorage";

export type TransactionProps = {
  type: string;
  description: string;
  date: string;
  amount: number;
};

const calcBalance = (transactions: TransactionProps[]) => {
  let [totalIncome, totalInvest, totalExpense] = [0, 0, 0];

  for (const transaction of transactions) {
    if (transaction.type === "income") totalIncome += transaction.amount;
    else if (transaction.type === "invest") totalInvest += transaction.amount;
    else totalExpense += transaction.amount;
  }

  return totalIncome - totalInvest + totalExpense;
};

export default function App() {
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

  useEffect(() => {
    if (selectedTransaction && !togglePopup) {
      setTransactions(() => {
        return transactions.filter(
          (transaction) => transaction !== selectedTransaction
        );
      });
      setSelectedTransaction(undefined);
    }
  }, [selectedTransaction, togglePopup, transactions, setTransactions]);

  return (
    <>
      <nav>
        <img src={logo} alt="Logo" className="logo" />
      </nav>

      {togglePopup && selectedTransaction && (
        <div className="popup-wrapper">
          <Popup
            selectedTransaction={selectedTransaction}
            setTogglePopup={setTogglePopup}
            setSelectedTransaction={setSelectedTransaction}
          />
        </div>
      )}

      <main className="app">
        <Balance balance={balance} />
        <Movements
          transactions={sort ? sortedTransactions : transactions}
          setSelectedTransaction={setSelectedTransaction}
          setTogglePopup={setTogglePopup}
        />
        <Summary transactions={transactions} setSort={setSort} />
        <Transaction type="income" setTransactions={setTransactions} />
        <Transaction type="invest" setTransactions={setTransactions} />
        <Transaction type="expense" setTransactions={setTransactions} />
      </main>

      {/* <footer>&copy; by Jonas Schmedtmann.</footer> */}
    </>
  );
}
