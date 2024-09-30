import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './pages/user/add-user/add-user.component';
import { GetUserComponent } from './pages/user/get-user/get-user.component';

const routes: Routes = [
  {path:'user', component:GetUserComponent},
  {path:'user/add-user', component:AddUserComponent},
  {path:'user/:id/edit', component:AddUserComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
