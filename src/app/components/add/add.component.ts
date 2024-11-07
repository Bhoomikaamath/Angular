import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data/data.service';

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
    RouterLink,
    MatProgressSpinnerModule
  ],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  errorMessage: string = '';
  successMessage: string = '';
  model: { fullName: string; dob: string; gender: string; phoneNo: string; email: string;
  } = {
    fullName: '',
    dob: '',
    gender: '',
    phoneNo: '',
    email: ''
  };

  constructor(
    private dataService: DataService,
    private router:Router,
  ) {}

  isLoading = false;


//   onSubmit(form: NgForm): void {
//     this.errorMessage = ''; 
//     if (form.valid && this.isFormValid()) {
//       this.isLoading = true;
//         this.dataService.createCustomer(this.model).subscribe({
//             next: response => {
//                 console.log('Customer created:', response);
//                 this.isLoading = false;
//                 this.successMessage = 'Item added successfully!';
              
//                 setTimeout(() => {
//                   this.router.navigate(['/list']);
//                 }, 500);
//             },
         
//             error: error => {
//                 if (error.status === 409) { 
//                   this.isLoading = false;
//                     this.errorMessage = 'Email is already in use.';
//                 } else if (error.status === 500) { 
//                     this.errorMessage = 'An error occurred while processing your request. Please try again later.';
//                 } else {
//                     this.errorMessage = error.error?.message || 'An unexpected error occurred. Please try again.';
//                 }
//                 console.error('Error creating customer:', error);
//             }
//         });
//     } else {
//         this.errorMessage = 'Form is invalid. Please check your inputs.';
//         console.log('Form is invalid');
//     }
// }
onSubmit(form: NgForm) {
  if (form.valid) {
      this.isLoading = true;
      this.dataService.createCustomer(this.model).subscribe({
          next: (response) => {
              this.successMessage = 'Item added successfully!';
              this.isLoading = false; 
              this.router.navigate(['/list']);
          },
          error: (error) => {
              this.isLoading = false; 
              if (error.status === 409) {
                  this.errorMessage = 'Email is already in use.';
              } else if (error.status === 500) {
                  this.errorMessage = 'An error occurred while processing your request. Please try again later.';
              } else {
                  this.errorMessage = error.error.message || 'Unexpected error';
              }
          }
      });
  } else {
      this.errorMessage = 'Form is invalid. Please check your inputs.';
      this.isLoading = false;
  }
}



  goBack() {

    this.router.navigate(['/list']);
  }


  
  
  reset(form: NgForm): void {
    form.resetForm();
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = false;
  }

  isFormValid(): boolean {
    return !!this.model.fullName &&
           !!this.model.dob &&
           !!this.model.gender &&
           !!this.model.phoneNo &&
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
    return phonePattern.test(this.model.phoneNo);
  }

  isDobValid(): boolean {
    const dob = new Date(this.model.dob);
    return dob < new Date();
  }

  
}
