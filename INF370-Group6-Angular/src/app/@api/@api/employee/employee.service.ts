import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  endpointBase = environment.endpointBase;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
  ) { }

  getAllEmployeeTypes() {
    return this._httpClient.get(this.endpointBase.concat("Employees/Types/GetAll"),
      { reportProgress: true, observe: "events" })
  }

  addEmployeeTypes(payload, username:string) {
    return this._httpClient.post(this.endpointBase.concat("Employees/Types/Add/"+username),payload,
      { reportProgress: true, observe: "events" })
  }

  updateEmployeeTypes(payload,username:string, id:number) {
    return this._httpClient.put(this.endpointBase.concat("Employees/Types/Update/"+username+"/"+id),payload,
      { reportProgress: true, observe: "events" })
  }

  deleteEmployeeTypes(username:string, id:number) {
    return this._httpClient.delete(this.endpointBase.concat("Employees/Types/Delete/"+username+"/"+id),
      { reportProgress: true, observe: "events" })
  }

  getAllEmployees() {
    return this._httpClient.get(this.endpointBase.concat("Employees/GetAll"),
      { reportProgress: true, observe: "events" })
  }

  addEmployee(payload, username:string) {
    return this._httpClient.post(this.endpointBase.concat("Employees/"+username),payload,
      { reportProgress: true, observe: "events" })
  }

  updateEmployee(payload,username:string, employeeEmailAddress:string) {
    return this._httpClient.put(this.endpointBase.concat("Employees/"+username+"/"+employeeEmailAddress),payload,
      { reportProgress: true, observe: "events" })
  }

  deleteEmployee(username:string, id:number) {
    return this._httpClient.delete(this.endpointBase.concat("Employees/"+username+"/"+id),
      { reportProgress: true, observe: "events" })
  }
}
