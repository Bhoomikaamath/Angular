import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    RouterLink
  ],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  errorMessage: string = '';
  model: { fullName: string; dob: string; gender: string; phone: string; email: string } = {
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    email: ''
  };

  constructor(
    private dataService: DataService,
    private router:Router
  ) {}

  onSubmit(): void {
   
    if (this.model.fullName && this.model.dob && this.model.gender && this.model.phone && this.isEmailValid()) {
      this.dataService.createCustomer(this.model).subscribe({
        next: response => {
          console.log('Customer created:', response);
          this.router.navigate(['/list']);
        },
        error: error => {
          if (error.status === 409) { 
            this.errorMessage = 'An unexpected error occurred. Please try again.';

          }else {
            this.errorMessage = 'Email is already registered.';

          }
          console.error('Error creating customer:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
  
  reset(form: NgForm): void {
    form.resetForm();
    this.errorMessage = '';
  }

  isFormValid(): boolean {
    return !!this.model.fullName &&
           !!this.model.dob &&
           !!this.model.gender &&
           !!this.model.phone &&
           this.isPhoneNumberValid() &&
           this.isDobValid() &&
           this.isEmailValid();
  }

  isEmailValid(): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(this.model.email);
  }

  isPhoneNumberValid(): boolean {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(this.model.phone);
  }

  isDobValid(): boolean {
    const dob = new Date(this.model.dob);
    return dob < new Date();
  }
}
