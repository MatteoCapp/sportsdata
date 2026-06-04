package com.epicode.sportsdata.exception;

// estendiamo RuntimeException per lanciare l'errore senza doverlo dichiarare in ogni firma dei metodi
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}