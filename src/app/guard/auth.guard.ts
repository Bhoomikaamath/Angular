import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const loggedIn = localStorage.getItem('key') === 'true';

    if (loggedIn) {
      return true; 
    } else {
      console.log("not user")
      this.router.navigate(['/signin']); 
      return false; 
    }
  }
}
