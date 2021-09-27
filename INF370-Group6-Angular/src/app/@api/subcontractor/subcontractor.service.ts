import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SubcontractorService {

    endpointBase = environment.endpointBase;

    constructor(
        private _httpClient: HttpClient,
        private _router: Router,
    ) { }

    getAllSubcontractorsPhases() {
        return this._httpClient.get(this.endpointBase.concat("Subcontractors/Phases/GetAll"),
            { reportProgress: true, observe: "events" })
    }



    addSubcontractorsPhases(payload, username: string) {
        return this._httpClient.post(this.endpointBase.concat("Subcontractors/Phases/Add/" + username), payload,
            { reportProgress: true, observe: "events" })
    }

    updateSubcontractorsPhases(payload, username: string, id: number) {
        return this._httpClient.put(this.endpointBase.concat("Subcontractors/Phases/Update/" + username + "/" + id), payload,
            { reportProgress: true, observe: "events" })
    }

    deleteSubcontractorsPhases(username: string, id: number) {
        return this._httpClient.delete(this.endpointBase.concat("Subcontractors/Phases/Delete/" + username + "/" + id),
            { reportProgress: true, observe: "events" })
    }

    getAllSubcontractors() {
        return this._httpClient.get(this.endpointBase.concat("Subcontractors/GetAll"),
            { reportProgress: true, observe: "events" })
    }

    addSubcontractors(payload, username: string) {
        return this._httpClient.post(this.endpointBase.concat("Subcontractors/" + username), payload,
            { reportProgress: true, observe: "events" })
    }

    updateSubcontractors(payload, username: string, SubcontractorsId: number) {
        return this._httpClient.put(this.endpointBase.concat("Subcontractors/" + username + "/" + SubcontractorsId), payload,
            { reportProgress: true, observe: "events" })
    }

    deleteSubcontractors(username: string, id: number) {
        return this._httpClient.delete(this.endpointBase.concat("Subcontractors/" + username + "/" + id),
            { reportProgress: true, observe: "events" })
    }
}