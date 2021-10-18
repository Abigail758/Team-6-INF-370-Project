import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EquipmentService {

    endpointBase = environment.endpointBase;

    constructor(
        private _httpClient: HttpClient,
        private _router: Router,
    ) { }

    getAllAssignEquipment() {
        return this._httpClient.get(this.endpointBase.concat("Equipment/Tasks/GetAll"),
            { reportProgress: true, observe: "events" })
    }



    addAssignEquipment(payload, username: string) {
        return this._httpClient.post(this.endpointBase.concat("Equipment/Tasks/Add/" + username), payload,
            { reportProgress: true, observe: "events" })
    }

    updateAssignEquipment(payload, username: string, id: number) {
        return this._httpClient.put(this.endpointBase.concat("Equipment/Tasks/Update/" + username + "/" + id), payload,
            { reportProgress: true, observe: "events" })
    }

    deleteAssignEquipment(username: string, id: number) {
        return this._httpClient.delete(this.endpointBase.concat("Equipment/Tasks/Delete/" + username + "/" + id),
            { reportProgress: true, observe: "events" })
    }

    getAllEquipment() {
        return this._httpClient.get(this.endpointBase.concat("Equipment/GetAll"),
            { reportProgress: true, observe: "events" })
    }

    addEquipment(payload, username: string) {
        return this._httpClient.post(this.endpointBase.concat("Equipment/" + username), payload,
            { reportProgress: true, observe: "events" })
    }

    updateEquipment(payload, username: string, EquipmentID: number) {
        return this._httpClient.put(this.endpointBase.concat("Equipment/" + username + "/" + EquipmentID), payload,
            { reportProgress: true, observe: "events" })
    }

    deleteEquipment(username: string, id: number) {
        return this._httpClient.delete(this.endpointBase.concat("Equipment/" + username + "/" + id),
            { reportProgress: true, observe: "events" })
    }
}