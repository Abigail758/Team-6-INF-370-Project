import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { PhaseService } from 'src/app/@api/phase/phase.service';
import { Phase } from 'src/app/@api/phase/phase.types';
import { ProjectService } from 'src/app/@api/projects/project.service';
import { Project } from 'src/app/@api/projects/project.types';
import { TaskService } from 'src/app/@api/tasks/task.service';
import { Task } from 'src/app/@api/tasks/task.types';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';
import { ListPhasesComponent } from '../../../phases/manage-phases/list-phases/list-phases.component';
import { UpdatePhaseComponent } from '../../../phases/manage-phases/update-phase/update-phase.component';
import { UpdatePhaseTaskComponent } from '../update-phase-task/update-phase-task.component';

@Component({
  selector: 'app-list-phase-tasks',
  templateUrl: './list-phase-tasks.component.html',
  styleUrls: ['./list-phase-tasks.component.scss']
})
export class ListPhaseTasksComponent implements OnInit {
  displayedColumns: string[] = ['taskStatusName', 'name', 'startDate', 'endDate', 'actions'];
  dataSource;

  listOfRecords: Task[] = [];
  record: Phase;
  displayProgressSpinner = false;

  phase: Phase;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _ngxSpinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<ListPhasesComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _phaseService: PhaseService,
    private _projectService: ProjectService,
    private _taskService: TaskService
  ) {
    this.phase = dataFromParent.recordFromParent as Phase;
  }

  ngOnInit(): void {
    this.getRecordsFromServer();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getRecordsFromServer() {
    this._taskService.getAllPhaseTasks(this.phase.id).subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this._ngxSpinner.hide();
        this.listOfRecords = event.body as Task[];

        this.dataSource = new MatTableDataSource<Task>(this.listOfRecords);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    },
      error => {
        this._ngxSpinner.hide();
        this.openErrorMessageSnackBar(error.error.message);
      });
  }

  onUpdateRecord(record: Task) {
    let dialogRef = this._dialog.open(UpdatePhaseTaskComponent, {
      width: "50%",
      height: "auto",
      data: {
        recordToUpdate: record,
        recordPhase:this.phase
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getRecordsFromServer();
    })
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
