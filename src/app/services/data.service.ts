import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Item {
  id?: number;
  fullName: string;
  dob: string;
  gender: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:8080/customers'; 

  private items: Item[] = [];
  private itemsSubject = new BehaviorSubject<Item[]>(this.items);
  
  items$ = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<Item[]>) => {
        const statusCode = response.status;
        console.log('Status Code:', statusCode);
        console.log('Response Body:', response.body);

        const customers = response.body || []; 
        this.items = customers; 
        this.itemsSubject.next(this.items); 
        return customers;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching customers:', error);
        return of([]); 
      })
    );
  }

  // getCustomerById(id: number): Observable<Item> {
  //   return this.http.get<Item>(`${this.baseUrl}/${id}`, { observe: 'response' }).pipe(
  //     map((response: HttpResponse<Item>) => {
  //       const statusCode = response.status;
  //       console.log('Status Code:', statusCode);
  //       console.log('Response Body:', response.body);

  //       return response.body || {}; // Return the customer object or empty
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       console.error(`Error fetching customer with id ${id}:`, error);
  //       return throwError(() => new Error('Customer not found')); // Return an error
  //     })
  //   );
  // }

  createCustomer(customer: Item): Observable<Item> {
    return this.http.post<Item>(this.baseUrl, customer, { observe: 'response' }).pipe(
      map((response: HttpResponse<Item>) => {
        const statusCode = response.status;
        console.log('Status Code:', statusCode);
        console.log('Response Body:', response.body);

        const newCustomer = response.body as Item;
        this.addItem(newCustomer); 
        return newCustomer;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error creating customer:', error);
        return throwError(() => new Error('Creation failed')); 
      })
    );
  }

  updateItem(item: Item): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${item.id}`, item);
  }


  updateCustomer(id: number, customer: Item): Observable<Item> {
    return this.http.put<Item>(`${this.baseUrl}/${id}`, customer, { observe: 'response' }).pipe(
      map((response: HttpResponse<Item>) => {
        const statusCode = response.status;
        console.log('Status Code:', statusCode);
        console.log('Response Body:', response.body);

        const updatedCustomer = response.body as Item;
        this.updateItem(updatedCustomer); 
        return updatedCustomer;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(`Error updating customer with id ${id}:`, error);
        return throwError(() => new Error('Update failed')); 
      })
    );
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { observe: 'response' }).pipe(
      map((response: HttpResponse<void>) => {
        const statusCode = response.status;
        console.log('Status Code:', statusCode);

        this.removeItem(id); 
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(`Error deleting customer with id ${id}:`, error);
        return throwError(() => new Error('Deletion failed')); 
      })
    );
  }

  addItem(item: Item): void {
    this.items.push(item);
    this.itemsSubject.next(this.items);
  }

  // updateItem(updatedItem: Item): void {
  //   const index = this.items.findIndex(item => item.id === updatedItem.id);
  //   if (index !== -1) {
  //     this.items[index] = updatedItem;
  //     this.itemsSubject.next(this.items);
  //   }
  // }

  removeItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.itemsSubject.next(this.items);
  }
}
