import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
// import { routes } from '../../app.routes';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule for mat-button
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-navbar',
  standalone: true,
 imports: [RouterLinkActive,
   SigninComponent,
    SignupComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink  
   ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}
 
}
