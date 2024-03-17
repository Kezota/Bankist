import { TransactionProps } from "../App";
import { formatCurrency } from "../utils/utils";

interface ISummary {
  transactions: TransactionProps[];
  setSort: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Summary({ transactions, setSort }: ISummary) {
  let [totalIncome, totalInvest, totalExpense] = [0, 0, 0];

  for (const transaction of transactions) {
    if (transaction.type === "income") totalIncome += transaction.amount;
    else if (transaction.type === "invest") totalInvest += transaction.amount;
    else totalExpense += -transaction.amount;
  }

  function handleCLick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    setSort((prev) => !prev);
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

      <button className="btn--sort" onClick={handleCLick}>
        ↕️ SORT
      </button>
    </div>
  );
}
