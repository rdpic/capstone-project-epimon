package it.epicode.epimon.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegisteredUserLoginDto {

    @NotNull
    private String username;

    @NotNull
    private String password;

    public RegisteredUserLoginDto(String username, String password) {
        this.username = username;
        this.password = password;
    }

}
