package it.epicode.epimon.dto;

import it.epicode.epimon.enums.UserRole;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegisteredUserDto {

    @NotNull
    private String username;

    @NotNull
    private String password;

    private UserRole userRole;

    public RegisteredUserDto(String username, String password) {
        this.username = username;
        this.password =  password;
        this.userRole = UserRole.USER;
    }

}
