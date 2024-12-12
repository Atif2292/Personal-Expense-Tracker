import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Signup from "./components/Signup";


const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken")); // Load initial authToken from localStorage
  const [userId, setUserId] = useState(localStorage.getItem("userId")); // Assuming userId is stored

  return (
    <Router>
    <Routes>
    <Route
          path="/api/v1/saveExpense"
          element={<ExpenseForm authToken={authToken} userId={userId} />}
        />
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/api/v1/" element={<ExpenseList />} />
      <Route path="/api/v1/saveExpense" element={<ExpenseForm />} />
    </Routes>
  </Router>
  );
};
export default App;
