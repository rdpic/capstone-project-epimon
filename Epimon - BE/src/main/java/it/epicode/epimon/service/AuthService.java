package it.epicode.epimon.service;

import it.epicode.epimon.dto.AuthDataDto;
import it.epicode.epimon.dto.RegisteredUserLoginDto;
import it.epicode.epimon.entity.RegisteredUser;
import it.epicode.epimon.exception.NotFoundException;
import it.epicode.epimon.exception.UnauthorizedException;
import it.epicode.epimon.security.JwtTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTool jwtTool;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthDataDto authenticateUserAndGenerateToken(RegisteredUserLoginDto userLoginDto) {
        Optional<RegisteredUser> userOptional = userService.getUserByUsername(userLoginDto.getUsername());

        if (userOptional.isPresent()) {
            RegisteredUser registeredUser = userOptional.get();
            if (passwordEncoder.matches(userLoginDto.getPassword(), registeredUser.getPassword())) {
                AuthDataDto authDataDto = new AuthDataDto();
                authDataDto.setAccessToken(jwtTool.createToken(registeredUser));
                authDataDto.setUser(registeredUser);
                return authDataDto;
            } else {
                throw new UnauthorizedException("Error during login, please try again.");
            }

        } else {
            throw new NotFoundException("The username " + userLoginDto.getUsername() + "doesn't exist.");
        }
    }

}
