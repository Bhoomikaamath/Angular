import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { DataService } from '../../services/data/data.service';
import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockDataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockDataService = jasmine.createSpyObj('DataService', ['logOut']);

    await TestBed.configureTestingModule({
      imports: [LogoutComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: DataService, useValue: mockDataService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should logout successfully and navigate to signin', () => {
    localStorage.setItem('authToken', 'fake-token');
    const mockResponse = new HttpResponse<any>({ status: 200 });
    mockDataService.logOut.and.returnValue(of(mockResponse));

    component.logout();

    expect(mockDataService.logOut).toHaveBeenCalled();
    expect(localStorage.getItem('authToken')).toBeNull();
    expect(localStorage.getItem('key')).toBeNull();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/signin']);
  });

  it('should handle unexpected logout response and navigate to signin', () => {
    localStorage.setItem('authToken', 'fake-token');
    const mockResponse = new HttpResponse<any>({ status: 500, body: 'Error' });
    mockDataService.logOut.and.returnValue(of(mockResponse));

    component.logout();

    expect(mockDataService.logOut).toHaveBeenCalled();
    expect(localStorage.getItem('authToken')).toBe('fake-token'); // Should not be removed
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/signin']);
  });

  it('should handle logout error and navigate to signin', () => {
    localStorage.setItem('authToken', 'fake-token');
    mockDataService.logOut.and.returnValue(throwError(() => ({ status: 400 })));

    component.logout();

    expect(mockDataService.logOut).toHaveBeenCalled();
    expect(localStorage.getItem('authToken')).toBe('fake-token'); // Should not be removed
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/signin']);
  });

  it('should navigate to signin if no authToken is present', () => {
    component.logout();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/signin']);
  });
});
