import { formatCurrency } from "../utils/utils";
import { TransactionProps } from "../App";

interface IMovements {
  transactions: TransactionProps[];
  setSelectedTransaction: React.Dispatch<
    React.SetStateAction<TransactionProps | undefined>
  >;
  setTogglePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Movements({
  transactions,
  setSelectedTransaction,
  setTogglePopup,
}: IMovements) {
  function handleClick(
    event: React.MouseEvent<HTMLDivElement>,
    transaction: TransactionProps
  ) {
    event.preventDefault();
    setSelectedTransaction(transaction);
    setTogglePopup((prev) => !prev);
  }

  return (
    <div className="movements">
      {[...transactions].reverse().map((tr, i) => (
        <div
          className="movements__row"
          key={i}
          onClick={(event) => handleClick(event, tr)}
        >
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
