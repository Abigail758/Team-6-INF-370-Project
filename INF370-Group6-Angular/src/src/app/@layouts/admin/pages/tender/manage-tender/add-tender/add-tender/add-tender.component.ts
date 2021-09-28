import { Tender } from './../../../../../../../@api/tender/tender';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TenderStatus } from 'src/app/@api/tender/tender';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { TenderService } from 'src/app/@api/tender/tender.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-add-tender',
  templateUrl: './add-tender.component.html',
  styleUrls: ['./add-tender.component.scss']
})
export class AddTenderComponent implements OnInit {

  errorMessage = "";
  showLoadingEndicator = false;

  addFrom: FormGroup;
  listOfTenderStatuses: TenderStatus[] = [];

  tender: Tender;


  constructor(
    private _authService: AuthService,
    private _tenderService: TenderService,
  

    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _ngxSpinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<AddTenderComponent>
  ) {
    this.getTenderStatusFromServer();
    this.buildAddFrom(_formBuilder);
   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.addFrom.valid) {
      this._tenderService.addTender(this.addFrom.value, this._authService.currentUser.UserName)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.showLoadingEndicator = true;
          }
          if (event.type === HttpEventType.Response) {
            this.showLoadingEndicator = false;
            this.openSnackBar("Add", "Success!", 2000);
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
      DateSubmitted: ["", Validators.required],
      TenderSource: ["", Validators.required],
      TenderStatusName: ["", Validators.required],
      TenderStatusId: ["", Validators.required]
    });
  }
  get Name() { return this.addFrom.get('Name'); }
  get Description() { return this.addFrom.get('Description'); }
  get  DateSubmitted() { return this.addFrom.get(' DateSubmitted'); }
  get  TenderSource() { return this.addFrom.get( 'TenderSource'); }
  get TenderStatusName() { return this.addFrom.get('TenderStatusName'); }
  get  TenderStatusId() { return this.addFrom.get(' TenderStatusId'); }
 



  private getTenderStatusFromServer() {
    this._tenderService.getAllTenderStatuses().subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this._ngxSpinner.hide();
        this. listOfTenderStatuses = event.body as TenderStatus[];
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
