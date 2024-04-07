import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { successMessage, errorMessage } from "./notify";

type SavingProps = {
  getSavingAmount: (amount: number) => void;
  totalIncomes: number;
  totalExpenses: number;
};
type Saving = {
  saving: number;
};
export default function SavingAmount({
  getSavingAmount,
  totalIncomes,
  totalExpenses,
}: SavingProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Saving>();

  let [totalSaving, setTotalSaving] = useState<number>(0);
  const balance = totalIncomes - (totalExpenses + totalSaving);

  const transferForm: SubmitHandler<Saving> = (data) => {
    totalSaving = totalSaving + Number(data.saving);
    if (totalSaving <= totalIncomes - totalExpenses) {
      setTotalSaving(totalSaving);
      getSavingAmount(totalSaving);
      successMessage("Transfer to saving successfully");
      reset();
    } else {
      errorMessage("Your balance is not enough for this saving");
    }
  };
  return (
    <div className="transfer container">
      <form id="transfer_form" onSubmit={handleSubmit(transferForm)}>
        <h2>Saving Amount</h2>
        <p>Current balance: {balance > 0 ? balance : 0}</p>
        <label htmlFor="saving">Transfer to saving account</label>
        <input
          type="amount"
          id="saving"
          {...register("saving", {
            required: "Required Input",
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
              message: "Have to be a Number",
            },
            min: { value: 1, message: "The Amount should be POSITIVE" },
          })}
        />
        {errors.saving && <p className="error">{errors.saving?.message}</p>}
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
}
