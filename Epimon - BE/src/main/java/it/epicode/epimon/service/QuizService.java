package it.epicode.epimon.service;

import it.epicode.epimon.dto.QuizDto;
import it.epicode.epimon.entity.Quiz;
import it.epicode.epimon.exception.BadRequestException;
import it.epicode.epimon.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Optional<Quiz> getQuizById(Integer id) {
        return quizRepository.findById(id);
    }

    public Optional<Quiz> getQuizByAnswer(String answer) {
        return quizRepository.findByAnswer(answer);
    }

    public String saveQuiz(QuizDto quizDto) {
        if (getQuizByAnswer(quizDto.getAnswer()).isEmpty()) {
            Quiz quiz = new Quiz();
            quiz.setQuestion(quizDto.getQuestion());
            quiz.setAnswer(quizDto.getAnswer());
            quiz.setHint(quizDto.getHint());

            quizRepository.save(quiz);

            return "Quiz with ID " + quiz.getId() + " successfully added to the database.";
        } else {
            throw new BadRequestException("This quiz already exists in the database.");
        }
    }

    public String updateQuiz(Integer id, QuizDto quizDto) {
        Optional<Quiz> quizOptional = quizRepository.findById(id);

        if (quizOptional.isPresent()) {
            Quiz quiz = quizOptional.get();
            quiz.setQuestion(quizDto.getQuestion());
            quiz.setAnswer(quizDto.getAnswer());
            quiz.setHint(quizDto.getHint());

            quizRepository.save(quiz);

            return "Quiz with ID " + id + " successfully updated in the database.";
        } else {
            throw new BadRequestException("Quiz with ID " + id + " not found.");
        }
    }

    public void deleteQuiz(Integer id) {
        quizRepository.deleteById(id);
    }

}
