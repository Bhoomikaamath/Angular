import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout', 'isAdmin']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    authServiceSpy.token$ = of('mockToken');

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    localStorage.setItem('key', 'true');
    localStorage.setItem('role', 'admin');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.isLoggedIn).toBeTrue();

    component.ngOnInit();
    expect(authService.token$).toBeDefined();
  });

  it('should check if the user is an admin', () => {
    authService.isAdmin.and.returnValue(true);
    expect(component.checkIsAdmin()).toBeTrue();
  });

  it('should logout the user', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
    expect(localStorage.getItem('role')).toBeNull();
    expect(component.isLoggedIn).toBeFalse();
    expect(localStorage.getItem('key')).toBe('false');
    expect(router.navigate).toHaveBeenCalledWith(['/signin']);
  });

  it('should navigate to add route', () => {
    component.navigateToAdd();
    expect(router.navigate).toHaveBeenCalledWith(['/add']);
  });

  it('should navigate to profile', () => {
    component.viewProfile();
    expect(router.navigate).toHaveBeenCalledWith(['/profile']);
  });

  it('should navigate to all users', () => {
    component.allUsershow();
    expect(router.navigate).toHaveBeenCalledWith(['/allUsers']);
  });

  it('should navigate to home', () => {
    component.goHome();
    expect(router.navigate).toHaveBeenCalledWith(['/list']);
  });
});
