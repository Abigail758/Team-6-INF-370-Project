
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
import {ListTenderComponent} from './pages/tender/manage-tender/list-tender/list-tender/list-tender.component';
import {ListSupplierComponent} from './pages/supplier/manage-supplier/list-supplier/list-supplier/list-supplier.component';
import {ListTenderStatusComponent} from './pages/tender/tender-statuses/list-tender-statuses/list-tender-status/list-tender-status.component';
import {ListSupplierTypeComponent} from './pages/supplier/supplier-types/list-supplier-types/list-supplier-type/list-supplier-type.component';



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
      { path: 'project-statuses', component: ListProjectStatusesComponent },
      { path: 'phase-statuses', component: ListPhaseStatusesComponent },
      { path: 'task-statuses', component: ListTaskStatusesComponent },
      { path: 'tender-statuses', component: ListTenderStatusComponent },
      { path: 'supplier-types', component: ListSupplierTypeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
