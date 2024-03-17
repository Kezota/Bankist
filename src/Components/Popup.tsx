import { TransactionProps } from "../App";
import { formatCurrency } from "../utils/utils";

interface IPopup {
  selectedTransaction: TransactionProps;
  setTogglePopup: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTransaction: React.Dispatch<
    React.SetStateAction<TransactionProps | undefined>
  >;
}

export default function Popup({
  selectedTransaction,
  setTogglePopup,
  setSelectedTransaction,
}: IPopup) {
  function closePopup(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setTogglePopup((prev) => !prev);
    setSelectedTransaction(undefined);
  }

  function deleteTransaction(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setTogglePopup((prev) => !prev);
  }

  return (
    <div className="popup">
      <div className="popup-content" id="popup">
        <button className="close" onClick={closePopup}>
          ✖
        </button>
        <p>Are you sure want to delete this transaction:</p>
        <div className="transaction">
          <div
            className={`movements__type movements__type--${selectedTransaction.type} transaction__type`}
          >
            {selectedTransaction.description}
          </div>
          <div className="transaction__amount">
            {formatCurrency(selectedTransaction.amount)}
          </div>
        </div>
        <div className="buttons">
          <button className="refuse" onClick={closePopup}>
            No
          </button>
          <button className="accept" onClick={deleteTransaction}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
