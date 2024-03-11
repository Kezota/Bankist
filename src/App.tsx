import { useEffect, useRef, useState } from "react";
import logo from "./assets/logo.png";

type TransactionProps = {
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

interface BalanceProps {
  balance: number;
}

function Balance({ balance }: BalanceProps) {
  return (
    <div className="balance">
      <div>
        <p className="balance__label">Current balance</p>
        <p className="balance__date">
          As of <span className="date">{getCurrentDate()}</span>
        </p>
      </div>
      <p className="balance__value">{formatCurrency(balance)}</p>
    </div>
  );
}

interface MovementsProps {
  transactions: TransactionProps[];
}

function Movements({ transactions }: MovementsProps) {
  return (
    <div className="movements">
      {transactions.map((tr, i) => (
        <div className="movements__row" key={i}>
          <div className={`movements__type movements__type--${tr.type}`}>
            {tr.description}
          </div>
          <div className="movements__date">{tr.date}</div>
          <div className="movements__value">{formatCurrency(tr.amount)}</div>
        </div>
      ))}
    </div>
  );
}

interface SummaryProps {
  transactions: TransactionProps[];
}

function Summary({ transactions }: SummaryProps) {
  let [totalIncome, totalInvest, totalExpense] = [0, 0, 0];

  for (const transaction of transactions) {
    if (transaction.type === "income") totalIncome += transaction.amount;
    else if (transaction.type === "invest") totalInvest += transaction.amount;
    else totalExpense += -transaction.amount;
  }
  return (
    <div className="summary">
      <p className="summary__label">In</p>
      <p className="summary__value summary__value--in">
        {formatCurrency(totalIncome - totalInvest - totalExpense)}
      </p>
      <p className="summary__label">Out</p>
      <p className="summary__value summary__value--out">
        {formatCurrency(totalExpense)}
      </p>
      <p className="summary__label">Invest</p>
      <p className="summary__value summary__value--invest">
        {formatCurrency(totalInvest)}
      </p>
      {/* <button className="btn--sort">↕️ SORT</button> */}
    </div>
  );
}

interface IncomeProps {
  setTransactions: React.Dispatch<React.SetStateAction<TransactionProps[]>>;
}

function Income({ setTransactions }: IncomeProps) {
  const amount = useRef<HTMLInputElement>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    let value: string | undefined = "";

    if (amount.current) {
      value = amount.current.value;
      (amount.current as HTMLInputElement).value = "";
    }

    setTransactions((prev) => [
      ...prev,
      {
        type: "income",
        description: "income",
        date: getCurrentDate(),
        amount: parseFloat(value || "0"),
      },
    ]);
  }

  return (
    <div className="operation operation--income">
      <h2>Income</h2>
      <form className="form form--income">
        <input
          type="number"
          className="form__input form__input--income-amount"
          ref={amount}
        />
        <button className="form__btn form__btn--income" onClick={handleClick}>
          &rarr;
        </button>
        <label className="form__label form__label--income">Amount</label>
      </form>
    </div>
  );
}

interface InvestmentProps {
  setTransactions: React.Dispatch<React.SetStateAction<TransactionProps[]>>;
}

function Investment({ setTransactions }: InvestmentProps) {
  const amount = useRef<HTMLInputElement>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    let value: string | undefined = "";

    if (amount.current) {
      value = amount.current.value;
      (amount.current as HTMLInputElement).value = "";
    }

    setTransactions((prev) => [
      ...prev,
      {
        type: "invest",
        description: "invest",
        date: getCurrentDate(),
        amount: parseFloat(value || "0"),
      },
    ]);
  }

  return (
    <div className="operation operation--invest">
      <h2>Invest</h2>
      <form className="form form--invest">
        <input
          type="number"
          className="form__input form__input--invest-amount"
          ref={amount}
        />
        <button className="form__btn form__btn--invest" onClick={handleClick}>
          &rarr;
        </button>
        <label className="form__label form__label--invest">Amount</label>
      </form>
    </div>
  );
}

interface ExpenseProps {
  setTransactions: React.Dispatch<React.SetStateAction<TransactionProps[]>>;
}

function Expense({ setTransactions }: ExpenseProps) {
  const amount = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    let value: string | undefined = "";
    let desc: string | undefined = "";

    if (amount.current && description.current) {
      value = amount.current.value;
      desc = description.current.value;
      (amount.current as HTMLInputElement).value = "";
      (description.current as HTMLInputElement).value = "";
    }

    setTransactions((prev) => [
      ...prev,
      {
        type: "expense",
        description: desc || "expense",
        date: getCurrentDate(),
        amount: -parseFloat(value || "0"),
      },
    ]);
  }

  return (
    <div className="operation operation--expense">
      <h2>Expense</h2>
      <form className="form form--expense">
        <input
          type="text"
          className="form__input form__input--description"
          ref={description}
        />
        <input
          type="number"
          className="form__input form__input--amount"
          ref={amount}
        />
        <button className="form__btn form__btn--expense" onClick={handleClick}>
          &rarr;
        </button>
        <label className="form__label">Description</label>
        <label className="form__label">Amount</label>
      </form>
    </div>
  );
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount * 1000);
}

function getCurrentDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
}
