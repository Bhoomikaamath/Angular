import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface AuthResponse {
  jwtToken: string;
  username: string;
  errorMessage?: string;
  role:string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  public token$ = this.tokenSubject.asObservable();

  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  signUp(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/users`, user).pipe(
      tap(response => {
        if (response.jwtToken) {
          console.log(response.jwtToken)
          this.setToken(response.jwtToken);
        }
      }),
      catchError(this.handleError<AuthResponse>('signUp'))
    );
  }

  signIn(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, loginRequest).pipe(
      tap(response => {
        if (response.jwtToken) {
          console.log(response.jwtToken)
          this.setToken(response.jwtToken);
          localStorage.setItem('role', response.role);
          console.log('Current role:',  response.role);
        }
      }),
      catchError(this.handleError<AuthResponse>('signIn'))
    );
  }
  

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      catchError(this.handleError<User[]>('getAllUser', []))
    );
  }

  
  logout(): void {
    this.clearToken();
    this.tokenSubject.next(null);
  }


  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem("key","true");
    this.tokenSubject.next(token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    const isAdmin = role === '[ROLE_ADMIN]';
    return isAdmin;
  }
  
  
  isUser():boolean{
      const role=localStorage.getItem('role')
      return role==='ROLE_USER'
   
  }


  
}


