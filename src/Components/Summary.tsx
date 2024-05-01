import { useAppContext } from "../context/AppContext";
import { formatCurrency } from "../utils/utils";

export default function Summary() {
  const { transactions, onSort } = useAppContext();
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

      <button className="btn--sort" onClick={onSort}>
        ↕️ SORT
      </button>
    </div>
  );
}
