import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    private apiUrl = 'http://localhost:8080/quiz';

    constructor(private http: HttpClient) { }

    getAllQuizzes(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    getQuizById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

}
