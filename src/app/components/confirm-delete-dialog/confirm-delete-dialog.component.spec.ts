import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

describe('ConfirmDeleteDialogComponent', () => {
  let component: ConfirmDeleteDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmDeleteDialogComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} }, 
      ],
      schemas: [NO_ERRORS_SCHEMA], 
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('onNoClick', () => {
    it('should close the dialog with false', () => {
      component.onNoClick();
      expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
    });
  });

  describe('onYesClick', () => {
    it('should close the dialog with true', () => {
      component.onYesClick();
      expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
    });
  });
});
