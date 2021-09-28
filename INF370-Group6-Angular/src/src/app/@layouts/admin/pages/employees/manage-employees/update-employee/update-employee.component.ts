import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { EmployeeService } from 'src/app/@api/employee/employee.service';
import { Employee, EmployeeType } from 'src/app/@api/employee/employee.types';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  errorMessage = "";
  showLoadingEndicator = false;

  updateForm: FormGroup;
  recordToUpdate: Employee;

  listOfEmployeeTypes: EmployeeType[] = [];



  constructor(
    private _authService: AuthService,
    private _employeeService: EmployeeService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    private _ngxSpinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,

  ) {
    this.recordToUpdate = dataFromParent.recordToUpdate;
    this.getEmployeeTypesFromServer();
    this.buildUpdateForm(_formBuilder);

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.updateForm.valid) {
      this._employeeService.updateEmployee(this.updateForm.value, this._authService.currentUser.UserName, this.recordToUpdate.emailAddress)
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

  private getEmployeeTypesFromServer() {
    this._employeeService.getAllEmployeeTypes().subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this._ngxSpinner.hide();
        this.listOfEmployeeTypes = event.body as EmployeeType[];
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
      Surname: [this.recordToUpdate.surname, Validators.required],
      EmployeeTypeId: [this.recordToUpdate.employeeTypeId, Validators.required],
      IdNumber: [this.recordToUpdate.idNumber, Validators.required],
      PhoneNumber: [this.recordToUpdate.phoneNumber, Validators.required],
      Address: [this.recordToUpdate.address, Validators.required],
    });
  }
  get Name() { return this.updateForm.get('Name'); }
  get Surname() { return this.updateForm.get('Surname'); }
  get EmployeeTypeId() { return this.updateForm.get('EmployeeTypeId'); }
  get IdNumber() { return this.updateForm.get('IdNumber'); }
  get PhoneNumber() { return this.updateForm.get('PhoneNumber'); }
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
