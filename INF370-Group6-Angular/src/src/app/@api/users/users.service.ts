import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  endpointBase = environment.endpointBase;

  constructor(private _httpClient: HttpClient) { }

  getAllApplicants() {
    return this._httpClient.get(this.endpointBase.concat("Applicants/GetAll"),
      { reportProgress: true, observe: "events" })
  }

  resendApplicantAccountCreatedEmail(routeId) {
    return this._httpClient.get(this.endpointBase.concat("Applicants/ResendApplicantAccountCreatedEmail/"+routeId),
      { reportProgress: true, observe: "events" })
  }

}
