import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { EmployeeService } from 'src/app/@api/employee/employee.service';
import { Employee, EmployeeType } from 'src/app/@api/employee/employee.types';
import { ProjectService } from 'src/app/@api/projects/project.service';
import { Project, ProjectStatus } from 'src/app/@api/projects/project.types';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';
import { UpdateEmployeeComponent } from '../../../employees/manage-employees/update-employee/update-employee.component';



@Component({
  selector: 'app-complete-projects',
  templateUrl: './complete-projects.component.html',
  styleUrls: ['./complete-projects.component.scss']
})
export class CompleteProjectsComponent implements OnInit {

  errorMessage = "";
  showLoadingEndicator = false;

  completeForm: FormGroup;

  status: ProjectStatus;
  recordToUpdate: Project;

  listOfProjectStatuses: ProjectStatus[] = [];
  


  constructor(
    private _authService: AuthService,
    private _projectService: ProjectService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    private _ngxSpinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,

  ) {
    this.recordToUpdate = dataFromParent.recordToUpdate;
    this.getProjectStatuses();
    this.buildCompleteForm(_formBuilder);

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.completeForm.valid)
    (confirm('Are you sure you want to complete this project ?'))
   {
      this._projectService.updateProject(this.completeForm.value, this._authService.currentUser.UserName, this.recordToUpdate.id)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.showLoadingEndicator = true;
          }
          if (event.type === HttpEventType.Response) {
            this.showLoadingEndicator = false;
            this.openSnackBar("Project has been successfully completed!!", "", 2000);
            this.closeDialog();
          }
        },
          error => {
            this.showLoadingEndicator = false;
            this.errorMessage = error.error.message;
          })
    }
  }

  private getProjectStatuses() 

  {
    
    this._projectService.getAllProjectStatuses().subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this._ngxSpinner.hide();
        this.listOfProjectStatuses = event.body as ProjectStatus[];
      }
    },
      error => {
        this._ngxSpinner.hide();
        this.openErrorMessageSnackBar(error.error.message);
      });
  }

  private buildCompleteForm(_formBuilder: FormBuilder) {
    this.completeForm = _formBuilder.group({
     
      ProjectStatusId: [this.recordToUpdate.projectStatusId, Validators.required],
    
    });
  }
  get Name() { return this.completeForm.get('Name'); }
  get Description() { return this.completeForm.get('Description'); }
  get ProjectStatusId() { return this.completeForm.get('ProjectStatusId'); }
  get StartDate() { return this.completeForm.get('StartDate'); }
  get EndDate() { return this.completeForm.get('EndDate'); }
  get SiteName() { return this.completeForm.get('SiteName'); }
  get SiteAddress() { return this.completeForm.get('SiteAddress'); }


  private closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  private openSnackBar(message: string, action: string, _duration: number) {
    this._snackBar.open(message, action, {
      duration: _duration,
      verticalPosition: 'top'
    });
  }
  private openErrorMessageSnackBar(errorMessage: string) {
    const snackBar = this._snackBar.openFromComponent(CustomErrorSnackBarComponent, {
      data: {
        preClose: () => { snackBar.dismiss() },
        parent: errorMessage
      },
      horizontalPosition: 'start',
      verticalPosition: 'bottom'
    });
  }


}
