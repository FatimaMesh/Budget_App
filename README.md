# Budget App

React application to manage incomes, expenses, and saving targets. The application is built using TypeScript and focuses on fundamental concepts.

### Main Features

The application includes the following features:

- Create UI for a one-page application to store incomes, expenses, and saving targets, saving amount
- Implement features to add income sources, value and date.
- Implement features to add expense sources, value, and date.
- Implement features to add the value of the target saving.
- Implement features to add the value of the saving amount.

### Other Features

The application enhances its functionality with the following features:

- Calculate the account balance using the formula: income - expense - saving = balance.
- Implement a feature to transfer the balance amount to the saving amount.
- Calculate the total of the current saving and the percentage of the current saving amount / target of saving.
- Add a delete button to remove items in income and expense sources.
 <br>
  
- Validate the input income, expense, target of income, and saving account. They should be positive numbers.
- Display an error message. Use React Hook Form and Zod to apply validation.
 <br>

- Apply React Router so when users access "/budget-app", it will render the Budget component.
- Apply advanced React hooks such as useMemo, useCallback to optimize performance.

