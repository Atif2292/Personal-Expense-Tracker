package com.atif.personal.expense.tracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atif.personal.expense.tracker.entity.Expense;
import com.atif.personal.expense.tracker.service.ExpenseService;

@RestController
@RequestMapping("/api/v1")
public class ExpenseController {

	@Autowired
	private ExpenseService expenseService;

	@CrossOrigin
	@GetMapping("/")
	public List<Expense> viewHomePage() {
		List<Expense> expenses = expenseService.getAllExpenses();
		return expenses;
	}

	@CrossOrigin
	@PostMapping("/saveExpense")
	public ResponseEntity<String> saveExpense(@RequestBody Expense expense) {
		expenseService.saveExpense(expense);
		return ResponseEntity.ok("Expense saved successfully.");
	}

	@CrossOrigin
	@PutMapping("/updateExpense/{id}")
	public String updateExpense(@PathVariable("id") long id, @RequestBody Expense expense) {
		Expense existingExpense = expenseService.getExpenseById(id);
		existingExpense.setDescription(expense.getDescription());
		existingExpense.setAmount(expense.getAmount());
		expenseService.saveExpense(existingExpense);
		return "redirect:/";
	}

	@CrossOrigin
	@DeleteMapping("/deleteExpense/{id}")
	public String deleteExpense(@PathVariable("id") long id) {
		System.out.println("delete");
		expenseService.deleteExpenseById(id);
		return "redirect:/";
	}
}