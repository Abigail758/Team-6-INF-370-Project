import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { EmployeeService } from 'src/app/@api/employee/employee.service';
import { EmployeeType } from 'src/app/@api/employee/employee.types';
import { ProjectService } from 'src/app/@api/projects/project.service';
import { ProjectStatus } from 'src/app/@api/projects/project.types';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  errorMessage = "";
  showLoadingEndicator = false;

  addFrom: FormGroup;

  listOfProjectStatuses: ProjectStatus[] = [];

  constructor(
    private _authService: AuthService,
    private _projectService: ProjectService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _ngxSpinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<AddProjectComponent>
  ) {
    this.getProjectStatusesFromServer();
    this.buildAddFrom(_formBuilder);
  }

  ngOnInit(): void {
  }

 
  onSubmit() {
    this.errorMessage = "";
    if (this.addFrom.valid) 
    if(confirm('Are you sure you want to add a new project?')) {
      this._projectService.addProject(this.addFrom.value, this._authService.currentUser.UserName)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.showLoadingEndicator = true;
          }
          if (event.type === HttpEventType.Response) {
            this.showLoadingEndicator = false;
            this.openSnackBar("Project has been successfully added!!", "", 2000);
            this.closeDialog();

            // if(confirm('Would you like to add a new phase'))
            // {
            //   this.router.navigate(['admin/add-phase']);
            // }
          }
        },
        
          error => {
            this.showLoadingEndicator = false;
            this.errorMessage = error.error.message;
          })
    }
  }

  private buildAddFrom(_formBuilder: FormBuilder) {
    this.addFrom = _formBuilder.group({
      Name: ["", Validators.required],
      Description: ["", Validators.required],
      ProjectStatusId: ["", Validators.required],
      StartDate: ["", Validators.required],
      EndDate: ["", Validators.required],
      SiteName: ["", Validators.required],
      SiteAddress: ["", Validators.required],
    });
  }
  get Name() { return this.addFrom.get('Name'); }
  get Description() { return this.addFrom.get('Description'); }
  get ProjectStatusId() { return this.addFrom.get('ProjectStatusId'); }
  get StartDate() { return this.addFrom.get('StartDate'); }
  get EndDate() { return this.addFrom.get('EndDate'); }
  get SiteName() { return this.addFrom.get('SiteName'); }
  get SiteAddress() { return this.addFrom.get('SiteAddress'); }



  private getProjectStatusesFromServer() {
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
