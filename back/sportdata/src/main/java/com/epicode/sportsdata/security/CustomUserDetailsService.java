package com.epicode.sportsdata.security;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.epicode.sportsdata.entity.User;
import com.epicode.sportsdata.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //passiamo a spring l'email inserita nel login da inserire nel metodo propietario
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        //ora lo cerchiamo nel nostro db
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utente non trovato con email: " + email));

        //convertiamo i ruoli (role) nel formato di sping GrantedAuthority
        Set<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getRoleType().name()))
                .collect(Collectors.toSet());

        //qui use non è il mio user ma quello di spring da cui prendo email psw e ruoli
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }
}