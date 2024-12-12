import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";  
import "./ExpenseList.css";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [expandedExpense, setExpandedExpense] = useState(null); // State to track expanded expense
  const navigate = useNavigate();

  // Fetch Expenses
  const fetchExpenses = useCallback(async () => {
    try {
      const response = await api.get("/api/v1/");
      setExpenses(response.data);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
      alert("Failed to fetch expenses: " + (err.response?.data?.message || "An unexpected error occurred"));

      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  }, [navigate]);

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/api/v1/deleteExpense/${id}`);
      alert("Expense deleted successfully!");
      fetchExpenses();
    } catch (err) {
      console.error("Failed to delete expense:", err);
      alert("Failed to delete expense: " + (err.response?.data?.message || "An unexpected error occurred"));
    }
  };

  const editExpense = (id) => {
    navigate(`/api/v1/updateExpense/${id}`);
  };

  const toggleExpenseDetails = (id) => {
    setExpandedExpense((prev) => (prev === id ? null : id)); // Toggle the details for the clicked expense
  };

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <div className="expense-list">
      <h2>Expense List</h2>
      <button onClick={() => navigate("/api/v1/saveExpense")}>
        Add New Expense
      </button>
      {expenses.length > 0 ? (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id} onClick={() => toggleExpenseDetails(expense.id)}>
              <div className="expense-summary">
                <span>{expense.category}</span>: ${expense.amount} on {expense.date}
              </div>
              {expandedExpense === expense.id && ( // Conditionally render details
                <div className="expense-details">
                  <p><strong>Description:</strong> {expense.description || "N/A"}</p>
                  <p><strong>Notes:</strong> {expense.notes || "N/A"}</p>
                  <button onClick={(e) => { e.stopPropagation(); editExpense(expense.id); }}>Edit</button>
                  <button onClick={(e) => { e.stopPropagation(); deleteExpense(expense.id); }}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
};

export default ExpenseList;
