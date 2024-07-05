package it.epicode.epimon.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class QuizDto {

    @NotNull
    private String question;

    @NotNull
    private String answer;

    @NotNull
    private String hint;

}
