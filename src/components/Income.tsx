import { useEffect, useState } from "react";
import uuid from "react-uuid";
import dayjs from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";

import { successMessage } from "./notify";

type Income = {
  id?: string;
  source: string;
  amount: number;
  date: string;
};

function Income(props: { getTotalIncome: (amount: number) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Income>();
  const [incomes, setIncomes] = useState<Income[]>([]);

  useEffect(() => {
    props.getTotalIncome(
      incomes.reduce(
        (total, currentIncome) => total + Number(currentIncome.amount),
        0
      )
    );
  }, [incomes, props]);

  const incomeSubmit: SubmitHandler<Income> = (data) => {
    const addIncome = {
      id: uuid(),
      ...data,
    };
    setIncomes((income) => [...income, addIncome]);
    successMessage("Add income successfully");
    reset();
  };

  const deleteIncome = (id: string) => {
    const updateIncomes = incomes.filter((income) => {
      return income.id !== id;
    });
    setIncomes(updateIncomes);
  };

  return (
    <div className="income container">
      <form id="income_form" onSubmit={handleSubmit(incomeSubmit)}>
        <h2>Income</h2>
        <label htmlFor="income_source">Income Source</label>
        <input
          type="text"
          placeholder="salary"
          id="income_source"
          {...register("source", { required: "Required Input" })}
        />
        {errors.source && <p className="error">{errors.source?.message}</p>}
        <label htmlFor="income_amount">Amount of income</label>
        <input
          type="amount"
          id="income_amount"
          {...register("amount", {
            required: "Required Input",
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
              message: "Have to be a Number",
            },
            min: { value: 1, message: "The Amount should be POSITIVE" },
          })}
        />
        {errors.amount && <p className="error">{errors.amount?.message}</p>}
        <label htmlFor="income_date">Date of income</label>
        <input
          type="Date"
          id="income_date"
          {...register("date", { required: "Required Input" })}
        />
        {errors.date && <p className="error">{errors.date?.message}</p>}
        <button type="submit">Add income</button>
      </form>
      {incomes.length ? (
        <ul className="show_data">
          {incomes.map((income) => (
            <li key={income.id}>
              <span>
                {income.source}: {income.amount}SR on{" "}
                {dayjs(income.date).format("ddd MMM DD YYYY")}
              </span>
              <button
                className="delete_btn"
                onClick={() => deleteIncome(income.id ? income.id : "")}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no_content">No income entered</p>
      )}
    </div>
  );
}
export default Income;
