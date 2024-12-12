import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import './ExpenseForm.css';

const ExpenseForm = () => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !amount || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    if (amount < 0) {
      alert("Amount must be greater than or equal to 0.");
      return;
    }

    const formattedDate = new Date(date).toISOString().split("T")[0];

    const expenseData = {
      category,
      amount: parseFloat(amount),
      date: formattedDate,
      description,
      notes,
    };

    try {
      console.log("Submitting expense:", expenseData);
      const response = await api.post("/api/v1/saveExpense", expenseData);
      console.log("Expense saved:", response.data);
      alert("Expense saved successfully!");
      navigate("/api/v1/");
    } catch (err) {
      console.error("Error saving expense:", err);
      alert("Error saving expense: " + (err.response?.data?.message || "An unexpected error occurred"));
    }
  };

  return (
    <div className="expense-form">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category (required):</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            maxLength={50}
            required
          />
        </div>
        <div>
          <label>Amount (required):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label>Date (required):</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="buttons">
          <button type="submit" className="save-btn">Save Expense</button>
          <button type="button" onClick={() => navigate("/api/v1/")} className="back-btn">Back</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
