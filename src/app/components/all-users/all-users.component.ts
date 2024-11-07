import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { DataService, User } from '../../services/data/data.service';
import { AddComponent } from '../add/add.component';
import { ExportExcelComponent } from '../export-excel/export-excel.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    RouterLink,
    MatPaginatorModule,
    AddComponent,
    CommonModule,
    ExportExcelComponent
  ],
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent {
  displayedColumns: string[] = ['userId', 'fullName', 'username', 'email', 'role', 'active', 'edit'];
  dataSource = new MatTableDataSource<User>();
  isLoading = true;

  constructor(private dataService: DataService, private router:Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getAllUser().subscribe({
      next: (response: User[]) => {
        if (response && Array.isArray(response)) {
        console.log(response)
          this.dataSource.data = response;
          this.isLoading = false;
          console.log("Data loaded:", this.dataSource.data);
        } else {
          console.error('Unexpected response structure:', response);
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.isLoading = false;
      }
    });
  }
  

 

  editItem(user: User): void {
    this.router.navigate(['/editUser', user.userId]);
  }

  

  checkIsAdmin(): boolean {
    return true; 
  }


  onGoBack():void{
    this.router.navigate(['/list']);
  }
}
