export interface Tender {
   TenderId: number,
   name: string,
   description: string,
   rawDateSubmitted: Date,
   dateSubmitted: string,
   tenderSource: string,
   tenderStatusId: number,
   tenderStatusName: string
}


export interface TenderStatus {
    id: number,
    name: string,
    description: string
    
}