import { useAppContext } from "../context/AppContext";
import { formatCurrency } from "../utils/utils";

export default function Popup() {
  const { selectedTransaction, onClosePopup, onDeleteTransaction } =
    useAppContext();

  return (
    <div className="popup">
      <div className="popup-content" id="popup">
        <button className="close" onClick={onClosePopup}>
          ✖
        </button>
        <p>Are you sure want to delete this transaction:</p>
        <div className="transaction">
          <div
            className={`movements__type movements__type--${
              selectedTransaction!.type
            } transaction__type`}
          >
            {selectedTransaction!.description}
          </div>
          <div className="transaction__amount">
            {formatCurrency(selectedTransaction!.amount)}
          </div>
        </div>
        <div className="buttons">
          <button className="refuse" onClick={onClosePopup}>
            No
          </button>
          <button className="accept" onClick={onDeleteTransaction}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
