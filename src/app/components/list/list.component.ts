import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { DataService, Item } from '../../services/data/data.service';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { TableComponent } from 'bhoomika-mylib';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    TableComponent
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['fullName', 'dob', 'gender', 'email', 'phoneNo', 'actions'];
  dataSource = new MatTableDataSource<Item>([]);
  originalData: Item[] = [];
  isLoading = true;
  successMessage = '';
  errorMessage = '';
  selectedIds: number[] = [];
  isExporting = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.adjustColumnsBasedOnRole();
    this.showData();
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  

  onSelect(selectedIds: number[]): void {
    this.selectedIds = selectedIds;
  }

  showData(): void {
    this.isLoading = true;
    this.dataService.getAllCustomers().subscribe({
      next: (response: Item[]) => {
        this.originalData = response;
        this.dataSource.data = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.handleError('Error fetching customers:', error);
      }
    });
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      const searchValue = target.value.toLowerCase();
      this.dataSource.data = searchValue.length >= 3
        ? this.originalData.filter(item => item.fullName.toLowerCase().includes(searchValue))
        : this.originalData;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  

  editItem(item: Item): void {
    this.router.navigate(['/edit', item.id]);
  }

  deleteItem(element: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this item?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.dataService.deleteCustomer(element.id).subscribe({
          next: () => this.showData(),
          error: (error) => this.handleError('Error deleting customer:', error)
        });
      }
    });
  }

  deleteSelected(): void {
    if (this.selectedIds.length > 0) {
      const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
        width: '250px',
        data: { message: 'Are you sure you want to delete the selected items?' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.dataService.deleteCustomers(this.selectedIds).subscribe({
            next: () => {
              this.showData();
              this.selectedIds = [];
              this.successMessage = 'Customers deleted successfully';
              setTimeout(() => this.successMessage = '', 2000);
            },
            error: (error) => this.handleError('Error deleting customers:', error)
          });
        }
      });
    }
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.isLoading = false;
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = '', 5000); 
  }

  checkIsAdmin(): boolean {
    return this.authService.isAdmin();
  }

  adjustColumnsBasedOnRole(): void {
    this.displayedColumns = this.checkIsAdmin() 
      ? [ 'fullName', 'dob', 'gender', 'email', 'phoneNo', 'actions'] 
      : ['fullName', 'dob', 'gender', 'email', 'phoneNo'];
  }

  exportToExcel(): void {
    this.isExporting = true;
    this.dataService.exportCustomersToExcel().subscribe({
      next: (response: Blob) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'customers.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        this.isExporting = false;
      },
      error: (error) => {
        this.handleError('Error exporting customers to Excel:', error);
      }
    });
  }

  onPageChange(event: any): void {
    if (this.paginator) {
      this.paginator.pageIndex = event.pageIndex;
      this.paginator.pageSize = event.pageSize;
    }
  }

  onSortChange(event: any): void {
    const sortDirection = event.direction;
    const sortActive = event.active;
    
    if (sortDirection && sortActive) {
      this.dataSource.data = this.originalData.sort((a, b) => {
        const valueA = a[sortActive as keyof Item] ?? ''; 
        const valueB = b[sortActive as keyof Item] ?? '';
  
        if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
  }
  
  
 
}
