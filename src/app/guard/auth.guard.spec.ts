
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { AuthGuard } from './auth.guard';

class MockAuthService {
  isLoggedIn(): boolean {
    return localStorage.getItem('key') === 'true';
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router) as unknown as MockRouter;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should allow access if logged in', () => {
    localStorage.setItem('key', 'true');

    const result = guard.canActivate();

    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should deny access and navigate to sign-in if not logged in', () => {
    localStorage.setItem('key', 'false');

    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/signin']);
  });

  it('should deny access and navigate to sign-in if key is missing', () => {
    localStorage.removeItem('key');

    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/signin']);
  });
});
