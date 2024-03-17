import { useRef } from "react";
import { TransactionProps } from "../App";
import { getCurrentDate } from "../utils/utils";
import { TSetStateLocalStorage } from "../hooks/useLocalStorage";

interface ITransaction {
  type: string;
  setTransactions: TSetStateLocalStorage<TransactionProps[]>;
}

export function Transaction({ type, setTransactions }: ITransaction) {
  const amount = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    let value: string | undefined = "";
    let desc: string | undefined = "";

    if (!amount.current?.value) return;
    if (amount.current) {
      value = amount.current.value;
      (amount.current as HTMLInputElement).value = "";

      if (type === "expense" && description.current) {
        desc = description.current.value;
        (description.current as HTMLInputElement).value = "";
      }
    }

    setTransactions((prev) => [
      ...prev,
      {
        type: type,
        description: desc || type,
        date: getCurrentDate(),
        amount: parseFloat(value || "0") * 1000 * (type === "expense" ? -1 : 1),
      } as TransactionProps,
    ]);
  }

  return (
    <div className={`operation operation--${type}`}>
      <h2>{type}</h2>
      <form className={`form form--${type}`}>
        {type === "expense" && (
          <input
            type="text"
            className="form__input form__input--description"
            ref={description}
          />
        )}
        <input
          type="number"
          className={`form__input form__input--amount`}
          ref={amount}
        />
        <button
          className={`form__btn form__btn--${type}`}
          onClick={handleClick}
        >
          &rarr;
        </button>
        {type === "expense" && (
          <label className="form__label">Description</label>
        )}
        <label
          className={`form__label ${
            type !== "expense" && `form__label--${type}`
          }`}
        >
          Amount
        </label>
      </form>
    </div>
  );
}
