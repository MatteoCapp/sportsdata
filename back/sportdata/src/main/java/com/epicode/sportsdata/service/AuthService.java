package com.epicode.sportsdata.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.epicode.sportsdata.dto.AuthResponseDto;
import com.epicode.sportsdata.dto.LoginDto;
import com.epicode.sportsdata.dto.RegisterDto;
import com.epicode.sportsdata.entity.Role;
import com.epicode.sportsdata.entity.RoleType;
import com.epicode.sportsdata.entity.User;
import com.epicode.sportsdata.exception.ResourceNotFoundException;
import com.epicode.sportsdata.repository.RoleRepository;
import com.epicode.sportsdata.repository.UserRepository;
import com.epicode.sportsdata.security.JwtUtils;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager; //strumento di java per controllare la password
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder; //strumento di java per codificare la psw
    private final JwtUtils jwtUtils;//dal file per creare i token

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository,
                       RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public String register(RegisterDto registerDto) {
        //controllo se email esiste già
        if (userRepository.findByEmail(registerDto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("\"Email is already in use!\"");
        }

        //nuovo utente
        User user = new User();
        user.setName(registerDto.getName());
        user.setSurname(registerDto.getSurname());
        user.setEmail(registerDto.getEmail());
        
        //crpita la password prima di salvarla, algoritmo BCrypt
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        //assegnazione del ruolo in base alla scelta utente, default è role analyst
        RoleType requestedRoleType = RoleType.ROLE_ANALYST;

        //controllo se ruolo selezionato è diverso, in caso sia una roba strana vado di default
        if (registerDto.getRole() != null && !registerDto.getRole().isBlank()) {
            try {
                requestedRoleType = RoleType.valueOf(registerDto.getRole());
            } catch (IllegalArgumentException e) {
                System.out.println("Ruolo non valido ricevuto, fallback ad ANALYST");
            }
        }

        //cerco il ruolo nel db e lo salvo
        Role userRole = roleRepository.findByRoleType(requestedRoleType)
                .orElseThrow(() -> new ResourceNotFoundException("Error: Role not found in database."));
        
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);

        userRepository.save(user);

        return "Registration it was sussesfull!";
    }

    public AuthResponseDto login(LoginDto loginDto) {
        //Autenticazione tramite Spring controlla la password
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
        );

        //autentificazione salvata
        SecurityContextHolder.getContext().setAuthentication(authentication);

        //generazione di token JWT
        String jwt = jwtUtils.generateJwtToken(authentication);

        //recupero del utente
        User user = userRepository.findByEmail(loginDto.getEmail()).orElseThrow();
        
        //prendo il ruolo per il front end
        String role = user.getRoles().iterator().next().getRoleType().name();

        //facciamo tornare tutto quello utile
        return new AuthResponseDto(jwt, user.getId(), user.getEmail(), user.getName(), role);
    }
}