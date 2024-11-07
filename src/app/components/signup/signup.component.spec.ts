import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthResponse, AuthService } from '../../services/auth/auth.service';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['signUp']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SignupComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on construction', () => {
    expect(component.signupForm).toBeDefined();
    expect(component.signupForm.controls['email'].value).toBe('');
    expect(component.signupForm.controls['password'].value).toBe('');
    expect(component.signupForm.controls['fullName'].value).toBe('');
    expect(component.signupForm.controls['username'].value).toBe('');
  });

  it('should set error message when form is invalid during registration', () => {
    component.signupForm.controls['email'].setValue('');
    component.signupForm.controls['password'].setValue('');
    component.signupForm.controls['fullName'].setValue('');
    component.signupForm.controls['username'].setValue('');
    
    component.register();

    expect(component.errorMessage).toBe('Please fill out the form correctly.');
  });

  it('should call signUp and navigate on successful registration', () => {
    component.signupForm.setValue({
        email: 'test@example.com',
        password: '123456',
        fullName: 'Test User',
        username: 'testuser'
    });

    const mockAuthResponse: AuthResponse = {
        jwtToken: 'fake-jwt-token',
        username: 'testuser',
        errorMessage: '',
        role: 'ROLE_USER' 
    };

    mockAuthService.signUp.and.returnValue(of(mockAuthResponse));

    component.register();

    expect(mockAuthService.signUp).toHaveBeenCalledWith(component.signupForm.value);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/signin']);
});


  it('should set error message on unsuccessful registration', () => {
    component.signupForm.setValue({
      email: 'test@example.com',
      password: '123456',
      fullName: 'Test User',
      username: 'testuser'
    });
    mockAuthService.signUp.and.returnValue(throwError(() => new Error('Signup error')));

    component.register();

    expect(mockAuthService.signUp).toHaveBeenCalledWith(component.signupForm.value);
    expect(component.errorMessage).toBe('An error occurred during signup. Please try again.');
  });

  // it('should reset the form and log the values before and after reset', () => {
  //   component.signupForm.setValue({
  //     email: 'test@example.com',
  //     password: '123456',
  //     fullName: 'Test User',
  //     username: 'testuser'
  //   });

  //   spyOn(console, 'log'); // Spy on console.log

  //   component.reset();

  //   expect(console.log).toHaveBeenCalledWith('Before reset:', component.signupForm.value);
  //   expect(component.signupForm.value).toEqual({
  //     email: '',
  //     password: '',
  //     fullName: '',
  //     username: ''
  //   });
  //   expect(console.log).toHaveBeenCalledWith('After reset:', component.signupForm.value);
  // });
});
