import { formatCurrency, getCurrentDate } from "../utils/utils";

export interface BalanceProps {
  balance: number;
}

export default function Balance({ balance }: BalanceProps) {
  return (
    <div className="balance">
      <div className="balance__left">
        <div className="current-balance">
          <p className="balance__label">Current balance</p>
          <p className="balance__date">
            As of <span className="date">{getCurrentDate()}</span>
          </p>
        </div>
      </div>
      <p className="balance__value">{formatCurrency(balance)}</p>
    </div>
  );
}
