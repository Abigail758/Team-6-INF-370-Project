import {Tender} from '../../../../../../@api/@api/tender/tender';
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

  addForm: FormGroup;
  listOfTenderStatuses: TenderStatus[] = [];

  tender: Tender;

   // Variable to store shortLink from api response
   shortLink: string = "";
   loading: boolean = false; // Flag variable
   file: File = null; // Variable to store file

  constructor(
    private _authService: AuthService,
    private _tenderService: TenderService,
  

    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _ngxSpinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<AddTenderComponent>
  ) {
   
    this.buildAddForm(_formBuilder);
   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.addForm.valid) 
    if(confirm('Are you sure you want to add a proposed tender?'))
    {
      this._tenderService.addTender(this.addForm.value, this._authService.currentUser.UserName)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.showLoadingEndicator = true;
          }
          if (event.type === HttpEventType.Response) {
            this.showLoadingEndicator = false;
            this.openSnackBar("Proposed tender added successfully!", "", 2000);
            this.closeDialog();
          }
        },
          error => {
            this.showLoadingEndicator = false;
            this.errorMessage = error.error.message;
          })
    }
  }

  private buildAddForm(_formBuilder: FormBuilder) {
    this.addForm = _formBuilder.group({
      TenderName: ["", Validators.required],
      description: ["", Validators.required],
     dateSubmitted: ["", Validators.required],
      tenderSource: ["", Validators.required],
      tenderStatus: ["", Validators.required],
      clientName: ["", Validators.required]
    });
  }
  get TenderName() { return this.addForm.get('TenderName'); }
  get description() { return this.addForm.get('description'); }
  get  dateSubmitted() { return this.addForm.get('dateSubmitted'); }
  get  tenderSource() { return this.addForm.get( 'tenderSource'); }
  get tenderStatus() { return this.addForm.get('tenderStatus'); }
  get  clientName() { return this.addForm.get('clientName'); }
 

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

 // On file Select
 onChange(event) {
  this.file = event.target.files[0];
}

// OnClick of button Upload
onUpload() {
  this.loading = !this.loading;
  console.log(this.file);
  this._tenderService.upload(this.file).subscribe(
      (event: any) => {
          if (typeof (event) === 'object') {

              // Short link via api response
              this.shortLink = event.link;

              this.loading = false; // Flag variable 
          }
      }
  );
}

}
