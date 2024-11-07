import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Item } from '../../services/data/data.service';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,  
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatDialogModule,
    CommonModule,
    FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  errorMessage: string | null = null;  
  form: FormGroup;
  itemId: number | null = null;

  constructor(
    private route: ActivatedRoute, // ActivatedRoute to get ID from URL
    private router: Router, // Router to navigate after saving

    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.form = this.fb.group({
      id: [null],
      fullName: [''],
      dob: [''],
      email: [''],
      gender: [''],
      phoneNo: ['']
    });
  }

  ngOnInit(): void {
    this.itemId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.itemId) {
      this.loadCustomerData();
    }
  }

  loadCustomerData(): void {
    this.dataService.getCustomerById(this.itemId!).subscribe({
      next: (data: Item) => {
        this.form.patchValue(data); 
      },
      error: (error) => {
        console.error('Error loading customer data:', error);
      }
    });
  }

  onSave(): void {
    if (this.form.valid && this.isFormValid()) {
      const item: Item = this.form.value;
      this.dataService.updateCustomer(item).subscribe({
        next: (response) => {
          console.log("Customer updated successfully:", response);
          this.router.navigate(['/list']); 
        },
        error: (error) => {
          console.error("Error updating customer:", error);
          this.errorMessage = 'You do not have the rights to change it or an error occurred.';
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  

  onCancel(): void {
    this.router.navigate(['/list']); 
  }


  isFormValid(): boolean {
    return !!this.form.value.fullName &&
           !!this.form.value.dob &&
           !!this.form.value.gender &&
           !!this.form.value.phoneNo &&
           this.isPhoneNumberValid() &&
           this.isDobValid() &&
           this.isEmailValid();
  }

  isEmailValid(): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(this.form.value.email);
  }

  isPhoneNumberValid(): boolean {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(this.form.value.phoneNo);
  }

//   isDobValid(): boolean {
//     const dob = new Date(this.form.value.dob);
//     console.log('DOB:', dob, 'Current Date:', new Date());
//     return dob < new Date();
// }

isDobValid(): boolean {
  const dob = new Date(this.form.value.dob);
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  return dob < today;
}

}
