import { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import Balance from "./Components/Balance";
import Movements from "./Components/Movements";
import Summary from "./Components/Summary";
import { Income, Invest, Expense } from "./Components/Transaction";
import Popup from "./Components/Popup";

export type TransactionProps = {
  type: string;
  description: string;
  date: string;
  amount: number;
};

export default function App() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionProps>();
  const [sortedTransactions, setSortedTransactions] = useState<
    TransactionProps[]
  >([]);
  const [sort, setSort] = useState(false);
  const [togglePopup, setTogglePopup] = useState(false);

  useEffect(() => {
    if (sort) {
      setSortedTransactions(
        transactions
          .slice()
          .sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount))
      );
    }
  }, [sort, transactions]);

  // console.log(sort);
  // console.log("sorted: ", sortedTransactions);
  // console.log("not: ", transactions);

  useEffect(() => {
    let [totalIncome, totalInvest, totalExpense] = [0, 0, 0];

    for (const transaction of transactions) {
      if (transaction.type === "income") totalIncome += transaction.amount;
      else if (transaction.type === "invest") totalInvest += transaction.amount;
      else totalExpense += transaction.amount;
    }

    setBalance(totalIncome - totalInvest + totalExpense);
  }, [transactions]);

  useEffect(() => {
    if (selectedTransaction && !togglePopup) {
      setTransactions(
        transactions.filter(
          (transaction) => transaction !== selectedTransaction
        )
      );
    }
  }, [selectedTransaction, togglePopup, transactions]);

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
        <Income setTransactions={setTransactions} />
        <Invest setTransactions={setTransactions} />
        <Expense setTransactions={setTransactions} />
      </main>

      {/* <footer>&copy; by Jonas Schmedtmann.</footer> */}
    </>
  );
}
