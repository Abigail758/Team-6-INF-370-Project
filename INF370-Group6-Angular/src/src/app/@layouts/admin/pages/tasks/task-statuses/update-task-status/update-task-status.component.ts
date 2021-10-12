import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { PhaseService } from 'src/app/@api/phase/phase.service';
import { PhaseStatus } from 'src/app/@api/phase/phase.types';
import { TaskService } from 'src/app/@api/tasks/task.service';
import { TaskStatus } from 'src/app/@api/tasks/task.types';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-update-task-status',
  templateUrl: './update-task-status.component.html',
  styleUrls: ['./update-task-status.component.scss']
})
export class UpdateTaskStatusComponent implements OnInit {
  errorMessage = "";
  showLoadingEndicator = false;

  updateForm: FormGroup;
  recordToUpdate: TaskStatus;


  constructor(
    private _authService: AuthService,
    private _taskService: TaskService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateTaskStatusComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,

  ) {
    this.recordToUpdate = dataFromParent.recordToUpdate;
    this.buildupdateForm(_formBuilder);

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.updateForm.valid) {
      this._taskService.updateTasksStatus(this.updateForm.value,this._authService.currentUser.UserName,this.recordToUpdate.id)
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

  private buildupdateForm(_formBuilder: FormBuilder) {
    this.updateForm = _formBuilder.group({
      Name: [this.recordToUpdate.name, Validators.required],
      Description: [this.recordToUpdate.description, Validators.required],
    });
  }
  get Name() {
    return this.updateForm.get('Name');
  }
  get Description() {
    return this.updateForm.get('Description');
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
