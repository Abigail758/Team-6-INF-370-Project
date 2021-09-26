import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  endpointBase = environment.endpointBase;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
  ) { }

  getAllTasksStatuses() {
    return this._httpClient.get(this.endpointBase.concat("Tasks/Statuses/GetAll"),
      { reportProgress: true, observe: "events" })
  }

  addTasksStatus(payload, username:string) {
    return this._httpClient.post(this.endpointBase.concat("Tasks/Statuses/Add/"+username),payload,
      { reportProgress: true, observe: "events" })
  }

  updateTasksStatus(payload,username:string, id:number) {
    return this._httpClient.put(this.endpointBase.concat("Tasks/Statuses/Update/"+username+"/"+id),payload,
      { reportProgress: true, observe: "events" })
  }

  deleteTasksStatus(username:string, id:number) {
    return this._httpClient.delete(this.endpointBase.concat("Tasks/Statuses/Delete/"+username+"/"+id),
      { reportProgress: true, observe: "events" })
  }

  getAllTaskss() {
    return this._httpClient.get(this.endpointBase.concat("Tasks/GetAll"),
      { reportProgress: true, observe: "events" })
  }

  getAllPhaseTasks(phaseId:number) {
    return this._httpClient.get(this.endpointBase.concat("Tasks/Phase/GetAll/"+phaseId),
      { reportProgress: true, observe: "events" })
  }

  addTasks(payload, username:string) {
    return this._httpClient.post(this.endpointBase.concat("Tasks/"+username),payload,
      { reportProgress: true, observe: "events" })
  }

  updateTasks(payload,username:string, TasksId:number) {
    return this._httpClient.put(this.endpointBase.concat("Tasks/"+username+"/"+TasksId),payload,
      { reportProgress: true, observe: "events" })
  }

  deleteTasks(username:string, id:number) {
    return this._httpClient.delete(this.endpointBase.concat("Tasks/"+username+"/"+id),
      { reportProgress: true, observe: "events" })
  }
}
