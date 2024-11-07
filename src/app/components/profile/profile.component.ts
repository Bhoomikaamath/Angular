export interface User {
  username: string;
  email: string;
  password: string;
  fullName: string;
 
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';



@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userProfile!: { data: User };
  errorMessage: string | null = null;
  isEditing: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

    getUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (response: any) => {
        this.userProfile = { data: response.object };
      console.log('User Profile Data:', this.userProfile);
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
        this.errorMessage = 'Failed to load profile. Please try again later.';
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

   updateProfile(): void {
    this.userService.updateUserProfile(this.userProfile.data).subscribe({
      next: (updatedUser: User) => {
        this.userProfile = { data: updatedUser };
        this.isEditing = false;
        console.log('Profile updated successfully:', this.userProfile);
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.errorMessage = 'Failed to update profile. Please try again later.';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/list']);
  }
}
