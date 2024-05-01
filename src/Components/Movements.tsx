import { formatCurrency } from "../utils/utils";
import { useAppContext } from "../context/AppContext";

export default function Movements() {
  const { transactions, sortedTransactions, sort, onSelectTransaction } =
    useAppContext();

  return (
    <div className="movements">
      {[...(sort ? sortedTransactions : transactions)]
        .reverse()
        .map((transaction, i) => (
          <div
            className="movements__row"
            key={i}
            onClick={() => onSelectTransaction(transaction)}
          >
            <div
              className={`movements__type movements__type--${transaction.type}`}
            >
              {transaction.description}
            </div>
            <div className="movements__date">{transaction.date}</div>
            <div className="movements__value">
              {formatCurrency(transaction.amount)}
            </div>
          </div>
        ))}
    </div>
  );
}
