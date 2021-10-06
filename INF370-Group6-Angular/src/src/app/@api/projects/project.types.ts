export interface ProjectStatus {
  id: number,
  name: string,
  description: string
}

export interface Project {
  id: number,
  projectStatusId: number,
  projectStatusName: string,
  name: string,
  description: string,
  startDate: string,
  endDate: string,
  siteName: string,
  siteAddress: string,
  rawStartDate:Date,
  rawEndDate:Date
}
