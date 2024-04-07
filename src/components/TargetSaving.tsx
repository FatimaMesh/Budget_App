import { useState, ChangeEvent, MouseEvent, useEffect } from "react";

export default function TargetSaving({ saveAmount }: { saveAmount: number }) {
  const [amount, setAmount] = useState(0);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const targetAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAmount(Number(value));
  };
  //check value
  useEffect(() => {
    if (amount >= 0) {
      if (Number(amount) >= saveAmount) {
        setIsError(false);
      } else {
        setIsError(true);
        setMessage("Target should be greater than your saving");
      }
    } else {
      setIsError(true);
      setMessage("Target must be a number and positive");
    }
  }, [amount]);

  const resetButton = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setAmount(0);
  };

  return (
    <div className="target container">
      <form id="target_form">
        <h2>Target Saving</h2>
        <label htmlFor="target">Set target</label>
        <input
          type="amount"
          name="target"
          id="target"
          min={0}
          onChange={targetAmount}
          value={isNaN(amount) ? 0 : amount}
        />
        {isError && <p className="error">{message} </p>}
        <button type="reset" onClick={resetButton}>
          Reset
        </button>
        <p>Current saving: {saveAmount}</p>
        <p>Target: {isNaN(amount) ? 0 : amount}</p>
        {!isError && (
          <>
            <p>Progress:</p>
            <progress
              value={amount ? Math.round((saveAmount / amount) * 100) : 0}
              max="100"
            />
            <p>{amount ? Math.round((saveAmount / amount) * 100) : 0}%</p>
          </>
        )}
      </form>
    </div>
  );
}
