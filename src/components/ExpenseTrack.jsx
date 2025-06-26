import { useState,useEffect } from "react";
import { v4 as uid } from "uuid";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import axios from 'axios';
import './Stylecss.css'

export default function ExpenseTrack() {
  const [expenses, setExpenses] = useState([]);                    //empty it
  useEffect(() => {
    axios.get("htttp://localhost:3000/api/expenses")
    .then((res) => setExpenses(res.data))
    .catch((err) => console.error("Fetch error:", err));
  }, []);

  const addExpense = (title, amount) => {
    axios.post("http://localhost:3000/api/expenses", {title,amount:Number(amount)})
    .then((res) => setExpenses([...expenses,res.data]))
    .catch((err) => console.error("Add error:", err));
  }

  const deleteExpense = (id) => {
    axios.delete(`http://localhost:3000/api/expenses/${id}`)
    .then(() => setExpenses(expenses.filter((exp) => exp._id !== id)))
    .catch((err) => console.error("Delete error:", err));
  };

  return (
    <div className="expense-container">
      <h1>Expense Tracker</h1>
      <ExpenseForm
        addExpense={addExpense}
        // itemToEdit={itemToEdit}
        // setItemToEdit={setItemToEdit}
      />
      <ExpenseSummary expenses={expenses} />
      <ExpenseList
        expenses={expenses}
        //deleteExpense={deleteExpense}
        // editExpense={setItemToEdit}
      />
    </div>
  );
}