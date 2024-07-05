package it.epicode.epimon.controller;

import it.epicode.epimon.dto.AuthDataDto;
import it.epicode.epimon.dto.RegisteredUserDto;
import it.epicode.epimon.dto.RegisteredUserLoginDto;
import it.epicode.epimon.dto.SignupDto;
import it.epicode.epimon.exception.BadRequestException;
import it.epicode.epimon.service.AuthService;
import it.epicode.epimon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping("/auth/signup")
    public SignupDto signup(@RequestBody @Validated RegisteredUserDto userDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new BadRequestException(bindingResult.getAllErrors().stream().map(objectError -> objectError.getDefaultMessage()).
                    reduce("", (s, s2) -> s + s2));
        }

        return userService.saveUser(userDto);
    }

    @PostMapping("/auth/login")
    public AuthDataDto login(@RequestBody @Validated RegisteredUserLoginDto userLoginDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new BadRequestException(bindingResult.getAllErrors().stream().map(objectError -> objectError.getDefaultMessage()).
                    reduce("", (s, s2) -> s + s2));
        }

        return authService.authenticateUserAndGenerateToken(userLoginDto);

    }

}
