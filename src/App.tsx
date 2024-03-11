import { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import { Balance } from "./Pages/Balance";
import { Movements } from "./Pages/Movements";
import { Summary } from "./Pages/Summary";
import { Income, Investment, Expense } from "./Pages/Transaction";

export type TransactionProps = {
  type: string;
  description: string;
  date: string;
  amount: number;
};

export default function App() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    let [totalIncome, totalInvest, totalExpense] = [0, 0, 0];

    for (const transaction of transactions) {
      if (transaction.type === "income") totalIncome += transaction.amount;
      else if (transaction.type === "invest") totalInvest += transaction.amount;
      else totalExpense += transaction.amount;
    }

    setBalance(totalIncome - totalInvest + totalExpense);
  }, [transactions]);

  return (
    <>
      <nav>
        <img src={logo} alt="Logo" className="logo" />
      </nav>

      <main className="app">
        <Balance balance={balance} />
        <Movements transactions={transactions} />
        <Summary transactions={transactions} />
        <Income setTransactions={setTransactions} />
        <Investment setTransactions={setTransactions} />
        <Expense setTransactions={setTransactions} />
      </main>

      <footer>&copy; by Jonas Schmedtmann.</footer>
    </>
  );
}
