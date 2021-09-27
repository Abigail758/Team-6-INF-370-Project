import { Supplier, SupplierTypes } from './../../../../../../../@api/supplier/supplier';
import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { SupplierService } from 'src/app/@api/supplier/supplier.service';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.scss']
})
export class UpdateSupplierComponent implements OnInit {

  errorMessage = "";
  showLoadingEndicator = false;

  updateForm: FormGroup;
  recordToUpdate: Supplier;

  listOfSupplierTypes: SupplierTypes[] = [];

  constructor(
    private _authService: AuthService,
    private _supplierService: SupplierService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateSupplierComponent>,
    private _ngxSpinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,

  ) {
    this.recordToUpdate = dataFromParent.recordToUpdate;
    this.getSupplierTypesFromServer();
    this.buildUpdateForm(_formBuilder);


   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.updateForm.valid) {
      this._supplierService.updateSupplier(this.updateForm.value, this._authService.currentUser.UserName, this.recordToUpdate.id)
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

  private buildUpdateForm(_formBuilder: FormBuilder) {
    this.updateForm = _formBuilder.group({
      Name: [this.recordToUpdate.Name, Validators.required],
      Email: [this.recordToUpdate.Email, Validators.required],
      SupplierTypeId: [this.recordToUpdate.id, Validators.required],
      Telephone: [this.recordToUpdate.Telephone, Validators.required],
      Address: [this.recordToUpdate.Address, Validators.required],
    });
  }
  get Name() { return this.updateForm.get('Name'); }
  get  Email() { return this.updateForm.get('Email'); }
  get SupplierTypeId() { return this.updateForm.get('SupplierTypeId'); }
  get Telephone() { return this.updateForm.get('Telephone'); }
  get Address() { return this.updateForm.get('Address'); }

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
