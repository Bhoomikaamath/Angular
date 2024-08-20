import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Import MatDialog
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddComponent } from '../add/add.component'; // Import the AddComponent
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatDialogModule // Import MatDialogModule here
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'dob', 'gender', 'edit', 'delete'];
  dataSource = ELEMENT_DATA;

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}

  navigateToAddItem(): void {
    this.router.navigate(['/add-item']);
  }

  editItem(element: any): void {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '300px',
      data: { ...element } // Pass the data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the data source with the edited values
        const index = this.dataSource.findIndex(item => item.position === result.position);
        if (index > -1) {
          this.dataSource[index] = result;
        }
      }
    });
  }

  deleteItem(element: any): void {
    this.dataSource = this.dataSource.filter(item => item.position !== element.position);
  }
  handleOpenCreateAddItemForm(): void {
    this.dialog.open(AddComponent); // Use MatDialog to open a dialog
  }
}

const ELEMENT_DATA: any[] = [
  { position: 1, name: 'John Doe', dob: '1990-01-01', gender: 'Male' },
  { position: 2, name: 'Jane Smith', dob: '1992-05-15', gender: 'Female' }
];
