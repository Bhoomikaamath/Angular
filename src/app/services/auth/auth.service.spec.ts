import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthResponse, AuthService, LoginRequest, User } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign up a user and set the token', () => {
    const mockUser: User = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
      fullName: 'Test User'
    };
    const mockResponse: AuthResponse = {
      jwtToken: 'mockJwtToken',
      username: 'testuser',
      errorMessage: '',
      role: 'ROLE_USER'
    };

    service.signUp(mockUser).subscribe(response => {
      expect(response.jwtToken).toEqual('mockJwtToken');
      expect(localStorage.getItem('authToken')).toEqual('mockJwtToken');
    });

    const req = httpMock.expectOne((request) => request.method === 'POST' && request.url.includes('/users'));
    req.flush(mockResponse);
  });

  it('should sign in a user and set the token and role', () => {
    const loginRequest: LoginRequest = {
      username: 'testuser',
      password: 'password'
    };
    const mockResponse: AuthResponse = {
      jwtToken: 'mockJwtToken',
      username: 'testuser',
      errorMessage: '',
      role: 'ROLE_USER'
    };

    service.signIn(loginRequest).subscribe(response => {
      expect(response.jwtToken).toEqual('mockJwtToken');
      expect(localStorage.getItem('authToken')).toEqual('mockJwtToken');
      expect(localStorage.getItem('role')).toEqual('ROLE_USER');
    });

    const req = httpMock.expectOne((request) => request.method === 'POST' && request.url.includes('/auth/login'));
    req.flush(mockResponse);
  });

  it('should fetch all users', () => {
    const mockUsers: User[] = [
      { username: 'user1', email: 'user1@example.com', password: 'pass1', fullName: 'User One' },
      { username: 'user2', email: 'user2@example.com', password: 'pass2', fullName: 'User Two' }
    ];

    service.getAllUser().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne((request) => request.method === 'GET' && request.url.includes('/users'));
    req.flush(mockUsers);
  });

  // it('should log out the user', () => {
  //   service.logout();

  //   const token = localStorage.getItem('authToken');
  //   const role = localStorage.getItem('role');

  //   expect(token).toBeNull();
  //   expect(role).toBeNull();
  //   expect(service.token$).toBeNull(); 
  // });

  it('should determine if the user is an admin', () => {
    localStorage.setItem('role', '[ROLE_ADMIN]');

    expect(service.isAdmin()).toBeTrue();
    expect(service.isUser()).toBeFalse();
  });

  it('should determine if the user is a regular user', () => {
    localStorage.setItem('role', 'ROLE_USER');

    expect(service.isUser()).toBeTrue();
    expect(service.isAdmin()).toBeFalse();
  });
});
