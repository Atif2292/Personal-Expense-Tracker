package com.atif.personal.expense.tracker.repo;

import org.springframework.data.repository.CrudRepository;

import com.atif.personal.expense.tracker.entity.Expense;

public interface ExpenseRepository extends CrudRepository<Expense, Long> {
}
