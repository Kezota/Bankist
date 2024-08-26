import Balance from "./Components/Balance";
import Movements from "./Components/Movements";
import Summary from "./Components/Summary";
import Transaction from "./Components/Transaction";
import Popup from "./Components/Popup";
import { AppProvider, useAppContext } from "./context/AppContext";
import logo from "./assets/logo.png";

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
