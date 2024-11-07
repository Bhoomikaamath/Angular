import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string | null = null;


  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
    ) {
    this.signupForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        fullName: ['', Validators.required],
        username: ['', Validators.required]
    });
    }


  register() {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      this.authService.signUp(userData).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/signin']);
        },
        error => {
          console.error('An error occurred:', error);
          this.errorMessage = 'An error occurred during signup. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }

  onButtonClick() {
    this.router.navigate(['/signup']);
  }
  // reset() {
  //   this.signupForm.reset();
  // }

  reset() {
    console.log('Before reset:', this.signupForm.value);
    this.signupForm.reset();
    console.log('After reset:', this.signupForm.value);
}

}
