import {Tender} from '../../../../../../@api/@api/tender/tender';
import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { TenderService } from 'src/app/@api/tender/tender.service';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-update-tender',
  templateUrl: './update-tender.component.html',
  styleUrls: ['./update-tender.component.scss']
})
export class UpdateTenderComponent implements OnInit {

  errorMessage = "";
  showLoadingEndicator = false;

  updateForm: FormGroup;
  recordToUpdate: Tender;

 

  constructor(
    private _authService: AuthService,
    private _tenderService: TenderService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateTenderComponent>,
    private _ngxSpinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,

  ) { this.recordToUpdate = dataFromParent.recordToUpdate;
    
    this.buildUpdateForm(_formBuilder);
}

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.updateForm.valid) 
    if(confirm('Are you sure you want to accept this tender?'))
    {
      this._tenderService.updateTender(this.updateForm.value, this._authService.currentUser.UserName, this.recordToUpdate.TenderId)
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
      TenderName: [this.recordToUpdate.TenderName, Validators.required],
     description: [this.recordToUpdate.description, Validators.required],
      dateSubmitted: [this.recordToUpdate.dateSubmitted, Validators.required],
      tenderSource: [this.recordToUpdate.tenderSource, Validators.required],
      tenderStatus: [this.recordToUpdate.tenderStatus, Validators.required],
      clientName: [this.recordToUpdate.clientName, Validators.required],
    });
  }
  get TenderName() { return this.updateForm.get('TenderName'); }
  get description() { return this.updateForm.get('description'); }
  get dateSubmitted() { return this.updateForm.get('dateSubmitted'); }
  get tenderSource() { return this.updateForm.get('tenderSource'); }
  get tenderStatus() { return this.updateForm.get('tenderStatus'); }
  get clientName() { return this.updateForm.get('clientName'); }

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

