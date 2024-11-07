import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    ListComponent
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup;
  errorMessage: string = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    localStorage.removeItem("key");
    this.signinForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // signin(): void {
  //   this.isLoading = true;
  //   this.errorMessage = '';
  
  //   if (this.signinForm.valid) {
  //     const loginRequest: LoginRequest = this.signinForm.value;
  
  //     this.authService.signIn(loginRequest).pipe(
  //       catchError(err => {
  //         console.error('Sign In Error:', err);
  //         this.isLoading = false; // Set loading to false on error
  //         this.errorMessage = 'Invalid credentials. Please try again.';
  //         return of(null); // Return null to complete the observable
  //       })
  //     ).subscribe(response => {
  //       this.isLoading = false; // Ensure loading is false after response
  
  //       if (response) {
  //         console.log('Sign In Successful:', response);
  //         // Navigate after a slight delay (if needed)
  //         setTimeout(() => {
  //           this.router.navigate(['/list']);
  //         }, 500);
  //       } else {
  //         this.errorMessage = 'Invalid credentials. Please try again.';
  //       }
  //     });
  //   } else {
  //     this.isLoading = false; // Ensure loading is false if form is invalid
  //     this.errorMessage = 'Please fill out the form correctly.';
  //   }
  // }
  

  // reset(): void {
  //   this.signinForm.reset();
  //   this.errorMessage = '';
  // }  

  signin() {
    if (this.signinForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }
  
    this.isLoading = true;
    const { username, password } = this.signinForm.value;
  
    this.authService.signIn({ username, password }).subscribe({
      next: (response) => {
        if (response.jwtToken) {
          this.isLoading = false;
          this.router.navigate(['/list']);
        } else {
          this.isLoading = false;
          this.errorMessage = response.errorMessage || 'Invalid credentials. Please try again.';
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    });
  }
  
  // reset() {
  //   this.signinForm.reset();
  //   this.errorMessage = '';
  // }
  
  reset() {
    this.signinForm.reset({
      username: '',
      password: ''
    });
    this.errorMessage = '';
  }
  
}

export interface LoginRequest {
  username: string;
  password: string;
}
