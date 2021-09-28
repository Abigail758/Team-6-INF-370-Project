export interface EmployeeType {
  id: number,
  name: string,
  description: string
}

export interface Employee{
  id: number,
  appUserId: string,
  idNumber: string,
  name: string,
  surname: string,
  emailAddress: string,
  phoneNumber: string,
  generatedPassword: string,
  employeeType: string,
  employeeTypeId: string,
  address: string,
}
