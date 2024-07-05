package it.epicode.epimon.service;

import it.epicode.epimon.dto.RegisteredUserDto;
import it.epicode.epimon.dto.SignupDto;
import it.epicode.epimon.entity.RegisteredUser;
import it.epicode.epimon.exception.BadRequestException;
import it.epicode.epimon.repository.RegisteredUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private RegisteredUserRepository registeredUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<RegisteredUser> getAllUsers() {
        return registeredUserRepository.findAll();
    }

    public Optional<RegisteredUser> getUserByUsername(String username) {
        return registeredUserRepository.findByUsername(username);
    }

    public Optional<RegisteredUser> getUserById(Integer id) {
        return registeredUserRepository.findById(id);
    }

    public SignupDto saveUser(RegisteredUserDto userDto) {
        if (getUserByUsername(userDto.getUsername()).isEmpty()) {
            RegisteredUser registeredUser = new RegisteredUser();
            registeredUser.setUsername(userDto.getUsername());
            registeredUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
            registeredUser.setUserRole(userDto.getUserRole());
            registeredUserRepository.save(registeredUser);

            SignupDto signupDto = new SignupDto();
            signupDto.setRegisteredUser(registeredUser);

            return signupDto;
        } else {
            throw new BadRequestException("The username is already taken.");
        }
    }

    public void deleteUserById(Integer id) {
        registeredUserRepository.deleteById(id);
    }

}
