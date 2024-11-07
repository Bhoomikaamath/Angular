import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BhoomikaMylibComponent } from 'bhoomika-mylib';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    BhoomikaMylibComponent,

  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  isLoggedIn:boolean = false;
  isAuthenticated:boolean =false;
  isAdmin:boolean=false;
  isUser:boolean=false;


  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.token$.subscribe(token => {
     this.isLoggedIn =localStorage.getItem("key")=="true"
     console.log(localStorage.getItem("key"));
     console.log('Is Logged In:', this.isLoggedIn);

    });
    
  }

  checkIsAdmin(): boolean {
    const role = localStorage.getItem('role'); 
    const isAdmin = this.authService.isAdmin();
    return isAdmin;
  }

  logout(): void {
    this.authService.logout();
    localStorage.removeItem('role');
    this.isLoggedIn= false;
    localStorage.setItem("key", "false"); 
    this.router.navigate(['/signin']);
  }

  navigateToAdd() {
    this.router.navigate(['/add']);
  }

  viewProfile(): void {
    this.router.navigate(['/profile']); 
  }

  allUsershow():void{
    this.router.navigate(['/allUsers'])
  }

  goHome():void{
    this.router.navigate(['/list'])
  }

}
