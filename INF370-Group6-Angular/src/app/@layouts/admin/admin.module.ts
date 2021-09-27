import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { AdminSideNavComponent } from './layout/admin-side-nav/admin-side-nav.component';
import { AdminDashboardComponent } from './layout/admin-dashboard/admin-dashboard.component';

import { ListAppRolesComponent } from './pages/app-roles/list-app-roles/list-app-roles.component';
import { AddAppRoleComponent } from './pages/app-roles/add-app-role/add-app-role.component';
import { DeleteAppRoleComponent } from './pages/app-roles/delete-app-role/delete-app-role.component';
import { UpdateAppRoleComponent } from './pages/app-roles/update-app-role/update-app-role.component';
import { ListEmployeeTypesComponent } from './pages/employees/manage-employee-types/list-employee-types/list-employee-types.component';
import { AddEmployeeTypeComponent } from './pages/employees/manage-employee-types/add-employee-type/add-employee-type.component';
import { UpdateEmployeeTypeComponent } from './pages/employees/manage-employee-types/update-employee-type/update-employee-type.component';
import { ListEmployeesComponent } from './pages/employees/manage-employees/list-employees/list-employees.component';
import { AddEmployeeComponent } from './pages/employees/manage-employees/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './pages/employees/manage-employees/update-employee/update-employee.component';
import { ListProjectStatusesComponent } from './pages/projects/project-statuses/list-project-statuses/list-project-statuses.component';
import { AddProjectStatusComponent } from './pages/projects/project-statuses/add-project-status/add-project-status.component';
import { UpdateProjectStatusComponent } from './pages/projects/project-statuses/update-project-status/update-project-status.component';
import { ListProjectsComponent } from './pages/projects/manage-projects/list-projects/list-projects.component';
import { UpdateProjectComponent } from './pages/projects/manage-projects/update-project/update-project.component';
import { AddProjectComponent } from './pages/projects/manage-projects/add-project/add-project.component';
import { ListPhaseStatusesComponent } from './pages/phases/statuses/list-phase-statuses/list-phase-statuses.component';
import { AddPhaseStatusComponent } from './pages/phases/statuses/add-phase-status/add-phase-status.component';
import { UpdatePhaseStatusComponent } from './pages/phases/statuses/update-phase-status/update-phase-status.component';
import { ListPhasesComponent } from './pages/phases/manage-phases/list-phases/list-phases.component';
import { AddPhaseComponent } from './pages/phases/manage-phases/add-phase/add-phase.component';
import { UpdatePhaseComponent } from './pages/phases/manage-phases/update-phase/update-phase.component';
import { AddPhaseTaskComponent } from './pages/tasks/manage-tasks/add-phase-task/add-phase-task.component';
import { UpdatePhaseTaskComponent } from './pages/tasks/manage-tasks/update-phase-task/update-phase-task.component';
import { ListPhaseTasksComponent } from './pages/tasks/manage-tasks/list-phase-tasks/list-phase-tasks.component';
import { ListTaskStatusesComponent } from './pages/tasks/task-statuses/list-task-statuses/list-task-statuses.component';
import { AddTaskStatusComponent } from './pages/tasks/task-statuses/add-task-status/add-task-status.component';
import { UpdateTaskStatusComponent } from './pages/tasks/task-statuses/update-task-status/update-task-status.component';
import { RentalRequestStatusComponent } from './pages/rentals/rental-request-status/rental-request-status.component';
import { RentalComponent } from './pages/rentals/rental/rental.component';
import { RentalStatusComponent } from './pages/rentals/rental-status/rental-status.component';
import { RentalRequestComponent } from './pages/rentals/rental-request/rental-request.component';
import { ReportMainComponent } from './pages/reports/report-main/report-main.component';
import { MonthlyrentalreportComponent } from './pages/reports/monthlyrentalreport/monthlyrentalreport.component';
import { ProjectprogressreportComponent } from './pages/reports/projectprogressreport/projectprogressreport.component';
import { InventoryreportComponent } from './pages/reports/inventoryreport/inventoryreport.component';
import { ExpensereportComponent } from './pages/reports/expensereport/expensereport.component';
import { SubcontractoreportComponent } from './pages/reports/subcontractoreport/subcontractoreport.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminSideNavComponent,

    ListAppRolesComponent,
    AddAppRoleComponent,
    DeleteAppRoleComponent,
    UpdateAppRoleComponent,
    ListEmployeeTypesComponent,
    AddEmployeeTypeComponent,
    UpdateEmployeeTypeComponent,
    ListEmployeesComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    ListProjectStatusesComponent,
    AddProjectStatusComponent,
    UpdateProjectStatusComponent,
    ListProjectsComponent,
    UpdateProjectComponent,
    AddProjectComponent,
    ListPhaseStatusesComponent,
    AddPhaseStatusComponent,
    UpdatePhaseStatusComponent,
    ListPhasesComponent,
    AddPhaseComponent,
    UpdatePhaseComponent,
    AddPhaseTaskComponent,
    UpdatePhaseTaskComponent,
    ListPhaseTasksComponent,
    ListTaskStatusesComponent,
    AddTaskStatusComponent,
    UpdateTaskStatusComponent,
    RentalRequestStatusComponent,
    RentalComponent,
    RentalStatusComponent,
    RentalRequestComponent,
    ReportMainComponent,
    MonthlyrentalreportComponent,
    ProjectprogressreportComponent,
    InventoryreportComponent,
    ExpensereportComponent,
    SubcontractoreportComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
