



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

import { AuthGuard } from 'src/app/shared/guards/auth-guard.service';
import { AdminDashboardComponent } from './layout/admin-dashboard/admin-dashboard.component';
import { ListAppRolesComponent } from './pages/app-roles/list-app-roles/list-app-roles.component';
import { ListEmployeeTypesComponent } from './pages/employees/manage-employee-types/list-employee-types/list-employee-types.component';
import { ListEmployeesComponent } from './pages/employees/manage-employees/list-employees/list-employees.component';
import { ListProjectsComponent } from './pages/projects/manage-projects/list-projects/list-projects.component';

import { ListPhasesComponent } from './pages/phases/manage-phases/list-phases/list-phases.component';
import { ListPhaseStatusesComponent } from './pages/phases/statuses/list-phase-statuses/list-phase-statuses.component';
import { ListTaskStatusesComponent } from './pages/tasks/task-statuses/list-task-statuses/list-task-statuses.component';
import { RentalComponent} from './pages/rentals/rental/rental.component'
import { RentalStatusComponent} from './pages/rentals/rental-status/rental-status.component'
import { ReportMainComponent}  from './pages/reports/report-main/report-main.component'
import { MonthlyrentalreportComponent} from './pages/reports/monthlyrentalreport/monthlyrentalreport.component'
import { ProjectprogressreportComponent } from './pages/reports/projectprogressreport/projectprogressreport.component';
import { InventoryreportComponent } from './pages/reports/inventoryreport/inventoryreport.component';
import { ExpensereportComponent } from './pages/reports/expensereport/expensereport.component';
import { SubcontractoreportComponent } from './pages/reports/subcontractoreport/subcontractoreport.component';
import {ListTenderComponent} from './pages/tender/manage-tender/list-tender/list-tender/list-tender.component';
import {ListSupplierComponent} from './pages/supplier/manage-supplier/list-supplier/list-supplier/list-supplier.component';
import {ListTenderStatusComponent} from './pages/tender/tender-statuses/list-tender-statuses/list-tender-status/list-tender-status.component';
import {ListSupplierTypeComponent} from './pages/supplier/supplier-types/list-supplier-types/list-supplier-type/list-supplier-type.component';
import { ListClientsComponent } from './pages/clients/list-clients/list-clients.component';
import { AddClientComponent } from './pages/clients/add-client/add-client.component';
import { UpdateClientComponent } from './pages/clients/update-client/update-client.component';
import { ListEquipmentComponent } from './pages/equipment/list-equipment/list-equipment.component'; 
import { AddEquipmentComponent } from './pages/equipment/add-equipment/add-equipment.component'; 
import { UpdateEquipmentComponent } from './pages/equipment/update-equipment/update-equipment.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'app-roles', component: ListAppRolesComponent },
      { path: 'employees', component: ListEmployeesComponent },
      { path: 'employee-types', component: ListEmployeeTypesComponent },
      { path: 'projects', component: ListProjectsComponent },
      { path: 'tenders', component: ListTenderComponent },
      { path: 'supplier', component: ListSupplierComponent },
    
      { path: 'phase-statuses', component: ListPhaseStatusesComponent },
      { path: 'task-statuses', component: ListTaskStatusesComponent },
      { path: 'rental-status', component: RentalStatusComponent },
      { path: 'rental', component: RentalComponent },
      { path: 'report-main', component: ReportMainComponent },
      { path: 'monthlyrentalreport', component: MonthlyrentalreportComponent },
      { path: 'projectprogressreport', component: ProjectprogressreportComponent },
      { path: 'inventoryreport', component: InventoryreportComponent },
      { path: 'expensereport', component: ExpensereportComponent },
      { path: 'subcontractoreport', component: SubcontractoreportComponent },

      { path: 'tender-statuses', component: ListTenderStatusComponent },
      { path: 'supplier-types', component: ListSupplierTypeComponent },

      { path: 'list-clients', component: ListClientsComponent },
      { path: 'add-client', component: AddClientComponent },
      { path: 'update-client', component: UpdateClientComponent },
      
      { path: 'list-equipment', component: ListEquipmentComponent },
      { path: 'add-equipment', component: AddEquipmentComponent },
      { path: 'update-equipment', component: UpdateEquipmentComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
