import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User, UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    
    spyOn(localStorage, 'getItem').and.returnValue('authToken');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch user profile', () => {
    const dummyUserProfile: User[] = [
      { username: 'johndoe', email: 'john@example.com', password: 'password123', fullName: 'John Doe' }
    ];

    service.getUserProfile().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users).toEqual(dummyUserProfile);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/get-profile');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer authToken');
    req.flush(dummyUserProfile);
  });

  it('should fetch role', () => {
    const dummyRole = { name: 'admin', permissions: ['read', 'write'] };
    const roleName = 'admin';

    service.getRole(roleName).subscribe(role => {
      expect(role).toEqual(dummyRole);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/roles?role=${roleName}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer authToken');
    req.flush(dummyRole);
  });

  it('should update user profile', () => {
    const updatedUser: User = { username: 'johndoe', email: 'john@example.com', password: 'newpassword', fullName: 'John Doe' };

    service.updateUserProfile(updatedUser).subscribe(user => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/update-profile');
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer authToken');
    req.flush(updatedUser);
  });

  it('should handle error when fetching user profile', () => {
    service.getUserProfile().subscribe(users => {
      expect(users.length).toBe(0); 
    });

    const req = httpMock.expectOne('http://localhost:8080/api/get-profile');
    req.flush('Error fetching profile', { status: 500, statusText: 'Server Error' });
  });

  it('should handle error when fetching role', () => {
    const roleName = 'admin';

    service.getRole(roleName).subscribe(role => {
      expect(role).toEqual([]);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/roles?role=${roleName}`);
    req.flush('Error fetching role', { status: 500, statusText: 'Server Error' });
  });

  it('should handle error when updating user profile', () => {
    const updatedUser: User = { username: 'johndoe', email: 'john@example.com', password: 'newpassword', fullName: 'John Doe' };

    service.updateUserProfile(updatedUser).subscribe(user => {
      expect(user).toEqual(updatedUser); 
    });

    const req = httpMock.expectOne('http://localhost:8080/api/update-profile');
    req.flush('Error updating profile', { status: 500, statusText: 'Server Error' });
  });
});
