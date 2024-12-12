package com.atif.personal.expense.tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atif.personal.expense.tracker.entity.UserDetail;
import com.atif.personal.expense.tracker.service.CustomUserDetailsService;
import com.atif.personal.expense.tracker.util.JwtUtil;

@RestController	
@RequestMapping("/api/auth")
public class UserController {

    private final CustomUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserController(CustomUserDetailsService userDetailsService, JwtUtil jwtUtil) {
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }
    @CrossOrigin

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserDetail userDetail) {
        System.out.println("Signup request received: " + userDetail);
        if (userDetailsService.findByEmail(userDetail.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use.");
        }
        userDetailsService.saveUser(userDetail);
        return ResponseEntity.ok("User registered successfully!");
    }
    @CrossOrigin

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDetail userDetail) {
    	 System.out.println("login request received: " + userDetail);
        UserDetail authenticatedUser = userDetailsService.authenticate(userDetail.getEmail(), userDetail.getPassword());
       

        if (authenticatedUser != null) {
            String token = jwtUtil.generateToken(authenticatedUser.getEmail());
            return ResponseEntity.ok("Bearer " + token);
        }
        return ResponseEntity.status(401).body("Invalid email or password.");
    }
}
