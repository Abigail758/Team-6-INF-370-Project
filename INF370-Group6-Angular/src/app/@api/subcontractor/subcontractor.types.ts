export interface SubcontractorPhase{
    id: number,
    subID: number,
    phaseID: number
  }
  
  export interface Subcontractor {
    subID: number,
    name: string,
    address: string,
    jobDescription: string,
    telephoneNumber: number,
    projectName: string,
    emailAddress: string
  }