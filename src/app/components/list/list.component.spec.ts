
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { DataService, Item } from '../../services/data/data.service';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let authService: jasmine.SpyObj<AuthService>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['getAllCustomers', 'deleteCustomer', 'exportCustomersToExcel']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAdmin']);
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.afterClosed.and.returnValue(of(true));
    
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    dialogSpy.open.and.returnValue(dialogRefSpyObj);

    const routerSpy = jasmine.createSpyObj('Router', ['navigate', 'getCurrentNavigation']);
    routerSpy.getCurrentNavigation.and.returnValue({ extras: {} });
    
    await TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, ListComponent],
        providers: [
            { provide: DataService, useValue: dataServiceSpy },
            { provide: AuthService, useValue: authServiceSpy },
            { provide: MatDialog, useValue: dialogSpy },
            { provide: Router, useValue: routerSpy }
        ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    dialogRefSpyObj.afterClosed.and.returnValue(of(true)); 
    
});

  
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data on init', () => {
    const mockCustomers: Item[] = [
      { id: 1, fullName: 'John Doe', email: 'john@example.com', dob: '1990-01-01', gender: 'Male', phoneNo: '1234567890' },
      { id: 2, fullName: 'Jane Smith', email: 'jane@example.com', dob: '1992-02-02', gender: 'Female', phoneNo: '0987654321' }
    ];

    dataService.getAllCustomers.and.returnValue(of(mockCustomers));

    component.ngOnInit();

    expect(dataService.getAllCustomers).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockCustomers);
  });

  it('should handle error while fetching data', () => {
    dataService.getAllCustomers.and.returnValue(throwError('Error fetching data'));

    component.ngOnInit();

    expect(dataService.getAllCustomers).toHaveBeenCalled();
  });

  
  // it('should delete an item and show success message', () => {
  //   const mockCustomer: Item = { id: 2, fullName: 'Jane Smith', email: 'jane@example.com', dob: '1992-02-02', gender: 'Female', phoneNo: '0987654321' };
  //   component.originalData = [mockCustomer];
  //   dataService.deleteCustomer.and.returnValue(of({}));

  //   component.deleteItem(mockCustomer);

  //   expect(dialog.open).toHaveBeenCalledWith(ConfirmDeleteDialogComponent, jasmine.any(Object));
  //   dialog.open().afterClosed().subscribe(() => {
  //     expect(dataService.deleteCustomer).toHaveBeenCalledWith(mockCustomer.id);
  //     expect(component.successMessage).toBe('Deleted successfully');
  //   });
  // });

  // it('should not delete an item if dialog is cancelled', () => {
  //   const mockCustomer: Item = { id: 1, fullName: 'John Doe', email: 'john@example.com', dob: '1990-01-01', gender: 'Male', phoneNo: '1234567890' };
    
  //   dialogRef.afterClosed.and.returnValue(of(false)); // Simulate dialog cancellation
  //   component.deleteItem(mockCustomer);

  //   // Ensure that the deleteCustomer method is not called
  //   expect(dataService.deleteCustomer).not.toHaveBeenCalled();
  // });

  // it('should delete selected items and show success message', () => {
  //   component.selectedIds = [1, 2];
  //   dataService.deleteCustomers.and.returnValue(of({}));

  //   component.deleteSelected();

  //   expect(dialog.open).toHaveBeenCalledWith(ConfirmDeleteDialogComponent, jasmine.any(Object));
  //   dialog.open().afterClosed().subscribe(() => {
  //     expect(dataService.deleteCustomers).toHaveBeenCalledWith(component.selectedIds);
  //     expect(component.successMessage).toBe('Customers deleted successfully');
  //   });
  // });

  // it('should not delete selected items if dialog is cancelled', () => {
  //   const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
  //   dialogRefSpy.afterClosed.and.returnValue(of(false));
  //   dialog.open.and.returnValue(dialogRefSpy);

  //   component.selectedIds = [1, 2];

  //   component.deleteSelected();

  //   expect(dataService.deleteCustomers).not.toHaveBeenCalled();
  // });
  

  it('should filter data correctly on search', () => {
    const mockCustomers: Item[] = [
      { id: 1, fullName: 'John Doe', email: 'john@example.com', dob: '1990-01-01', gender: 'Male', phoneNo: '1234567890' },
      { id: 2, fullName: 'Jane Smith', email: 'jane@example.com', dob: '1992-02-02', gender: 'Female', phoneNo: '0987654321' }
    ];
    component.originalData = mockCustomers;
  
    component.onSearchChange({ target: { value: 'Jane' } } as unknown as Event);
  
    expect(component.dataSource.data).toEqual([mockCustomers[1]]);
  });

  it('should reset the search when less than 3 characters are entered', () => {
    const mockCustomers: Item[] = [
      { id: 1, fullName: 'John Doe', email: 'john@example.com', dob: '1990-01-01', gender: 'Male', phoneNo: '1234567890' },
      { id: 2, fullName: 'Jane Smith', email: 'jane@example.com', dob: '1992-02-02', gender: 'Female', phoneNo: '0987654321' }
    ];
    component.originalData = mockCustomers;
    component.dataSource.data = [mockCustomers[0]];
  
    component.onSearchChange({ target: { value: 'Jo' } } as unknown as Event);
  
    expect(component.dataSource.data).toEqual(mockCustomers);
  });

  it('should navigate to edit page', () => {
    const mockCustomer: Item = { id: 1, fullName: 'John Doe', email: 'john@example.com', dob: '1990-01-01', gender: 'Male', phoneNo: '1234567890' };
    component.editItem(mockCustomer);
    expect(router.navigate).toHaveBeenCalledWith(['/edit', mockCustomer.id]);
  });

  it('should export to Excel', () => {
    dataService.exportCustomersToExcel.and.returnValue(of(new Blob()));

    component.exportToExcel();

    expect(dataService.exportCustomersToExcel).toHaveBeenCalled();
  });

  it('should handle error during export', () => {
    dataService.exportCustomersToExcel.and.returnValue(throwError('Error exporting'));

    component.exportToExcel();

    expect(dataService.exportCustomersToExcel).toHaveBeenCalled();
  });

  it('should check if user is admin', () => {
    authService.isAdmin.and.returnValue(true);
    expect(component.checkIsAdmin()).toBeTrue();
  });

  it('should adjust columns based on user role', () => {
    authService.isAdmin.and.returnValue(true);
    component.adjustColumnsBasedOnRole();
    expect(component.displayedColumns).toContain('select');
  });
});
