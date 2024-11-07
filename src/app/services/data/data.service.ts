import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface Item {
  id?: number;
  fullName: string;
  dob: string;
  email: string;
  gender: string;
  phoneNo: string;
}
export interface Role {
  roleId: number;
  name: string;
}

export interface User {
  userId: number;
  fullName: string;
  username: string;
  email: string;
  role: Role[];
  active:boolean;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:8080/customers';
  private userUrl='http://localhost:8080/api';
  private apiUrl ='http://localhost:8080/api/auth/logout';
  
    constructor(private http: HttpClient) {}

  private getAuthHeaders():HttpHeaders{
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("authToken")}`
    })
  }

  logOut(): Observable<HttpResponse<string>> {
    const url = `${this.apiUrl}?token=${localStorage.getItem("authToken")}`;
    return this.http.post<string>(url, {}, { 
      headers: this.getAuthHeaders(),
      observe: 'response' 
      
    });
  }


  getAllCustomers(): Observable<Item[]> {
    console.log('Fetching all customers...');
    return this.http.get<Item[]>(`${this.baseUrl}/getAllCustomers`, { headers: this.getAuthHeaders() }).pipe(
      tap(response => console.log('Received response:', response)),
      catchError(this.handleError<Item[]>('getAllCustomers', []))
    );
  }

  getCustomerById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError<Item>('getCustomerById'))
    );
  }

  createCustomer(customer: Item): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}/create`, customer, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError<Item>('createCustomer'))
    );
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<any>(`${this.userUrl}/allUsers`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.object || []),
      catchError(this.handleError('getAllUser', []))
    );
  }


  updateCustomer(customer: Item): Observable<Item> {
    if (!customer.id) {
      throw new Error('Customer ID is required for update');
    }
    return this.http.put<Item>(`${this.baseUrl}/updateCustomers/${customer.id}`, customer, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError<Item>('updateCustomer'))
    );
  }
  
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  deleteCustomer(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/deleteCustomers/${id}`, { headers: this.getAuthHeaders() }).pipe(
    catchError(this.handleError<any>('deleteCustomer'))
  );
}

exportCustomersToExcel(): Observable<Blob> {
  return this.http.get<Blob>(`${this.baseUrl}/getAllCustomers/excel`, {
    headers: this.getAuthHeaders(),
    responseType: 'blob' as 'json'
  });
}

getUserById(id: number): Observable<any> {
  return this.http.get<User>(`${this.userUrl}/users/${id}`, { headers: this.getAuthHeaders() }).pipe(
    catchError(this.handleError<User>('getCustomerById'))
  );
}

updateUserProfile(user: User): Observable<User> {
  console.log('${this.apiUrl1}/update-profile/${user.userId}')
  return this.http.put<User>(`${this.userUrl}/update-profile/${user.userId}`, user, { headers: this.getAuthHeaders() }).pipe(
    catchError(this.handleError<User>('updateUserProfile', user))
  );
}

searchCustomersByFullName(fullName: string): Observable<Item[]> {
  return this.http.get<Item[]>(`${this.baseUrl}/searchByFullName/${fullName}`, { headers: this.getAuthHeaders() }).pipe(
    tap(response => console.log('Search results:', response)),
    catchError(this.handleError<Item[]>('searchCustomersByFullName', []))
  );
}


deleteCustomers(ids: number[]): Observable<any> {
  return this.http.delete(`${this.baseUrl}/deleteCustomers`, {
    headers: this.getAuthHeaders(),
    body: ids
  }).pipe(
    catchError(this.handleError<any>('deleteCustomers'))
  );
}

}
