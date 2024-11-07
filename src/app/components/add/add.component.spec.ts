

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AddComponent } from './add.component';
import { DataService } from '../../services/data/data.service';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['createCustomer']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, AddComponent],  
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle email already in use error', () => {
    dataService.createCustomer.and.returnValue(throwError({ status: 409 }));
  
    const form = { valid: true, resetForm: jasmine.createSpy('resetForm') } as unknown as NgForm;
    component.onSubmit(form);
  
    expect(component.errorMessage).toBe('Email is already in use.'); 
    expect(component.isLoading).toBeFalse();
  });
  
  it('should handle server error', () => {
    dataService.createCustomer.and.returnValue(throwError({ status: 500 }));
  
    const form = { valid: true, resetForm: jasmine.createSpy('resetForm') } as unknown as NgForm;
    component.onSubmit(form);
  
    expect(component.errorMessage).toBe('An error occurred while processing your request. Please try again later.'); // Correct expected message
    expect(component.isLoading).toBeFalse();
  });
  
  it('should handle unexpected error', () => {
    dataService.createCustomer.and.returnValue(throwError({ error: { message: 'Unexpected error' } }));
  
    const form = { valid: true, resetForm: jasmine.createSpy('resetForm') } as unknown as NgForm;
    component.onSubmit(form);
  
    expect(component.errorMessage).toBe('Unexpected error'); 
    expect(component.isLoading).toBeFalse();
  });
  
  it('should submit the form successfully', () => {
    const mockResponse = { id: 1, ...component.model };
    dataService.createCustomer.and.returnValue(of(mockResponse));

    component.model = {
        fullName: 'John Doe',
        dob: '1990-01-01',
        gender: 'male',
        phoneNo: '1234567890',
        email: 'john.doe@example.com'
    };

    const form = { valid: true, resetForm: jasmine.createSpy('resetForm') } as unknown as NgForm;
    component.onSubmit(form);

    expect(dataService.createCustomer).toHaveBeenCalledWith(component.model);
    expect(component.isLoading).toBeFalse();
    expect(component.successMessage).toBe('Item added successfully!');
    expect(router.navigate).toHaveBeenCalledWith(['/list']);
});


  it('should reset the form', () => {
    const form = {
      resetForm: jasmine.createSpy('resetForm'),
    } as unknown as NgForm;

    component.reset(form);

    expect(form.resetForm).toHaveBeenCalled();
    expect(component.errorMessage).toBe('');
    expect(component.successMessage).toBe('');
    expect(component.isLoading).toBeFalse();
  });

  it('should validate form correctly', () => {
    component.model = {
      fullName: 'John Doe',
      dob: '1990-01-01',
      gender: 'male',
      phoneNo: '1234567890',
      email: 'john.doe@example.com'
    };

    expect(component.isFormValid()).toBeTrue();

    component.model.phoneNo = '123'; // Invalid phone number
    expect(component.isFormValid()).toBeFalse();

    component.model.phoneNo = '1234567890'; // Reset phone number
    component.model.email = 'invalid-email'; // Invalid email
    expect(component.isFormValid()).toBeFalse();
  });

  it('should navigate back to list', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/list']);
  });
});
