import { useCallback, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Income from "../components/Income";
import Expense from "../components/Expense";
import TargetSaving from "../components/TargetSaving";
import SavingAmount from "../components/SavingAmount";
import "../App.css";

export const Budget = () => {
  const [saveAmount, setSaveAmount] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const getSavingAmount = useCallback(
    (amount: number) => {
      setSaveAmount(amount);
    },
    [saveAmount]
  );
  const getTotalIncome = useCallback(
    (amount: number) => {
      setTotalIncomes(amount);
    },
    [totalIncomes]
  );
  const getTotalExpenses = useCallback(
    (amount: number) => {
      setTotalExpenses(amount);
    },
    [totalExpenses]
  );

  return (
    <HelmetProvider>
      <Helmet>
        <title>Budget App</title>
      </Helmet>
      <ToastContainer />
      <div className="App">
        <header className="App-header">
          <h1>Budget Control</h1>
          <Link to="/" style={{color: "black"}}>Home</Link>
        </header>
        <main className="upper-main">
          <Income getTotalIncome={getTotalIncome} />
          <Expense
            getTotalExpenses={getTotalExpenses}
            totalIncomes={totalIncomes}
            saveAmount={saveAmount}
          />
          <TargetSaving saveAmount={saveAmount} />
          <SavingAmount
            getSavingAmount={getSavingAmount}
            totalIncomes={totalIncomes}
            totalExpenses={totalExpenses}
          />
        </main>
      </div>
    </HelmetProvider>
  );
};
