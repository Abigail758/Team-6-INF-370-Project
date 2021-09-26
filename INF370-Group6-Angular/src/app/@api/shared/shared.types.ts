
export interface CurrentUser {
  UserName: string;
  UserRole: string;
  ApplicationRouteId: string;
  ApplicationStatus: string;
}

export interface UploadFinishedEventArgs {
  filePath: '' //Comes from server
}


export interface IdLooksUps {
  id: number;
  value: string;
}


