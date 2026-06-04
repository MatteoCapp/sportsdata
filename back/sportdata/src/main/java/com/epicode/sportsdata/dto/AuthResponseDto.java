package com.epicode.sportsdata.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponseDto {
    private String token;
    private Long id;
    private String email;
    private String name;
    private String role; 
}