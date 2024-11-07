// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatDialog } from '@angular/material/dialog';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatTableModule } from '@angular/material/table';
// import { of } from 'rxjs';
// import { CustomTableComponent } from './custom-table.component';

// describe('CustomTableComponent', () => {
//   let component: CustomTableComponent;
//   let fixture: ComponentFixture<CustomTableComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         CustomTableComponent,
//         MatTableModule,
//         MatPaginatorModule
//       ],
//       providers: [
//         { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of(true) }) } }
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CustomTableComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   // it('should update dataSource when tableData input changes', () => {
//   //   const mockData = [{ id: 1, fullName: 'John Doe' }];
//   //   component.tableData = mockData;
//   //   component.ngOnChanges();
//   //   expect(component.dataSource.data).toEqual(mockData);
//   // });

//   it('should emit edit event when editRecord is called', () => {
//     spyOn(component.onEdit, 'emit');
//     const mockItem = { id: 1, fullName: 'John Doe' };
//     component.editRecord(mockItem);
//     expect(component.onEdit.emit).toHaveBeenCalledWith(mockItem);
//   });

//   it('should emit delete event when deleteRecord is called', () => {
//     spyOn(component.onDelete, 'emit');
//     const mockItem = { id: 1, fullName: 'John Doe' };
//     component.deleteRecord(mockItem);
//     expect(component.onDelete.emit).toHaveBeenCalledWith(mockItem);
//   });

//   // it('should filter data based on search input', () => {
//   //   const mockData = [
//   //     { id: 1, fullName: 'John Doe' },
//   //     { id: 2, fullName: 'Jane Smith' }
//   //   ];
//   //   component.tableData = mockData;
//   //   component.ngOnChanges(); // Update the data source
//   //   component.onSearchChange('John');
//   //   expect(component.dataSource.data.length).toBe(1);
//   //   expect(component.dataSource.data[0].fullName).toBe('John Doe');
//   // });

//   it('should toggle selection for a single item', () => {
//     component.selectedIds = [];
//     component.toggleSelect(1, true);
//     expect(component.selectedIds).toContain(1);
//     component.toggleSelect(1, false);
//     expect(component.selectedIds).not.toContain(1);
//   });

//   it('should toggle selection for all items', () => {
//     const mockData = [{ id: 1 }, { id: 2 }];
//     component.dataSource.data = mockData;
//     component.toggleSelectAll(true);
//     expect(component.selectedIds).toEqual([1, 2]);
//     component.toggleSelectAll(false);
//     expect(component.selectedIds).toEqual([]);
//   });
// });
