import { useState, useEffect } from "react";
import uuid from "react-uuid";
import dayjs from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";

import { successMessage, errorMessage } from "./notify";

type Expense = {
  id?: string;
  source: string;
  amount: number;
  date: string;
};
type ExpenseProps = {
  getTotalExpenses: (amount: number) => void;
  totalIncomes: number;
  saveAmount: number;
};

export default function Expense(props: ExpenseProps) {
  const { getTotalExpenses, totalIncomes, saveAmount } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Expense>();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const totalExpense = expenses.reduce(
    (total, currentExpense) => total + Number(currentExpense.amount),
    0
  );
  useEffect(() => {
    getTotalExpenses(totalExpense);
  }, [expenses, totalExpense, props]);

  const expenseSubmit: SubmitHandler<Expense> = (data) => {
    const balance = totalIncomes - (saveAmount + totalExpense);
    if (balance >= Number(data.amount)) {
      const addExpense = {
        id: uuid(),
        ...data,
      };
      setExpenses((expense) => [...expense, addExpense]);
      successMessage("Add expense successfully");
      reset();
    } else {
      errorMessage("Your balance is not enough for this expense");
    }
  };
  const deleteExpense = (id: string) => {
    const updateExpenses = expenses.filter((expense) => {
      return expense.id !== id;
    });
    setExpenses(updateExpenses);
    successMessage("Deleted expense successfully");
  };
  return (
    <div className="expense container">
      <form id="expense_form" onSubmit={handleSubmit(expenseSubmit)}>
        <h2>Expense</h2>
        <label htmlFor="expense_source">Expense Source</label>
        <input
          type="text"
          placeholder="Ex:Electricity bill"
          id="expense_source"
          {...register("source", { required: "Required Input" })}
        />
        {errors.source && <p className="error">{errors.source?.message}</p>}
        <label htmlFor="expense_amount">Amount of expense</label>
        <input
          type="amount"
          id="expense_amount"
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
        <label htmlFor="expense_date">Date of expense</label>
        <input
          type="Date"
          id="expense_date"
          {...register("date", { required: "Required Input" })}
        />
        {errors.date && <p className="error">{errors.date?.message}</p>}
        <button type="submit">Add expense</button>
      </form>
      {expenses.length ? (
        <ul className="show_data">
          {expenses.map((expense) => (
            <li key={expense.id}>
              <span>
                {expense.source}: {expense.amount}SR on{" "}
                {dayjs(expense.date).format("ddd MMM DD YYYY")}
              </span>
              <button
                className="delete_btn"
                onClick={() => deleteExpense(expense.id ? expense.id : "")}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no_content">No expense entered</p>
      )}
    </div>
  );
}
