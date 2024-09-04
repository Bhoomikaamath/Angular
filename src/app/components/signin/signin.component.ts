import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ListComponent
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'] 
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signin(): void {
    if (this.signinForm.valid) {
      const loginRequest: LoginRequest = this.signinForm.value;
      this.authService.signIn(loginRequest).subscribe(response=>
      {
        console.log('Sign In Successful:', response);
        
          this.router.navigate(['/list']);
      }
      )
      //   error => {
      //     console.error('Sign In Failed:', error);
      //     this.errorMessage = 'Sign in failed. Please check your credentials and try again.';  // Error message to display
      //   }
      // );
    } else {
      this.errorMessage = 'Please fill out the form correctly.'; // Error message for invalid form
    }
  }

  reset(): void {
    this.signinForm.reset();
    this.errorMessage = ''; // Clear error message on form reset
  }

}

// Interface can be placed in a separate file if needed
export interface LoginRequest {
  email: string;
  password: string;
}
