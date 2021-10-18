import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { PhaseService } from 'src/app/@api/phase/phase.service';
import { Phase, PhaseStatus } from 'src/app/@api/phase/phase.types';
import { ProjectService } from 'src/app/@api/projects/project.service';
import { TaskService } from 'src/app/@api/tasks/task.service';
import { Task, TaskStatus } from 'src/app/@api/tasks/task.types';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';
import { UpdatePhaseComponent } from '../../../phases/manage-phases/update-phase/update-phase.component';

@Component({
  selector: 'app-update-phase-task',
  templateUrl: './update-phase-task.component.html',
  styleUrls: ['./update-phase-task.component.scss']
})
export class UpdatePhaseTaskComponent implements OnInit {
  errorMessage = "";
  showLoadingEndicator = false;

  updateForm: FormGroup;
  recordToUpdate: Task;
  recordPhase: Phase;

  listOfTaskStatuses: TaskStatus[] = [];

  constructor(
    private _authService: AuthService,
    private _projectService: ProjectService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdatePhaseComponent>,
    private _ngxSpinner: NgxSpinnerService,
    private _phaseService: PhaseService,
    private _taskService:TaskService,

    @Inject(MAT_DIALOG_DATA) dataFromParent: any,

  ) {
    this.recordToUpdate = dataFromParent.recordToUpdate;
    this.recordPhase = dataFromParent.recordPhase;
    this.getTaskStatuses();
    this.buildUpdateForm(_formBuilder);

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.updateForm.valid) {
      this._taskService.updateTasks(this.updateForm.value, this._authService.currentUser.UserName, this.recordToUpdate.id)
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

  private buildUpdateForm(_formBuilder: FormBuilder) {
    this.updateForm = _formBuilder.group({
      Name: [this.recordToUpdate.name, Validators.required],
      Description: [this.recordToUpdate.description, Validators.required],
      TaskStatusId: [this.recordToUpdate.taskStatusId, Validators.required],
      PhaseId: [this.recordToUpdate.phaseId],
      StartDate: [this.recordToUpdate.rawStartDate, Validators.required],
      EndDate: [this.recordToUpdate.rawEndDate, Validators.required],
    });
  }
  get Name() { return this.updateForm.get('Name'); }
  get Description() { return this.updateForm.get('Description'); }
  get TaskStatusId() { return this.updateForm.get('TaskStatusId'); }
  get PhaseId() { return this.updateForm.get('PhaseId'); }
  get StartDate() { return this.updateForm.get('StartDate'); }
  get EndDate() { return this.updateForm.get('EndDate'); }




  private getTaskStatuses() {
    this._taskService.getAllTasksStatuses().subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this._ngxSpinner.hide();
        this.listOfTaskStatuses = event.body as TaskStatus[];
      }
    },
      error => {
        this._ngxSpinner.hide();
        this.openErrorMessageSnackBar(error.error.message);
      });
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

  private closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }


}
