import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { SubcontractorService } from 'src/app/@api/subcontractor/subcontractor.service';
import { Subcontractor, SubcontractorPhase } from 'src/app/@api/subcontractor/subcontractor.types';
import { ProjectService } from 'src/app/@api/projects/project.service';
import { Project, ProjectStatus } from 'src/app/@api/projects/project.types';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-update-subcontractor',
  templateUrl: './update-subcontractor.component.html',
  styleUrls: ['./update-subcontractor.component.scss']
})
export class UpdateSubcontractorComponent implements OnInit {
  errorMessage = "";
  showLoadingEndicator = false;

  updateForm: FormGroup;
  recordToUpdate: Subcontractor;
  recordIDToUpdate: SubcontractorPhase;

  listOfSubcontractorPhases: SubcontractorPhase[] = [];

  constructor(
    private _authService: AuthService,
    private _projectService: ProjectService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateSubcontractorComponent>,
    private _ngxSpinner: NgxSpinnerService,
    private _subcontractorService: SubcontractorService,

    @Inject(MAT_DIALOG_DATA) dataFromParent: any,

  ) {
    this.recordToUpdate = dataFromParent.recordToUpdate;
    this.recordIDToUpdate = dataFromParent.recordIDToUpdate;
    this.getSubcontractorPhaseFromServier();
    this.buildUpdateForm(_formBuilder);

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.updateForm.valid) {
      this._subcontractorService.updateSubcontractors(this.updateForm.value, this._authService.currentUser.UserName, this.recordToUpdate.id)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.showLoadingEndicator = true;
          }
          if (event.type === HttpEventType.Response) {
            this.showLoadingEndicator = false;
            this.openSnackBar("Update", "Success!", 2000);
            this.closeDialog();
          }
        },
          error => {
            this.showLoadingEndicator = false;
            this.errorMessage = error.error.message;
          })
    }
  }

  private buildUpdateForm(_formBuilder: FormBuilder) {
    this.updateForm = _formBuilder.group({
      Name: [this.recordToUpdate.name, Validators.required],
      Address: [this.recordToUpdate.address, Validators.required],
      JobDescription: [this.recordToUpdate.jobDescription, Validators.required],
      TelephoneNumber: [this.recordToUpdate.telephoneNumber, Validators.required],
      EmailAddress: [this.recordToUpdate.emailAddress, Validators.required],
      PhaseId: [this.recordIDToUpdate.id, Validators.required],
    });
  }
  get Name() { return this.updateForm.get('Name'); }
  get Address() { return this.updateForm.get('Description'); }
  get JobDescription() { return this.updateForm.get('PhaseStatusId'); }
  get TelephoneNumber() { return this.updateForm.get('ProjectId'); }
  get EmailAddress() { return this.updateForm.get('StartDate'); }
  get PhaseId() { return this.updateForm.get('EndDate'); }




  private getSubcontractorPhaseFromServier() {
    this._subcontractorService.getAllSubcontractorsPhases().subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this._ngxSpinner.hide();
        this.listOfSubcontractorPhases = event.body as SubcontractorPhase[];
      }
    },
      error => {
        this._ngxSpinner.hide();
        this.openErrorMessageSnackBar(error.error.message);
      });
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

  private closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }


}