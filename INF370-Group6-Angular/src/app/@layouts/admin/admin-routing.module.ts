



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

import { AuthGuard } from 'src/app/shared/guards/auth-guard.service';
import { AdminDashboardComponent } from './layout/admin-dashboard/admin-dashboard.component';
import { ListAppRolesComponent } from './pages/app-roles/list-app-roles/list-app-roles.component';
import { ListEmployeeTypesComponent } from './pages/employees/manage-employee-types/list-employee-types/list-employee-types.component';
import { ListEmployeesComponent } from './pages/employees/manage-employees/list-employees/list-employees.component';
import { ListProjectsComponent } from './pages/projects/manage-projects/list-projects/list-projects.component';
import { ListProjectStatusesComponent } from './pages/projects/project-statuses/list-project-statuses/list-project-statuses.component';
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
import { AddTenderComponent } from './pages/tender/manage-tender/add-tender/add-tender/add-tender.component';

import { ListTenderComponent } from './pages/tender/manage-tender/list-tender/list-tender/list-tender.component'; 
import { ListTenderStatusComponent } from 'src/src/app/@layouts/admin/pages/tender/tender-statuses/list-tender-statuses/list-tender-status/list-tender-status.component';
import { AddSupplierComponent } from './pages/supplier/manage-supplier/add-supplier/add-supplier/add-supplier.component';
import { UpdateSupplierComponent } from './pages/supplier/manage-supplier/update-supplier/update-supplier/update-supplier.component';
import { UpdateSupplierTypeComponent } from './pages/supplier/supplier-types/update-supplier-types/update-supplier-type/update-supplier-type.component'; 
import { AddSupplierTypeComponent } from './pages/supplier/supplier-types/add-supplier-types/add-supplier-type/add-supplier-type.component'; 
import { ListSupplierComponent } from './pages/supplier/manage-supplier/list-supplier/list-supplier/list-supplier.component'; 
import { ListSupplierTypeComponent } from './pages/supplier/supplier-types/list-supplier-types/list-supplier-type/list-supplier-type.component'; 
import { UpdateTenderComponent } from './pages/tender/manage-tender/update-tender/update-tender/update-tender.component'; 
import { UpdateTenderStatusComponent } from './pages/tender/tender-statuses/update-tender-statuses/update-tender-status/update-tender-status.component'; 
import { AddTenderStatusComponent } from './pages/tender/tender-statuses/add-tender-statuses/add-tender-status/add-tender-status.component';


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
      { path: 'project-statuses', component: ListProjectStatusesComponent },
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
      { path: 'tenders', component: ListTenderComponent },
      { path: 'supplier', component: ListSupplierComponent },
      { path: 'tender-statuses', component: ListTenderStatusComponent },
      { path: 'supplier-types', component: ListSupplierTypeComponent },
            { path: 'add-supplier', component: AddSupplierComponent },
      { path: 'update-supplier', component: UpdateSupplierComponent },
      { path: 'update-supplier-type', component: UpdateSupplierTypeComponent },
      { path: 'add-supplier-type', component: AddSupplierTypeComponent },
      { path: 'update-tender', component: UpdateTenderComponent },
      { path: 'update-tender-statuses', component: UpdateTenderStatusComponent },

      { path: 'add-tender-statuses', component: AddTenderStatusComponent },



    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
