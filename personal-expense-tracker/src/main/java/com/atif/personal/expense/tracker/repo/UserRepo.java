package com.atif.personal.expense.tracker.repo;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.atif.personal.expense.tracker.entity.UserDetail;

public interface UserRepo extends CrudRepository<UserDetail, Long> {
    Optional<UserDetail> findByEmail(String email);
}
