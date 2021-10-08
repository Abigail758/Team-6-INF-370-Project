import { ClientService } from './../../../../../@api/client/client.service';
import { HttpEventType } from '@angular/common/http';
import { Component, OnInit , Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { Client } from 'src/app/@api/client/client';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';


@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent implements OnInit {


  errorMessage = "";
  showLoadingEndicator = false;

  updateForm : FormGroup;
  recordToUpdate: Client;

  // listOfClients: Client[] = [];

  constructor(   
    private _authService: AuthService,
    private _clientService: ClientService,

    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _ngxSpinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<UpdateClientComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,) {

    this.recordToUpdate = dataFromParent.recordToUpdate;
    this.createUpdateForm(_formBuilder);

     }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.updateForm.valid) {
      this._clientService.updateClient(this.updateForm.value, this._authService.currentUser.UserName,this.recordToUpdate.id)    
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

  private createUpdateForm(_formBuilder: FormBuilder) {
    this.updateForm = _formBuilder.group({
      ClientName: [this.recordToUpdate.clientName, Validators.required],
      ClientAddress: [this.recordToUpdate.clientAddress, Validators.required],
      ContactPerson: [this.recordToUpdate.contactPerson, Validators.required],
      TelephoneNumbers: [this.recordToUpdate.TelephoneNumbers, Validators.required],
      EmailAddress: [this.recordToUpdate.emailAddress, [Validators.required, Validators.email]],
    });
  }

  get ClientName() { return this.updateForm.get('ClientName'); }
  get ClientAddress() { return this.updateForm.get('ClientAddress'); }
  get ContactPerson() { return this.updateForm.get('ContactPerson'); }
  get TelephoneNumbers() { return this.updateForm.get('TelephoneNumbers'); }
  get EmailAddress() { return this.updateForm.get('EmailAddress'); }

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
