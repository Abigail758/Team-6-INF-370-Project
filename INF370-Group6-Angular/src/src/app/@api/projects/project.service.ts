import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  endpointBase = environment.endpointBase;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
  ) { }

  getAllProjectStatuses() {
    return this._httpClient.get(this.endpointBase.concat("Projects/Statuses/GetAll"),
      { reportProgress: true, observe: "events" })
  }

  addProjectStatus(payload, username:string) {
    return this._httpClient.post(this.endpointBase.concat("Projects/Statuses/Add/"+username),payload,
      { reportProgress: true, observe: "events" })
  }

  updateProjectStatus(payload,username:string, id:number) {
    return this._httpClient.put(this.endpointBase.concat("Projects/Statuses/Update/"+username+"/"+id),payload,
      { reportProgress: true, observe: "events" })
  }

  deleteProjectStatus(username:string, id:number) {
    return this._httpClient.delete(this.endpointBase.concat("Projects/Statuses/Delete/"+username+"/"+id),
      { reportProgress: true, observe: "events" })
  }

  getAllProjects() {
    return this._httpClient.get(this.endpointBase.concat("Projects/GetAll"),
      { reportProgress: true, observe: "events" })
  }

  addProject(payload, username:string) {
    return this._httpClient.post(this.endpointBase.concat("Projects/"+username),payload,
      { reportProgress: true, observe: "events" })
  }

  updateProject(payload,username:string, projectId:number) {
    return this._httpClient.put(this.endpointBase.concat("Projects/"+username+"/"+projectId),payload,
      { reportProgress: true, observe: "events" })
  }

  deleteProject(username:string, id:number) {
    return this._httpClient.delete(this.endpointBase.concat("Projects/"+username+"/"+id),
      { reportProgress: true, observe: "events" })
  }
}
