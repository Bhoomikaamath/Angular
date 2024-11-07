// import { CommonModule } from '@angular/common';
// import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatIconModule } from '@angular/material/icon';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatSort, MatSortModule } from '@angular/material/sort';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';

// @Component({
//   selector: 'app-custom-table',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatCheckboxModule,
//     MatButtonModule,
//     MatIconModule,
//     MatTableModule,
//     MatSortModule,
//     MatPaginatorModule
//   ],
//   templateUrl: './custom-table.component.html',
//   styleUrls: ['./custom-table.component.css']
// })
// export class CustomTableComponent implements AfterViewInit {
//   @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();  
//   @Input() tableData: any[] = [];
//   @Input() displayedColumns: string[] = [];
//   @Input() showActionButton: boolean = false;
  
//   @Output() onEdit = new EventEmitter<any>();
//   @Output() onDelete = new EventEmitter<any>();
//   @Output() onSelect = new EventEmitter<number[]>(); 
//   @Output() onPageChangeEmitter = new EventEmitter<any>(); 
//     @Output() onSortChange = new EventEmitter<any>();
//   @ViewChild(MatSort) sort: MatSort | null = null;
//   // @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
//   @ViewChild(MatPaginator) paginator!: MatPaginator;

//   selectedIds: number[] = [];
//   pageSize: number = 10;

//   ngOnInit() {
//     this.dataSource.data = this.tableData;
    
//     this.dataSource.sort = this.sort;
//   }

//   ngAfterViewInit() {
//     if (this.sort) {
//       this.dataSource.sort = this.sort;
//     }
//     this.dataSource.paginator = this.paginator;
//   }

//   getDisplayedColumns(): string[] {
//     return ['select', ...this.displayedColumns];
//   }

//   toggleSelect(customerId: number, isSelected: boolean): void {
//     if (isSelected) {
//       this.selectedIds.push(customerId);
//     } else {
//       this.selectedIds = this.selectedIds.filter(id => id !== customerId);
//     }
//     this.onSelect.emit(this.selectedIds);
//   }

//   toggleSelectAll(isSelected: boolean): void {
//     this.selectedIds = isSelected ? this.dataSource.data.map(customer => customer.id) : [];
//     this.onSelect.emit(this.selectedIds);
//   }

//   editRecord(item: any): void {
//     this.onEdit.emit(item);
//   }

//   deleteRecord(item: any): void {
//     this.onDelete.emit(item);
//   }

//   onPageChange(event: any): void {
//     this.pageSize = event.pageSize;

//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.pageSize = event.pageSize;
//       this.dataSource.paginator.pageIndex = event.pageIndex;
//     }

//     this.onPageChangeEmitter.emit(event);  
//   }
// }
