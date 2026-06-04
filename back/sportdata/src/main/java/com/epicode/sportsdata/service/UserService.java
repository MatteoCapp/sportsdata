package com.epicode.sportsdata.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.epicode.sportsdata.entity.Skill;
import com.epicode.sportsdata.entity.User;
import com.epicode.sportsdata.exception.ResourceNotFoundException;
import com.epicode.sportsdata.repository.SkillRepository;
import com.epicode.sportsdata.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    public UserService(UserRepository userRepository, SkillRepository skillRepository) {
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
    }

    //lettura di un utente con gestione dell'errore se non esiste
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with ID " + id + " not found."));
    }

    public List<User> searchUsersByNameOrSurname(String query) {
        return userRepository.findByNameContainingIgnoreCaseOrSurnameContainingIgnoreCase(query, query);
    }

    public User updateProfileImage(Long userId, String imageUrl) {
        User user = getUserById(userId);
        user.setProfileImage(imageUrl);
        return userRepository.save(user);
    }

    //@Transactional assicura che o vengono eseguiti tutti i comandi nel metodo o nessuno, evitando db sporchi
    @Transactional
    public User addSkillToUser(Long userId, String skillName) {
        User user = getUserById(userId);

        //controlla se la skill esiste già nel DB
        Skill skill = skillRepository.findByNameIgnoreCase(skillName)
                .orElseGet(() -> {
                    //se non esiste ne facciamo una nuova
                    Skill newSkill = new Skill();
                    newSkill.setName(skillName.toUpperCase());
                    return skillRepository.save(newSkill);
                });

        //aggiunta la skill all'utente grazie all'incapsulamento JPA si aggiornerà automaticamente la tabella ponte user_skills
        user.getSkills().add(skill);
        return userRepository.save(user);
    }
}