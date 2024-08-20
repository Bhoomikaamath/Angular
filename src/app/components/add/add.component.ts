import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [MatRadioModule,FormsModule,CommonModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatRadioModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  
  model = {
    fullname: '',
    dob: '',
    gender: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit() {
    if (this.model.fullname && this.model.dob && this.model.gender) {
      console.log('Form Data:', this.model);
      this.dialogRef.close(this.model); // Close the dialog and pass the data
    } else {
      console.log('Form is invalid');
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog
  }
}