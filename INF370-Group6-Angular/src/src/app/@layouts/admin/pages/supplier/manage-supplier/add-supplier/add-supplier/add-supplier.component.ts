import { SupplierTypes } from './../../../../../../../@api/supplier/supplier';
import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { SupplierService } from 'src/app/@api/supplier/supplier.service';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {

  errorMessage = "";
  showLoadingEndicator = false;

  addFrom: FormGroup;

  listOfSupplierTypes: SupplierTypes[] = [];


  constructor(
    private _authService: AuthService,
    private _supplierService: SupplierService,

    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _ngxSpinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<AddSupplierComponent>
  ) { 
    this.getSupplierTypesFromServer();
    this.buildAddFrom(_formBuilder);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.addFrom.valid) {
      this._supplierService.addSupplier(this.addFrom.value, this._authService.currentUser.UserName)
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
      SupplierTypeId: ["", Validators.required],
      PhoneNumber: ["", Validators.required],
      Address: ["", Validators.required],
      EmailAddress: ["", [Validators.required, Validators.email]],
    });
  }
  get Name() { return this.addFrom.get('Name'); }
  get SupplierTypeId() { return this.addFrom.get('SupplierTypeId'); }
  get PhoneNumber() { return this.addFrom.get('PhoneNumber'); }
  get Address() { return this.addFrom.get('Address'); }
  get EmailAddress() { return this.addFrom.get('EmailAddress'); }



  private getSupplierTypesFromServer() {
    this._supplierService.getAllSupplierTypes().subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this._ngxSpinner.hide();
        this.listOfSupplierTypes = event.body as SupplierTypes[];
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
