import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { DataService, Item } from '../../services/data.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,  // Import ReactiveFormsModule for reactive forms
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatDialogModule,
  CommonModule,
FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item | null,
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.form = this.fb.group({
      id: [data ? data.id : null],
      name: [data ? data.fullName : ''],
      dob: [data ? data.dob : ''],
      gender: [data ? data.gender : ''],
      phone:[data ? data.phone:'']
    });
  }

  onSave(): void {
    const item: Item = this.form.value;
   
      this.dataService.updateItem(item).subscribe(response=>{
        console.log(response)
      });
      
    
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}