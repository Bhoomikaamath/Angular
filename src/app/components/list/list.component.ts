import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { EditComponent } from '../edit/edit.component';
import { AddComponent } from '../add/add.component';

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
    HttpClientModule,
    MatDialogModule,
    RouterLink,
    MatPaginatorModule,
    AddComponent
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['fullName', 'dob', 'gender', 'email', 'phone', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>(); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private dialog: MatDialog, private dataService: DataService) {}

  ngOnInit(): void {
    this.showData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  showData(): void {
    this.dataService.getCustomers().subscribe(response => {
      this.dataSource.data = response; 
      console.log(response);
    });
  }

  editItem(element: any): void {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '300px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.findIndex(item => item.id === result.id);
        if (index > -1) {
          this.dataSource.data[index] = result;
          this.dataSource.data = [...this.dataSource.data]; 
        }
      }
    });
  }

  deleteItem(element: any): void {
    this.dataService.deleteCustomer(element.id).subscribe({
      next: response => {
        console.log('Customer deleted:', response);
        this.showData(); 
      },
      error: error => {
        console.error('Error deleting customer:', error);
      }
    });
  }
  
  navigateToAdd() {
    this.router.navigate(['/add']);
  }
}
