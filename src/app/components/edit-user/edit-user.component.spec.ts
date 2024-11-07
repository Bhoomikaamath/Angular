// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { of, throwError } from 'rxjs';
// import { DataService } from '../../services/data/data.service';
// import { UserService } from '../../services/user/user.service';
// import { EditUserComponent } from './edit-user.component';

// class MockDataService {
//   getUserById(id: number) {
//     return of({ object: { userId: id, fullName: 'Test User', username: 'testuser', email: 'test@example.com', role: [{ name: 'ROLE_USER' }], active: true } });
//   }

//   updateUserProfile(user: any) {
//     return of(user);
//   }
// }

// class MockUserService {
//   getRole(role: string) {
//     return of([{ roleId: 1, name: role }]);
//   }
// }

// class MockActivatedRoute {
//   snapshot = { paramMap: { get: (key: string) => '1' } };
// }

// describe('EditUserComponent', () => {
//   let component: EditUserComponent;
//   let fixture: ComponentFixture<EditUserComponent>;
//   let mockDataService: MockDataService;
//   let mockUserService: MockUserService;
//   let router: Router;

//   beforeEach(async () => {
//     mockDataService = new MockDataService();
//     mockUserService = new MockUserService();

//     await TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, EditUserComponent],
//       providers: [
//         { provide: DataService, useValue: mockDataService },
//         { provide: UserService, useValue: mockUserService },
//         { provide: ActivatedRoute, useClass: MockActivatedRoute },
//         { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(EditUserComponent);
//     component = fixture.componentInstance;
//     router = TestBed.inject(Router);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should load user data on init', () => {
//     component.ngOnInit();
//     expect(component.form.value).toEqual({
//       fullName: 'Test User',
//       username: 'testuser',
//       email: 'test@example.com',
//       role: null,
//       active: true
//     });
//   });

//   it('should save user data when form is valid', () => {
//     component.ngOnInit(); // Load the user data first
//     component.form.patchValue({
//       fullName: 'Updated User',
//       username: 'updateduser',
//       email: 'updated@example.com',
//       role: 'User',
//       active: true
//     });

//     component.onSave();

//     expect(mockUserService.getRole).toHaveBeenCalledWith('ROLE_USER');
//     expect(mockDataService.updateUserProfile).toHaveBeenCalled();
//     expect(router.navigate).toHaveBeenCalledWith(['all-users']);
//   });

//   it('should handle error when saving user data', () => {
//     spyOn(mockUserService, 'getRole').and.returnValue(throwError('Role error'));
    
//     component.ngOnInit(); // Load the user data first
//     component.form.patchValue({
//       fullName: 'Updated User',
//       username: 'updateduser',
//       email: 'updated@example.com',
//       role: 'User',
//       active: true
//     });

//     component.onSave();

//     expect(component.errorMessage).toBe('Could not fetch role information.');
//   });

//   it('should handle error when loading user data', () => {
//     spyOn(mockDataService, 'getUserById').and.returnValue(throwError('Load error'));

//     component.ngOnInit();

//     expect(component.errorMessage).toBe('Could not load user data.');
//   });

//   it('should navigate to all users on cancel', () => {
//     component.onCancel();
//     expect(router.navigate).toHaveBeenCalledWith(['/allUsers']);
//   });

//   it('should show error message when form is invalid', () => {
//     component.form.patchValue({
//       fullName: '',
//       username: '',
//       email: '',
//       role: '',
//       active: true
//     });

//     component.onSave();

//     expect(component.errorMessage).toBe('Please fill out all required fields correctly.');
//   });
// });
