import { TransactionProps } from "../App";

import { useRef } from "react";
import { getCurrentDate } from "../utils/utils";

interface IncomeProps {
  setTransactions: React.Dispatch<React.SetStateAction<TransactionProps[]>>;
}
export function Income({ setTransactions }: IncomeProps) {
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
export function Investment({ setTransactions }: InvestmentProps) {
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
export function Expense({ setTransactions }: ExpenseProps) {
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
