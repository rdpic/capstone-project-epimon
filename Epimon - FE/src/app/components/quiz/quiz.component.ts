import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
    currentClue: string = '';
    userGuess: string = '';
    correctAnswer: string = '';
    message: string = '';
    hint: string = '';
    quizCompleted: boolean = false;
    quizzes: any[] = [];
    incorrectAttempts: number = 0;
    maxAttempts: number = 3;
    remainingAttempts: number = this.maxAttempts;
    pokemonImage: string = '';

    constructor(private quizService: QuizService, private pokemonService: PokemonService) { }

    ngOnInit(): void {
        this.startNewQuiz();
    }

    startNewQuiz(): void {
        this.quizCompleted = false;
        this.message = '';
        this.userGuess = '';
        this.incorrectAttempts = 0;
        this.remainingAttempts = this.maxAttempts;
        this.fetchQuizzes();
    }

    fetchQuizzes(): void {
        this.quizService.getAllQuizzes().subscribe((data: any[]) => {
            this.quizzes = data;
            this.selectRandomQuiz();
        });
    }

    selectRandomQuiz(): void {
        const randomIndex = Math.floor(Math.random() * this.quizzes.length);
        const selectedQuiz = this.quizzes[randomIndex];
        this.currentClue = selectedQuiz.question;
        this.correctAnswer = selectedQuiz.answer;
        this.hint = selectedQuiz.hint;
    }

    submitGuess(): void {
        if (this.userGuess.toLowerCase() === this.correctAnswer.toLowerCase()) {
            this.quizCompleted = true;
            this.message = 'Congratulations! You guessed the Pokémon correctly!';
            this.fetchPokemonImage();
        } else {
            this.incorrectAttempts++;
            this.remainingAttempts = this.maxAttempts - this.incorrectAttempts;
            if (this.incorrectAttempts === 1) {
                this.message = 'Incorrect! Try again.';
            } else if (this.incorrectAttempts === 2) {
                this.message = `Incorrect! Here's a hint: ${this.hint}`;
            } else if (this.incorrectAttempts >= 3) {
                this.quizCompleted = true;
                this.message = `You've lost! The correct answer was ${this.capitalize(this.correctAnswer)}.`;
                this.fetchPokemonImage();
            }
        }
    }

    fetchPokemonImage(): void {
        this.pokemonService.getPokemonDetails(this.correctAnswer).subscribe(data => {
            this.pokemonImage = data.sprites.front_default;
        });
    }

    handleKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.submitGuess();
        }
    }

    capitalize(word: string): string {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
}