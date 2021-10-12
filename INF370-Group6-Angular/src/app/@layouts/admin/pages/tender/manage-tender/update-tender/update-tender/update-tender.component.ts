import { Tender, TenderStatus } from './../../../../../../../@api/tender/tender';
import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  listOfTenderStatuses: TenderStatus[] = [];


  constructor(
    private _authService: AuthService,
    private _tenderService: TenderService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateTenderComponent>,
    private _ngxSpinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,

  ) { this.recordToUpdate = dataFromParent.recordToUpdate;
    this.getTenderStatusFromServer();
    this.buildUpdateForm(_formBuilder);
}

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.updateForm.valid) {
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

  private getTenderStatusFromServer() {
    this._tenderService.getAllTenderStatuses().subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this._ngxSpinner.hide();
        this.listOfTenderStatuses = event.body as TenderStatus[];
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
      DateSubmitted: [this.recordToUpdate.dateSubmitted, Validators.required],
      TenderSource: [this.recordToUpdate.tenderSource, Validators.required],
      TenderStatus: [this.recordToUpdate.tenderStatusName, Validators.required],
      TenderStatusId: [this.recordToUpdate.tenderStatusId, Validators.required],
      clientName: [this.recordToUpdate.clientName, Validators.required],
    });
  }
  get Name() { return this.updateForm.get('Name'); }
  get Description() { return this.updateForm.get('Description'); }
  get DateSubmitted() { return this.updateForm.get('DateSubmitted'); }
  get TenderSource() { return this.updateForm.get('TenderSource'); }
  get TenderStatus() { return this.updateForm.get('TenderStatus'); }
  get TenderStatusId() { return this.updateForm.get('TenderStatusId'); }
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

  openDialog() {
    const dialogRef = this.dialog.open(UpdateTenderComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}