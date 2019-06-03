import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeService } from './shared/employee.service';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    HomeComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
