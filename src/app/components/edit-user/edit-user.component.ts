import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { UserService } from '../../services/user/user.service';

export interface Role {
  roleId: number;
  name: string;
}

export interface User1 {
  userId: number;
  fullName: string;
  username: string;
  email: string;
  role: Role[];
  active:boolean;
}
export interface User {
  userId: number;
  fullName: string;
  username: string;
  email: string;
  role: string;
  Active:boolean;
}
@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  errorMessage: string | null = null;  
  form: FormGroup;
  userId: number | null = null;
  isLoading = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder,
    private dataService: DataService,
    private userService: UserService 
  ) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: [null, Validators.required], 
      active: [true] 
    });
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.loadUserData();
    }
  }

  loadUserData(): void {
    this.isLoading = true;
    this.dataService.getUserById(this.userId!).subscribe({
        next: (response) => {
            const user1 = response; 
            const role = user1.object.role && user1.object.role.length > 0 ? user1.object.role[0] : null;
            const roleName = role?.name === 'ROLE_ADMIN' ? 'Admin' : 'User'; 
            const user: User = {
                userId: user1.object.userId,
                fullName: user1.object.fullName,
                username: user1.object.username,
                email: user1.object.email,
                role: roleName,
                Active: user1.object.active || true
            };

            console.log(role.name)
            this.form.patchValue(user);
            this.isLoading = false;
        },
        error: (error) => {
            console.error('Error loading user data:', error);
            this.errorMessage = 'Could not load user data.';
            this.isLoading = false;
        }
    });
}

onSave(): void {
  if (this.form.valid) {
      const roleString = this.form.get('role')?.value;
      const ro = roleString === "Admin" ? "ROLE_ADMIN" : "ROLE_USER";

      
      this.userService.getRole(ro).subscribe((response) => {
          console.log("Role API response:", response);
         
          const roles = response; 
          console.log("Extracted roles:", roles);
         
          const user: User1 = {
              userId: this.userId!,
              fullName: this.form.get('fullName')?.value,
              username: this.form.get('username')?.value,
              email: this.form.get('email')?.value,
              role: (response), 
              active: this.form.get('active')?.value
          };
          console.log(user)
       
          this.dataService.updateUserProfile(user).subscribe({
              next: (updateResponse) => {
                  console.log("User updated successfully:", updateResponse);
                  this.router.navigate(['all-users']);
              },
              error: (error) => {
                  console.error("Error updating user:", error);
                  this.errorMessage = 'Could not update user.';
              }
          }); 

      }, (error) => {
          console.error("Error fetching role:", error);
          this.errorMessage = 'Could not fetch role information.';
      });

  } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
  }
} 



  onCancel(): void {
    this.router.navigate(['/allUsers']);
  }
}
