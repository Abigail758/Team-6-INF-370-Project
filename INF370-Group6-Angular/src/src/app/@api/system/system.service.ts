import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  endpointBase = environment.endpointBase;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
  ) { }

  getAllAppRoles() {
    return this._httpClient.get(this.endpointBase.concat("System/Roles/GetAll"),
      { reportProgress: true, observe: "events" })
  }

  addAppRole(payload, username:string) {
    return this._httpClient.post(this.endpointBase.concat("System/Roles/Add/"+username),payload,
      { reportProgress: true, observe: "events" })
  }

  updateAppRole(payload,username:string, id:string) {
    return this._httpClient.put(this.endpointBase.concat("System/Roles/Update/"+username+"/"+id),payload,
      { reportProgress: true, observe: "events" })
  }

  deleteAppRole(username:string, id:string) {
    return this._httpClient.delete(this.endpointBase.concat("System/Roles/Delete/"+username+"/"+id),
      { reportProgress: true, observe: "events" })
  }
}
