import { Equipment } from 'src/app/@api/equipment/equipment';
import { EquipmentService } from './../../../../../@api/equipment/equipment.service';
import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.scss']
})
export class AddEquipmentComponent implements OnInit {
  errorMessage = "";
  showLoadingEndicator = false;

  addForm: FormGroup;

  listOfEquipment: Equipment[] = [];

  constructor(
    private _authService: AuthService,
    private _equipmentService: EquipmentService,

    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _ngxSpinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<AddEquipmentComponent>
  ) {
   
    this.createAddForm(_formBuilder);
  }


  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.addForm.valid) 
    if(confirm('Are you sure you want to add equipment details?')) 
    {
      this._equipmentService.addEquipment(this.addForm.value, this._authService.currentUser.UserName)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.showLoadingEndicator = true;
          }
          if (event.type === HttpEventType.Response) {
            this.showLoadingEndicator = false;
            this.openSnackBar("Equipment details were successfully added!", "", 2000);
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
      EquipmentName: ["", Validators.required],
      EquipmentDescription: ["", Validators.required],
      EquipmentCondition: ["", Validators.required],
      Quantity: ["", Validators.required],
      
    });
    
  }
  get EquipmentName() { return this.addForm.get('EquipmentName'); }
  get EquipmentDescription() { return this.addForm.get('EquipmentDescription'); }
  get EquipmentCondition() { return this.addForm.get('EquipmentCondition'); }
  get Quantity() { return this.addForm.get('Quantity'); }


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
