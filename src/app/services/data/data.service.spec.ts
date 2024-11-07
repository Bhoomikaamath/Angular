import { HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DataService, Item, User } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  let authHeaders: HttpHeaders;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
    authHeaders = new HttpHeaders({
      Authorization: `Bearer authToken`
    });
    spyOn(localStorage, 'getItem').and.returnValue('authToken'); 
  });

  afterEach(() => {
    httpMock.verify();
  });

  // it('should fetch all customers', () => {
  //   const dummyCustomers: Item[] = [
  //     { id: 1, fullName: 'John Doe', dob: '1990-01-01', email: 'john@gmail.com', gender: 'male', phoneNo: '1234567890' },
  //     { id: 2, fullName: 'Jane Doe', dob: '1992-02-02', email: 'jane@gmail.com', gender: 'female', phoneNo: '0987654321' }
  //   ];

  //   service.getAllCustomers().subscribe(customers => {
  //     expect(customers.length).toBe(2);
  //     expect(customers).toEqual(dummyCustomers);
  //   });

  //   const req = httpMock.expectOne('http://localhost:8080/customers/getAllCustomers');
  //   expect(req.request.method).toBe('GET');
  //   expect(req.request.headers).toEqual(authHeaders);
  //   req.flush(dummyCustomers);
  // });

  it('should fetch customer by ID', () => {
    const dummyCustomer: Item = { id: 1, fullName: 'John Doe', dob: '1990-01-01', email: 'john@gmail.com', gender: 'male', phoneNo: '1234567890' };

    service.getCustomerById(1).subscribe(customer => {
      expect(customer).toEqual(dummyCustomer);
    });

    const req = httpMock.expectOne('http://localhost:8080/customers/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCustomer);
  });

  it('should create a new customer', () => {
    const newCustomer: Item = { fullName: 'Alice Smith', dob: '1988-08-08', email: 'alice@gmail.com', gender: 'female', phoneNo: '1231231234' };

    service.createCustomer(newCustomer).subscribe(customer => {
      expect(customer).toEqual(newCustomer);
    });

    const req = httpMock.expectOne('http://localhost:8080/customers/create');
    expect(req.request.method).toBe('POST');
    req.flush(newCustomer);
  });

  it('should update a customer', () => {
    const updatedCustomer: Item = { id: 1, fullName: 'John Doe', dob: '1990-01-01', email: 'john@gmail.com', gender: 'male', phoneNo: '1234567890' };

    service.updateCustomer(updatedCustomer).subscribe(customer => {
      expect(customer).toEqual(updatedCustomer);
    });

    const req = httpMock.expectOne('http://localhost:8080/customers/updateCustomers/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedCustomer);
  });

  it('should delete a customer', () => {
    service.deleteCustomer(1).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne('http://localhost:8080/customers/deleteCustomers/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should export customers to Excel', () => {
    const blob = new Blob([''], { type: 'application/vnd.ms-excel' });

    service.exportCustomersToExcel().subscribe(file => {
      expect(file).toEqual(blob);
    });

    const req = httpMock.expectOne('http://localhost:8080/customers/getAllCustomers/excel');
    expect(req.request.method).toBe('GET');
    req.flush(blob);
  });

  it('should fetch all users', () => {
    const dummyUsers: User[] = [
      { userId: 1, fullName: 'Admin', username: 'admin', email: 'admin@gmail.com', role: [{ roleId: 1, name: 'ROLE_ADMIN' }], active: true }
    ];

    service.getAllUser().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/allUsers');
    expect(req.request.method).toBe('GET');
    req.flush({ object: dummyUsers });
  });

  it('should log out user', () => {
    service.logOut().subscribe(response => {
      expect(response.status).toBe(200);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/auth/logout?token=authToken`);
    expect(req.request.method).toBe('POST');
    req.flush('Logged out', { status: 200, statusText: 'OK' });
  });
});
