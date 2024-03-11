import { formatCurrency } from "../utils/utils";
import { TransactionProps } from "../App";

interface MovementsProps {
  transactions: TransactionProps[];
}
export function Movements({ transactions }: MovementsProps) {
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
