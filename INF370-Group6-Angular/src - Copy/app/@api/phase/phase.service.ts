import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhaseService {

  endpointBase = environment.endpointBase;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
  ) { }

  getAllPhasesStatuses() {
    return this._httpClient.get(this.endpointBase.concat("Phases/Statuses/GetAll"),
      { reportProgress: true, observe: "events" })
  }



  addPhasesStatus(payload, username:string) {
    return this._httpClient.post(this.endpointBase.concat("Phases/Statuses/Add/"+username),payload,
      { reportProgress: true, observe: "events" })
  }

  updatePhasesStatus(payload,username:string, id:number) {
    return this._httpClient.put(this.endpointBase.concat("Phases/Statuses/Update/"+username+"/"+id),payload,
      { reportProgress: true, observe: "events" })
  }

  deletePhasesStatus(username:string, id:number) {
    return this._httpClient.delete(this.endpointBase.concat("Phases/Statuses/Delete/"+username+"/"+id),
      { reportProgress: true, observe: "events" })
  }

  getAllPhasess() {
    return this._httpClient.get(this.endpointBase.concat("Phases/GetAll"),
      { reportProgress: true, observe: "events" })
  }

  getProjectPhases(projectId:number) {
    return this._httpClient.get(this.endpointBase.concat("Phases/Project/GetAll/"+projectId),
      { reportProgress: true, observe: "events" })
  }
  addPhases(payload, username:string) {
    return this._httpClient.post(this.endpointBase.concat("Phases/"+username),payload,
      { reportProgress: true, observe: "events" })
  }

  updatePhases(payload,username:string, PhasesId:number) {
    return this._httpClient.put(this.endpointBase.concat("Phases/"+username+"/"+PhasesId),payload,
      { reportProgress: true, observe: "events" })
  }

  deletePhases(username:string, id:number) {
    return this._httpClient.delete(this.endpointBase.concat("Phases/"+username+"/"+id),
      { reportProgress: true, observe: "events" })
  }
}
