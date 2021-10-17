export interface Tender {
    TenderId: number,
    TenderName: string,
    description: string,
    rawDateSubmitted: Date,
    dateSubmitted: string,
    tenderSource: string,
    tenderStatusId: number,
    tenderStatus: string,
    clientName: string
 }
 
 
 export interface TenderStatus {
     id: number,
     name: string,
     description: string
     
 }