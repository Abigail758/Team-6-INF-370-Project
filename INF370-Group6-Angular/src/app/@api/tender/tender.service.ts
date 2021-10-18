import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  endpointBase = environment.endpointBase;
  baseApiUrl = "https://file.io";


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


  // Returns an observable
 upload(file):Observable<any> {
  
  // Create form data
  const formData = new FormData(); 
    
  // Store form name as "file" with file data
  formData.append("file", file, file.name);
    
  // Make http post request over api
  // with formData as req
  return this._httpClient.post(this.baseApiUrl, formData)
  }

  
}


