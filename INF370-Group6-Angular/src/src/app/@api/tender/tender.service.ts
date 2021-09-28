import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  endpointBase = environment.endpointBase;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
  ) { }

  getAllTenderStatuses() {
    return this._httpClient.get(this.endpointBase.concat("Tenders/Statuses/GetAll"),
      { reportProgress: true, observe: "events" })
  }



  addTenderStatus(payload, username:string) {
    return this._httpClient.post(this.endpointBase.concat("Tenders/Statuses/Add/"+username),payload,
      { reportProgress: true, observe: "events" })
  }

  updateTenderStatus(payload,username:string, id:number) {
    return this._httpClient.put(this.endpointBase.concat("Tenders/Statuses/Update/"+username+"/"+id),payload,
      { reportProgress: true, observe: "events" })
  }

  deleteTenderStatus(username:string, id:number) {
    return this._httpClient.delete(this.endpointBase.concat("Tenders/Statuses/Delete/"+username+"/"+id),
      { reportProgress: true, observe: "events" })
  }

  getAllTenders() {
    return this._httpClient.get(this.endpointBase.concat("Tenders/GetAll"),
      { reportProgress: true, observe: "events" })
  }

  
  addTender(payload, username:string) {
    return this._httpClient.post(this.endpointBase.concat("Tenders/"+username),payload,
      { reportProgress: true, observe: "events" })
  }

  updateTender(payload,username:string, TenderId:number) {
    return this._httpClient.put(this.endpointBase.concat("Tenders/"+username+"/"+TenderId),payload,
      { reportProgress: true, observe: "events" })
  }

  deleteTender(username:string, id:number) {
    return this._httpClient.delete(this.endpointBase.concat("Tenders/"+username+"/"+id),
      { reportProgress: true, observe: "events" })
  }
}


