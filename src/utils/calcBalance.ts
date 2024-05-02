import { TransactionProps } from "../types/transactionProps";

export default function calcBalance(transactions: TransactionProps[]) {
  let [totalIncome, totalInvest, totalExpense] = [0, 0, 0];

  for (const transaction of transactions) {
    if (transaction.type === "income") totalIncome += transaction.amount;
    else if (transaction.type === "invest") totalInvest += transaction.amount;
    else totalExpense += transaction.amount;
  }

  return totalIncome - totalInvest + totalExpense;
}
