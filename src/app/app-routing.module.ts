import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UsersComponent } from './user/users/users.component';

const routes: Routes = [
  {
    path: 'user/create',
    component: UserCreateComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
