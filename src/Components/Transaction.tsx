import { useRef } from "react";
import { TransactionProps } from "../types/transactionProps";
import { getCurrentDate } from "../utils/utils";
import { useAppContext } from "../context/AppContext";

interface ITransaction {
  type: string;
}

export default function Transaction({ type }: ITransaction) {
  const { onAddTransaction } = useAppContext();
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

    onAddTransaction({
      type: type,
      description: desc || type,
      date: getCurrentDate(),
      amount: parseFloat(value || "0") * 1000 * (type === "expense" ? -1 : 1),
    } as TransactionProps);
  }

  return (
    <div className={`operation operation--${type}`}>
      <h2>{type}</h2>
      <div className={`form form--${type}`}>
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
      </div>
    </div>
  );
}
