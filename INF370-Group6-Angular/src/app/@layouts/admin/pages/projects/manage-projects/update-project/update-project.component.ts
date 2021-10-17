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
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {
  errorMessage = "";
  showLoadingEndicator = false;

  updateForm: FormGroup;
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
    this.buildUpdateForm(_formBuilder);

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.updateForm.valid)
    if(confirm('Are you sure you want to update the project details?'))  {
      this._projectService.updateProject(this.updateForm.value, this._authService.currentUser.UserName, this.recordToUpdate.id)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.showLoadingEndicator = true;
          }
          if (event.type === HttpEventType.Response) {
            this.showLoadingEndicator = false;
            this.openSnackBar("Project has been successfully updated!!", "", 2000);
            this.closeDialog();
          }
        },
          error => {
            this.showLoadingEndicator = false;
            this.errorMessage = error.error.message;
          })
    }
  }

  private getProjectStatuses() {
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

  private buildUpdateForm(_formBuilder: FormBuilder) {
    this.updateForm = _formBuilder.group({
      Name: [this.recordToUpdate.name, Validators.required],
      Description: [this.recordToUpdate.description, Validators.required],
      ProjectStatusId: [this.recordToUpdate.projectStatusId, Validators.required],
      StartDate: [this.recordToUpdate.rawStartDate, Validators.required],
      EndDate: [this.recordToUpdate.rawEndDate, Validators.required],
      SiteName: [this.recordToUpdate.siteName, Validators.required],
      SiteAddress: [this.recordToUpdate.siteAddress, Validators.required],
    });
  }
  get Name() { return this.updateForm.get('Name'); }
  get Description() { return this.updateForm.get('Description'); }
  get ProjectStatusId() { return this.updateForm.get('ProjectStatusId'); }
  get StartDate() { return this.updateForm.get('StartDate'); }
  get EndDate() { return this.updateForm.get('EndDate'); }
  get SiteName() { return this.updateForm.get('SiteName'); }
  get SiteAddress() { return this.updateForm.get('SiteAddress'); }


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
