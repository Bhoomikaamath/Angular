import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { DataService } from '../../services/data/data.service';
import { EditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let router: jasmine.SpyObj<Router>;
  
  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['getCustomerById', 'updateCustomer']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatRadioModule,
        MatTableModule,
        MatDialogModule,
        EditComponent 
      ],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load customer data on init', () => {
    const mockCustomer = { id: 1, fullName: 'John Doe', dob: '1990-01-01', email: 'john.doe@example.com', gender: 'Male', phoneNo: '1234567890' };
    dataService.getCustomerById.and.returnValue(of(mockCustomer));

    component.ngOnInit();

    expect(dataService.getCustomerById).toHaveBeenCalledWith(1);
    expect(component.form.value).toEqual(mockCustomer);
  });

  it('should handle error when loading customer data', () => {
    spyOn(console, 'error');
    dataService.getCustomerById.and.returnValue(throwError('Error'));

    component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith('Error loading customer data:', 'Error');
  });

  it('should save valid form data', () => {
    const mockItem = {
      id: 1,
      fullName: 'John Doe',
      dob: '1990-01-01',
      email: 'john.doe@example.com',
      gender: 'Male',
      phoneNo: '1234567890'
    };

    component.form.patchValue(mockItem);
    dataService.updateCustomer.and.returnValue(of(mockItem));

    component.onSave();

    expect(dataService.updateCustomer).toHaveBeenCalledWith(mockItem);
    expect(router.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('should not save invalid form data', () => {
    component.form.patchValue({
      fullName: '',
      dob: '',
      email: 'invalid-email',
      gender: '',
      phoneNo: '12345'
    });

    component.onSave();

    expect(dataService.updateCustomer).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('Please fill out all required fields correctly.');
  });

  it('should navigate on cancel', () => {
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('should validate email correctly', () => {
    component.form.patchValue({ email: 'valid@example.com' });
    expect(component.isEmailValid()).toBeTrue();

    component.form.patchValue({ email: 'invalid-email' });
    expect(component.isEmailValid()).toBeFalse();
  });

  it('should validate phone number correctly', () => {
    component.form.patchValue({ phoneNo: '1234567890' });
    expect(component.isPhoneNumberValid()).toBeTrue();

    component.form.patchValue({ phoneNo: '12345' });
    expect(component.isPhoneNumberValid()).toBeFalse();
  });

  it('should validate date of birth correctly', () => {
    component.form.patchValue({ dob: '1990-01-01' });
    expect(component.isDobValid()).toBeTrue(); 

    const today = new Date().toISOString().split('T')[0];
    component.form.patchValue({ dob: today });
    expect(component.isDobValid()).toBeFalse(); 

    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1); 
    component.form.patchValue({ dob: futureDate.toISOString().split('T')[0] });
    expect(component.isDobValid()).toBeFalse(); 
});

  
  
});
