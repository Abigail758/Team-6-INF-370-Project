export interface AssignEquipment{
    id: number,
    taskID: number,
    equipID: number
  }
  
  export interface Equipment {
    equID: number,
    name: string,
    Description: string,
    condition: string,
    quantity: number
  }