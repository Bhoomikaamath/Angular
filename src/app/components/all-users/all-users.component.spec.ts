// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { of, throwError } from 'rxjs';
// import { DataService, User } from '../../services/data/data.service';
// import { AllUsersComponent } from './all-users.component';

// describe('AllUsersComponent', () => {
//   let component: AllUsersComponent;
//   let fixture: ComponentFixture<AllUsersComponent>;
//   let dataService: jasmine.SpyObj<DataService>;
//   let router: jasmine.SpyObj<Router>;

//   beforeEach(async () => {
//     const dataServiceSpy = jasmine.createSpyObj('DataService', ['getAllUser']);
//     const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, AllUsersComponent],
//       declarations: [AllUsersComponent],
//       providers: [
//         { provide: DataService, useValue: dataServiceSpy },
//         { provide: Router, useValue: routerSpy }
//       ],
//       schemas: [NO_ERRORS_SCHEMA] 
//     }).compileComponents();

//     fixture = TestBed.createComponent(AllUsersComponent);
//     component = fixture.componentInstance;
//     dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
//     router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should load data on init', () => {
   
//     const mockUsers: User[] = [
//       {
//         userId: 1,
//         fullName: 'John Doe',
//         username: 'johndoe',
//         email: 'john@example.com',
//         role: [{
//           name: 'ROLE_ADMIN',
//           roleId: 0
//         }], 
//         active: true,
//       },
//       {
//         userId: 2,
//         fullName: 'Jane Smith',
//         username: 'janesmith',
//         email: 'jane@example.com',
//         role: [{
//           name: 'ROLE_USER',
//           roleId: 0
//         }], 
//         active: false,
//       },
//     ];
    
    
//     dataService.getAllUser.and.returnValue(of(mockUsers));

//     component.ngOnInit();

//     expect(dataService.getAllUser).toHaveBeenCalled();
//     expect(component.dataSource.data).toEqual(mockUsers);
//     expect(component.isLoading).toBeFalse();
//   });

//   it('should handle error on data load', () => {
//     dataService.getAllUser.and.returnValue(throwError('Error fetching users'));

//     component.ngOnInit();

//     expect(dataService.getAllUser).toHaveBeenCalled();
//     expect(component.isLoading).toBeFalse();
//   });

//   it('should navigate to edit user', () => {
//     const user: User = {
//       userId: 1,
//       fullName: 'John Doe',
//       username: 'johndoe',
//       email: 'john@example.com',
//       role: [{ name: 'ROLE_ADMIN', roleId: 0 }],
//       active: true,
//     };

//     component.editItem(user);

//     expect(router.navigate).toHaveBeenCalledWith(['/editUser', user.userId]);
//   });

//   it('should navigate back to list', () => {
//     component.onGoBack();

//     expect(router.navigate).toHaveBeenCalledWith(['/list']);
//   });
// });
