package com.atif.personal.expense.tracker.util;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;

@Component
public class JwtUtil {

    private String secretKey = "secret"; // Use a secure secret key

    // Generate JWT token
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour expiration
                .compact();
    }

    // Validate JWT token (Optional: used to check if the token is valid)
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Get username (email) from the token
    public String extractUsername(String token) {
        return Jwts.parser()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
