import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { PhaseService } from 'src/app/@api/phase/phase.service';
import { TaskService } from 'src/app/@api/tasks/task.service';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddPhaseStatusComponent } from '../../../phases/statuses/add-phase-status/add-phase-status.component';

@Component({
  selector: 'app-add-task-status',
  templateUrl: './add-task-status.component.html',
  styleUrls: ['./add-task-status.component.scss']
})
export class AddTaskStatusComponent implements OnInit {
  errorMessage = "";
  showLoadingEndicator = false;

  addFrom: FormGroup;

  constructor(
    private _authService: AuthService,
    private _taskService:TaskService,

    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddPhaseStatusComponent>
  ) {
    this.buildAddFrom(_formBuilder);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.addFrom.valid) {
      this._taskService.addTasksStatus(this.addFrom.value, this._authService.currentUser.UserName)
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
    });
  }
  get Name() {return this.addFrom.get('Name');  }
  get Description() { return this.addFrom.get('Description');  }



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
