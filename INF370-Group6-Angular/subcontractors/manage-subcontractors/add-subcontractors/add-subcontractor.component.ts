import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { SubcontractorService } from 'src/app/@api/subcontractor/subcontractor.service';
import { SubcontractorPhase } from 'src/app/@api/subcontractor/subcontractor.types';
import { ProjectService } from 'src/app/@api/projects/project.service';
import { Project, ProjectStatus } from 'src/app/@api/projects/project.types';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddProjectComponent } from '../../../projects/manage-projects/add-project/add-project.component';
import { Phase } from 'src/app/@api/phase/phase.types';

@Component({
  selector: 'app-add-subcontractor',
  templateUrl: './add-subcontractor.component.html',
  styleUrls: ['./add-subcontractor.component.scss']
})
export class AddSubcontractorComponent implements OnInit {
  errorMessage = "";
  showLoadingEndicator = false;

  addFrom: FormGroup;
  listOfSubcontractorPhases: SubcontractorPhase[] = [];

  phase: Phase;


  constructor(
    private _authService: AuthService,
    private _projectService: ProjectService,
    private _subcontractorService: SubcontractorService,

    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _ngxSpinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<AddSubcontractorComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,

  ) {
    this.phase = dataFromParent.recordFromParent as Phase;

    this.getSubcontractorPhaseFromServier();
    this.buildAddFrom(_formBuilder);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    this.addFrom.controls["PhaseId"].setValue(this.phase.id)
    if (this.addFrom.valid) {
      this._subcontractorService.addSubcontractors(this.addFrom.value, this._authService.currentUser.UserName)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.showLoadingEndicator = true;
          }
          if (event.type === HttpEventType.Response) {
            this.showLoadingEndicator = false;
            this.openSnackBar("Add Subcontractor", "Success!", 2000);
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
      Address: ["", Validators.required],
      JobDescription: ["", Validators.required],
      TelephoneNumber: ["", Validators.required],
      EmailAddress: ["", Validators.required],
      PhaseId: [""],
      });
  }
  get Name() { return this.addFrom.get('Name'); }
  get Address() { return this.addFrom.get('Address'); }
  get JobDescription() { return this.addFrom.get('JobDescription'); }
  get TelephoneNumber() { return this.addFrom.get('TelephoneNumber'); }
  get EmailAdress() { return this.addFrom.get('EmailAdress'); }
  get PhaseID() { return this.addFrom.get('PhaseID'); }




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
