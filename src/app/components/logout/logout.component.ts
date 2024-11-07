import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  
  constructor(private router: Router,private dataService: DataService) {}

  ngOnInit(): void {
    this.logout();
  }

  // logout(): void {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('disable');

  //   console.log("User logged out");

  //   this.router.navigate(['/signin']);
  // }

  logout(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.dataService.logOut().subscribe(
        response => {
    
          const statusCode = response.status;
          if (statusCode === 200) {
            console.log('Logout successful');
            localStorage.removeItem('authToken');
            localStorage.removeItem('key');
            localStorage.removeItem('token');
            this.router.navigate(['/signin']);
          } else {
            console.error('Unexpected response:', response.body);
            this.router.navigate(['/signin']);
          }
        },
        error => {
      
          if (error.status) {
            console.error('HTTP Status Code:', error.status);
          }
          this.router.navigate(['/signin']);
        }
      );
    } else {
      this.router.navigate(['/signin']);
    }
  } 
}