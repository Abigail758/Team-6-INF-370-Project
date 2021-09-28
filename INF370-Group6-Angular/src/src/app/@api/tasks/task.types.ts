export interface TaskStatus{
  id: number,
  name: string,
  description: string
}

export interface Task {
  id: number,
  name: string,
  description: string,
  rawStartDate: Date,
  startDate: string,
  endDate: string,
  rawEndDate: Date,
  phaseRawStartDate: Date,
  phaseRawEndDate: Date,
  phaseId: number,
  phaseName: string,
  taskStatusId: number,
  taskStatusName: string
}
