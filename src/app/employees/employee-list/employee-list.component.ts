import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../shared/employee.service";
import { Employee } from "../../shared/employee.model";
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  list: Employee[];
  constructor(private service: EmployeeService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.service.getEmployee().subscribe(resp => {
      this.list = resp.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Employee;
      });
    });
  }

  onEdit(emp:Employee){
    this.service.formData=Object.assign({},emp);
  }
  onDelete(id:String){
    if(confirm("Voulez-vous supprimer cette element")){
      this.firestore.doc("employees/"+id).delete();
      this.toastr.warning("Employée supprimer avec succès",'INFOS');
    }
  }
}
