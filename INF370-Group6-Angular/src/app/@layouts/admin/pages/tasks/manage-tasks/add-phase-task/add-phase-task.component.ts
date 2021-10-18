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
import { Project } from 'src/app/@api/projects/project.types';
import { TaskService } from 'src/app/@api/tasks/task.service';
import { TaskStatus } from 'src/app/@api/tasks/task.types';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddPhaseComponent } from '../../../phases/manage-phases/add-phase/add-phase.component';

@Component({
  selector: 'app-add-phase-task',
  templateUrl: './add-phase-task.component.html',
  styleUrls: ['./add-phase-task.component.scss']
})
export class AddPhaseTaskComponent implements OnInit {
  errorMessage = "";
  showLoadingEndicator = false;

  addFrom: FormGroup;
  listOfTaskStatuses: PhaseStatus[] = [];

  phase: Phase;


  constructor(
    private _authService: AuthService,
    private _projectService: ProjectService,
    private _phaseService: PhaseService,
    private _taskService:TaskService,

    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _ngxSpinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<AddPhaseComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,

  ) {
    this.phase = dataFromParent.recordFromParent as Phase;

    this.getTaskStatuses();
    this.buildAddFrom(_formBuilder);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    this.addFrom.controls["PhaseId"].setValue(this.phase.id)
    if (this.addFrom.valid) 
    if(confirm('Are you sure you want to add a new task?')){
      this._taskService.addTasks(this.addFrom.value, this._authService.currentUser.UserName)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.showLoadingEndicator = true;
          }
          if (event.type === HttpEventType.Response) {
            this.showLoadingEndicator = false;
            this.openSnackBar("Task has been successfully added!", "", 10000);
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
      TaskStatusId: ["", Validators.required],
      PhaseId: [""],
      StartDate: ["", Validators.required],
      EndDate: ["", Validators.required],
    });
  }
  get Name() { return this.addFrom.get('Name'); }
  get Description() { return this.addFrom.get('Description'); }
  get TaskStatusId() { return this.addFrom.get('TaskStatusId'); }
  get PhaseId() { return this.addFrom.get('PhaseId'); }
  get StartDate() { return this.addFrom.get('StartDate'); }
  get EndDate() { return this.addFrom.get('EndDate'); }




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
