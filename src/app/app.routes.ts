import { Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';

export const routes: Routes = [

    { path: '', component: ListComponent },
  { path: 'add-item', component: AddComponent }
];
