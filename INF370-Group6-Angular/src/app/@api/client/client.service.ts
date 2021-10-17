

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  endpointBase = environment.endpointBase;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
  ) { }


  getAllClients() {
    return this._httpClient.get(this.endpointBase.concat("Clients/GetAll"),
      { reportProgress: true, observe: "events" })
  }

  addClient(payload, username:string) {
    return this._httpClient.post(this.endpointBase.concat("Clients/"+username),payload,
      { reportProgress: true, observe: "events" })
  }

  updateClient(payload,username:string, ClientId:number) {
    return this._httpClient.put(this.endpointBase.concat("Clients/"+username+"/"+ClientId),payload,
      { reportProgress: true, observe: "events" })
  }
  

  deleteClient(username:string, id:number) {
  //  alert(username);
    return this._httpClient.delete(this.endpointBase.concat("Clients/Delete/"+username+"/"+id),
      { reportProgress: true, observe: "events" })
  }

}