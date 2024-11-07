import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { SigninComponent } from './signin.component';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['signIn']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SigninComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.signinForm).toBeDefined();
    expect(component.signinForm.controls['username'].value).toBe('');
    expect(component.signinForm.controls['password'].value).toBe('');
  });

  it('should set error message when form is invalid', () => {
    component.signinForm.controls['username'].setValue('');
    component.signinForm.controls['password'].setValue('');
    component.signin();
    expect(component.errorMessage).toBe('Please fill out the form correctly.');
  });

  it('should call signIn and navigate on successful login', () => {
    component.signinForm.setValue({ username: 'test', password: '123456' });
    mockAuthService.signIn.and.returnValue(of({ jwtToken: 'fake-token', username: 'test', role: 'ROLE_USER' }));

    component.signin();

    expect(mockAuthService.signIn).toHaveBeenCalledWith({ username: 'test', password: '123456' });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('should set error message on unsuccessful login', () => {
    component.signinForm.setValue({ username: 'test', password: '123456' });
    mockAuthService.signIn.and.returnValue(of({ jwtToken: '', errorMessage: 'Invalid credentials', username: 'test', role: 'ROLE_USER' }));

    component.signin();

    expect(component.errorMessage).toBe('Invalid credentials');
  });

  it('should handle HTTP error response', () => {
    component.signinForm.setValue({ username: 'test', password: '123456' });
    mockAuthService.signIn.and.returnValue(throwError(() => new Error('Network error')));

    component.signin();

    expect(component.errorMessage).toBe('Invalid credentials. Please try again.');
  });

  it('should reset the form and error message on reset()', () => {
    component.signinForm.setValue({ username: 'test', password: '123456' });
    component.errorMessage = 'Some error';
    
    component.reset();

    expect(component.signinForm.value).toEqual({ username: '', password: '' });
    expect(component.errorMessage).toBe('');
  });
});
