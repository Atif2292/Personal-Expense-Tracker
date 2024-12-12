package com.atif.personal.expense.tracker.service;

import com.atif.personal.expense.tracker.entity.Expense;
import com.atif.personal.expense.tracker.entity.UserDetail;
import com.atif.personal.expense.tracker.repo.UserRepo;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService {

    private final UserRepo userRepo;

    public CustomUserDetailsService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public void saveUser(UserDetail userDetail) {
        userRepo.save(userDetail);
    }

    public Optional<UserDetail> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public UserDetail authenticate(String email, String password) {
        Optional<UserDetail> userOptional = userRepo.findByEmail(email);
        if (userOptional.isPresent()) {
            UserDetail user = userOptional.get();
            if (password.equals(user.getPassword())) {
                return user;
            } else {
                throw new RuntimeException("Invalid password.");
            }
        } else {
            throw new RuntimeException("User not found.");
        }
    }

	public UserDetail findById(Long userId) {
		        return userRepo.findById(userId).orElse(null);
		    }
    
}
