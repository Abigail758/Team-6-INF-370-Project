import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  endpointBase = environment.endpointBase;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
  ) { }

  getAllSupplierTypes() {
    return this._httpClient.get(this.endpointBase.concat("SupplierTypes/GetAll"),
      { reportProgress: true, observe: "events" })
  }



  addSupplierType(payload, username:string) {
    return this._httpClient.post(this.endpointBase.concat("SupplierTypes/Add/"+username),payload,
      { reportProgress: true, observe: "events" })
  }

  updateSupplierType(payload,username:string, id:number) {
    return this._httpClient.put(this.endpointBase.concat("SupplierTypes/Update/"+username+"/"+id),payload,
      { reportProgress: true, observe: "events" })
  }

  deleteSupplierType(username:string, id:number) {
    return this._httpClient.delete(this.endpointBase.concat("SupplierTypes/Delete/"+username+"/"+id),
      { reportProgress: true, observe: "events" })
  }

  getAllSuppliers() {
    return this._httpClient.get(this.endpointBase.concat("Suppliers/GetAll"),
      { reportProgress: true, observe: "events" })
  }

  
  addSupplier(payload, username:string) {
    return this._httpClient.post(this.endpointBase.concat("Suppliers/"+username),payload,
      { reportProgress: true, observe: "events" })
  }

  updateSupplier(payload,username:string, id:number) {
    return this._httpClient.put(this.endpointBase.concat("Suppliers/"+username+"/"+id),payload,
      { reportProgress: true, observe: "events" })
  }

  deleteSupplier(username:string, id:number) {
    return this._httpClient.delete(this.endpointBase.concat("Suppliers/"+username+"/"+id),
      { reportProgress: true, observe: "events" })
  }

}
