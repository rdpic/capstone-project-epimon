package it.epicode.epimon.dto;

import it.epicode.epimon.entity.RegisteredUser;
import lombok.Data;

@Data
public class AuthDataDto {

    private String accessToken;
    private RegisteredUser user;

}
