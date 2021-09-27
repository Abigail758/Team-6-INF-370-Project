export interface Applicant{
  firstName:string;
  lastName:string;
  emailAddress:string;
  cellPhoneNumber:string;
  generatedPassword:string;
  routeId:string;
}

export interface DependentFromServer {
  firstName: string;
  lastName: string;
  nationality: string;
  iDNumber: string;
  relationshipToApplicant: string;
  passportNumber: string;
  dateOfBirth: string;
  genderId: number;
  dependentTypeId: number;
  dependentTypeName: string;
}
