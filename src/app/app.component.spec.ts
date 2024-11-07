// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of } from 'rxjs';
// import { AppComponent } from './app.component';
// import { AuthService } from './services/auth.service'; // Adjust path as necessary

// class MockAuthService {
//   // Mock any methods you use from AuthService
//   isAuthenticated() {
//     return of(true);
//   }
// }

// describe('AppComponent', () => {
//   let component: AppComponent;
//   let fixture: ComponentFixture<AppComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         AppComponent,
//         RouterTestingModule,
//         MatSnackBarModule,
//       ],
//       providers: [
//         { provide: AuthService, useClass: MockAuthService } // Provide the mock service
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges(); // Trigger initial data binding
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have a title "todo-app"', () => {
//     expect(component.title).toEqual('todo-app');
//   });

//   it('should render title in a h1 tag', () => {
//     const compiled = fixture.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('todo-app');
//   });

//   it('should contain navbar component', () => {
//     const navbarElement = fixture.nativeElement.querySelector('app-navbar');
//     expect(navbarElement).toBeTruthy();
//   });
// });
