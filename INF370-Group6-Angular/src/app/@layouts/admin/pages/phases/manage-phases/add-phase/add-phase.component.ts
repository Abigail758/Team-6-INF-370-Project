import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { PhaseService } from 'src/app/@api/phase/phase.service';
import { PhaseStatus } from 'src/app/@api/phase/phase.types';
import { ProjectService } from 'src/app/@api/projects/project.service';
import { Project, ProjectStatus } from 'src/app/@api/projects/project.types';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddProjectComponent } from '../../../projects/manage-projects/add-project/add-project.component';

@Component({
  selector: 'app-add-phase',
  templateUrl: './add-phase.component.html',
  styleUrls: ['./add-phase.component.scss']
})
export class AddPhaseComponent implements OnInit {
  errorMessage = "";
  showLoadingEndicator = false;

  addFrom: FormGroup;
  listOfPhaseStatuses: PhaseStatus[] = [];

  project: Project;


  constructor(
    private _authService: AuthService,
    private _projectService: ProjectService,
    private _phaseService: PhaseService,

    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _ngxSpinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<AddPhaseComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,

  ) {
    this.project = dataFromParent.recordFromParent as Project;

    this.getPhaseStatusesFromServier();
    this.buildAddFrom(_formBuilder);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    this.addFrom.controls["ProjectId"].setValue(this.project.id)
    if (this.addFrom.valid) 
    if(confirm('Are you sure you want to add a new phase?'))
    {
      this._phaseService.addPhases(this.addFrom.value, this._authService.currentUser.UserName)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.showLoadingEndicator = true;
          }
          if (event.type === HttpEventType.Response) {
            this.showLoadingEndicator = false;
            this.openSnackBar("Phase has been successfully added!", "", 2000);
            this.closeDialog();
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
      PhaseStatusId: ["", Validators.required],
      ProjectId: [""],
      StartDate: ["", Validators.required],
      EndDate: ["", Validators.required],
    });
  }
  get Name() { return this.addFrom.get('Name'); }
  get Description() { return this.addFrom.get('Description'); }
  get PhaseStatusId() { return this.addFrom.get('PhaseStatusId'); }
  get ProjectId() { return this.addFrom.get('ProjectId'); }
  get StartDate() { return this.addFrom.get('StartDate'); }
  get EndDate() { return this.addFrom.get('EndDate'); }




  private getPhaseStatusesFromServier() {
    this._phaseService.getAllPhasesStatuses().subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this._ngxSpinner.hide();
        this.listOfPhaseStatuses = event.body as PhaseStatus[];
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
