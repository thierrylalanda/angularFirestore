import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
const routes : Routes=[
    {path:'employees',component: EmployeesComponent},
    {path:'home',component: HomeComponent},
    {path:'',component: HomeComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[EmployeesComponent,HomeComponent];