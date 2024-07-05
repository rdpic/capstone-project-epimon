package it.epicode.epimon.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "quizzes")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String question;
    private String answer;
    private String hint;

}
