import { Equipment } from 'src/app/@api/equipment/equipment';
import { EquipmentService } from './../../../../../@api/equipment/equipment.service';
import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-update-equipment',
  templateUrl: './update-equipment.component.html',
  styleUrls: ['./update-equipment.component.scss']
})
export class UpdateEquipmentComponent implements OnInit {

  errorMessage = "";
  showLoadingEndicator = false;

  updateForm : FormGroup;
  recordToUpdate: Equipment;

 

  constructor(   
    private _authService: AuthService,
    private _equipmentService: EquipmentService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _ngxSpinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<UpdateEquipmentComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,) {

    this.recordToUpdate = dataFromParent.recordToUpdate;
    this.createUpdateForm(_formBuilder);

     }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.updateForm.valid)
    if(confirm('Are you sure you want to update equipment details?'))  {
      this._equipmentService.updateEquipment(this.updateForm.value, this._authService.currentUser.UserName,this.recordToUpdate.id)    
      .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.showLoadingEndicator = true;
          }
          if (event.type === HttpEventType.Response) {
            this.showLoadingEndicator = false;
            this.openSnackBar("Equipment details were successfully updated!", "Success!", 2000);
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
      EquipmentName: [this.recordToUpdate.equipmentName, Validators.required],
      EquipmentDescription: [this.recordToUpdate.equipmentDescription, Validators.required],
      EquipmentCondition: [this.recordToUpdate.equipmentCondition, Validators.required],
      Quantity: [this.recordToUpdate.quantity, Validators.required],
      
    });
  }


  get EquipmentName() { return this.updateForm.get('EquipmentName'); }
  get EquipmentDescription() { return this.updateForm.get('EquipmentDescription'); }
  get EquipmentCondition() { return this.updateForm.get('EquipmentCondition'); }
  get Quantity() { return this.updateForm.get('Quantity'); }


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
