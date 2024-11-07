import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { ProfileComponent, User } from './profile.component';

class MockUserService {
  getUserProfile() {
    return of({ object: {username: 'testuser', email: 'test@example.com', password: 'password', fullName: 'Test User' } });
  } 
  
  updateUserProfile(user: User) {
    return of(user);
  }
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockUserService: MockUserService;
  let router: Router;

  beforeEach(async () => {
    mockUserService = new MockUserService();

    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user profile on init', () => {
    component.ngOnInit();
    expect(component.userProfile).toBeDefined();
    expect(component.userProfile.data.username).toEqual('testuser');
  });

  it('should toggle edit mode', () => {
    expect(component.isEditing).toBeFalse();
    component.toggleEdit();
    expect(component.isEditing).toBeTrue();
    component.toggleEdit();
    expect(component.isEditing).toBeFalse();
  });

  it('should update profile successfully', () => {
    component.userProfile = { data: { username: 'testuser', email: 'test@example.com', password: 'password', fullName: 'Test User' } };
    
    component.updateProfile();

    expect(component.userProfile.data.username).toEqual('testuser');
    expect(component.isEditing).toBeFalse();
  });

  it('should handle error during profile update', () => {
    spyOn(mockUserService, 'updateUserProfile').and.returnValue(throwError('Update error'));
    component.userProfile = { data: { username: 'testuser', email: 'test@example.com', password: 'password', fullName: 'Test User' } };
    
    component.updateProfile();

    expect(component.errorMessage).toBe('Failed to update profile. Please try again later.');
  });

  it('should navigate back to the list', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('should handle error when fetching profile', () => {
    spyOn(mockUserService, 'getUserProfile').and.returnValue(throwError('Fetch error'));

    component.getUserProfile();

    expect(component.errorMessage).toBe('Failed to load profile. Please try again later.');
  });
});
