package com.epicode.sportsdata.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.epicode.sportsdata.entity.Role;
import com.epicode.sportsdata.entity.RoleType;
import com.epicode.sportsdata.repository.RoleRepository;

@Component
public class RoleRunner implements CommandLineRunner {

    private final RoleRepository roleRepository;

    public RoleRunner(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        //cicliamo su tutti i valori del nostro Enum (analyst, recruiter, admin)
        for (RoleType roleType : RoleType.values()) {
            //se non esiste nel DB, lo crea e lo salva
            if (roleRepository.findByRoleType(roleType).isEmpty()) {
                Role role = new Role();
                role.setRoleType(roleType);
                roleRepository.save(role);
                System.out.println("Ruolo creato nel DB: " + roleType);
            }
        }
    }
}