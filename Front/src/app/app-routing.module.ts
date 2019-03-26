import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashbordComponent } from './dashbord/dashbord.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashbord', component: DashbordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
