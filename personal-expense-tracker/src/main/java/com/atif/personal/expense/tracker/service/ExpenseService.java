package com.atif.personal.expense.tracker.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atif.personal.expense.tracker.entity.Expense;
import com.atif.personal.expense.tracker.repo.ExpenseRepository;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Expense> getAllExpenses() {
        return (List<Expense>) expenseRepository.findAll();
    }

    public void saveExpense(Expense expense) {
        expenseRepository.save(expense);
    }

    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id).orElse(null);
    }

    public void deleteExpenseById(Long id) {
        expenseRepository.deleteById(id);
    }

  
}