import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

export interface User {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = 'http://localhost:8080/api';

  private roleUrl="http://localhost:8080/api/roles"

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<User[]> {
    console.log("Fetching user profile...");

    return this.http.get<User[]>(`${this.apiUrl}/get-profile`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError<User[]>('getUserProfile', []))
    );
  }

  getRole(role: string): Observable<any> {
    console.log(`${this.roleUrl}?role=${role}`)
    return this.http.get<any>(`${this.roleUrl}?role=${role}`, { headers: this.getAuthHeaders() }).pipe(
        catchError(this.handleError<any[]>('getRole', []))
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("authToken");
    console.log("Auth Token:", token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
  
  updateUserProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update-profile`, user, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError<User>('updateUserProfile', user))
    );
  }
 
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
