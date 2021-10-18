export interface PhaseStatus{
  id: number,
  name: string,
  description: string
}

export interface Phase {
  id: number,
  name: string,
  description: string,
  rawStartDate: Date,
  startDate: string,
  rawEndDate: Date,
  endDate: string,
  projectId: number,
  projectName: string,
  projectRawStartTime: Date,
  projectRawEndTime: Date,
  phaseStatusId: number,
  phaseStatusName: string
}
