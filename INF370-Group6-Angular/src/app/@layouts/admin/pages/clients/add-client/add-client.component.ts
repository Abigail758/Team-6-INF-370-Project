import { ClientService } from './../../../../../@api/client/client.service';
import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { Client } from 'src/app/@api/client/client';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  errorMessage = "";
  showLoadingEndicator = false;

  addForm: FormGroup;

  listOfClients: Client[] = [];

  constructor(
    private _authService: AuthService,
    private _clientService: ClientService,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,


    private _ngxSpinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<AddClientComponent>
  ) {
   
    this.createAddForm(_formBuilder);
  }


  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.addForm.valid) {
      this._clientService.addClient(this.addForm.value, this._authService.currentUser.UserName)
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

  private createAddForm(_formBuilder: FormBuilder) {
    this.addForm = _formBuilder.group({
      ClientName: ["", Validators.required],
      ClientAddress: ["", Validators.required],
      ContactPerson: ["", Validators.required],
      TelephoneNumbers: ["", Validators.required],
      EmailAddress: ["", [Validators.required, Validators.email]],
    });
  }

  get ClientName() { return this.addForm.get('ClientName'); }
  get ClientAddress() { return this.addForm.get('ClientAddress'); }
  get ContactPerson() { return this.addForm.get('ContactPerson'); }
  get TelephoneNumbers() { return this.addForm.get('TelephoneNumbers'); }
  get EmailAddress() { return this.addForm.get('EmailAddress'); }

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
    const dialogRef = this.dialog.open(AddClientComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



}
