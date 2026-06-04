package com.epicode.sportsdata.security;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component //componente sempre pronto
public class JwtUtils {

    //legge il file delle impostazioni application.properties
    @Value("${jwt.secret}") //password di spring
    private String jwtSecret;

    @Value("${jwt.expiration}") //tempo di validità
    private int jwtExpirationMs;

    //generazione della chiave crittografica a partire dalla stringa nel file properties jwt.secret
    private Key key() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    //generazione del token JWT quando l'utente fa il login
    public String generateJwtToken(Authentication authentication) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername())) //usiamo l'email come username
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    //prendo l'email dal token
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    //verifica se il token è valido, non manomesso e non scaduto
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(authToken);
            return true;
        } catch (Exception e) {
            System.err.println("Token JWT non valido: " + e.getMessage());
        }
        return false;
    }
}