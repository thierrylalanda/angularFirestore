import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/shared/employee.service";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  constructor(
    public service: EmployeeService,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form !== null) form.resetForm();
    this.service.formData = {
      id: null,
      fullName: "",
      empCode: "",
      position: "",
      mobile: ""
    };
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({},form.value) ;
    delete data.id;
    if(form.value.id === null)
    this.firestore
      .collection("employees")
      .add(data)
      .then(resp => {
        console.log(resp);
        this.toastr.success('Données enregistré avec succès', 'Bravo !!!');
      }).catch(err=>{
        this.toastr.error('Hello world!', 'Toastr fun!');
        
      });
      else 
      this.firestore.doc("employees/"+form.value.id).update(data);
      this.resetForm(form);
  }
}
