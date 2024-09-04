import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface AuthResponse {
  jwt: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  email: string;
  password: string;
  fullName: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/customers'; 

  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  signUp(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, user).pipe(
      tap(response => this.tokenSubject.next(response.jwt)),
      catchError(this.handleError<AuthResponse>('signUp'))
    );
  }

  signIn(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signin`, loginRequest).pipe(
      tap(response => this.tokenSubject.next(response.jwt)),
      catchError(this.handleError<AuthResponse>('signIn'))
    );
  }

  logout(): void {
    this.tokenSubject.next(null);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log to console instead
      return of(result as T);
    };
  }
}
