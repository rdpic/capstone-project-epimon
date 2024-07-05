import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:8080/auth';

    constructor(private http: HttpClient) { }

    register(username: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, { username, password });
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
            tap((response: any) => {
                localStorage.setItem('token', response.accessToken);
                console.log(response);
            })
        );
    }

    logout() {
        localStorage.removeItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

}
