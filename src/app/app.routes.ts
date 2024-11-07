import { Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';

// import { AllUsersComponent } from './components/all-users/all-users.component';
import { ExportExcelComponent } from './components/export-excel/export-excel.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

import { AllUsersComponent } from './components/all-users/all-users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditComponent } from './components/edit/edit.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guard/auth.guard';


export const routes: Routes = [
 
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  {path :'profile', component:ProfileComponent ,canActivate: [AuthGuard]},
  { path: 'excel', component: ExportExcelComponent  ,canActivate: [AuthGuard]},

  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'list', component: ListComponent  ,canActivate: [AuthGuard]},
  { path: 'add', component: AddComponent ,canActivate: [AuthGuard]},
  { path: 'logout', component: LogoutComponent },
  { path: 'edit/:id', component: EditComponent ,canActivate: [AuthGuard] },
  {path:'allUsers',component:AllUsersComponent},
  { path: 'profile/edit', component: ProfileComponent ,canActivate: [AuthGuard] },
  {path:'editUser/:id',component:EditUserComponent},

  { path: '**', component: NotFoundComponent }
];

