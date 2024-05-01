import Balance from "./components/Balance";
import Movements from "./components/Movements";
import Summary from "./components/Summary";
import Transaction from "./components/Transaction";
import Popup from "./components/Popup";
import { AppProvider, useAppContext } from "./context/AppContext";
import logo from "./assets/logo.png";

export type TransactionProps = {
  type: string;
  description: string;
  date: string;
  amount: number;
};

function PopupComponent() {
  const { togglePopup } = useAppContext();

  return togglePopup ? <Popup /> : null;
}

export default function App() {
  return (
    <AppProvider>
      <nav>
        <img src={logo} alt="Logo" className="logo" />
      </nav>

      <PopupComponent />

      <main className="app">
        <Balance />
        <Movements />
        <Summary />
        <Transaction type="income" />
        <Transaction type="invest" />
        <Transaction type="expense" />
      </main>

      {/* <footer>&copy; by Jonas Schmedtmann.</footer> */}
    </AppProvider>
  );
}
