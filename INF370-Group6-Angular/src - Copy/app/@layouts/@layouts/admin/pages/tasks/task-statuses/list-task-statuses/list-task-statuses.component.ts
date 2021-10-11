import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { PhaseService } from 'src/app/@api/phase/phase.service';
import { PhaseStatus } from 'src/app/@api/phase/phase.types';
import { TaskService } from 'src/app/@api/tasks/task.service';
import { TaskStatus } from 'src/app/@api/tasks/task.types';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddPhaseStatusComponent } from '../../../phases/statuses/add-phase-status/add-phase-status.component';
import { UpdatePhaseStatusComponent } from '../../../phases/statuses/update-phase-status/update-phase-status.component';
import { AddTaskStatusComponent } from '../add-task-status/add-task-status.component';
import { UpdateTaskStatusComponent } from '../update-task-status/update-task-status.component';

@Component({
  selector: 'app-list-task-statuses',
  templateUrl: './list-task-statuses.component.html',
  styleUrls: ['./list-task-statuses.component.scss']
})
export class ListTaskStatusesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource: any;
  listOfRecords: TaskStatus[] = [];
  record: TaskStatus;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _authService: AuthService,
    private _taskService: TaskService,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _ngxSpinner: NgxSpinnerService,

  ) {
  }

  ngOnInit(): void {
    this.getRecordsFromServer();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddNew() {
    let dialogRef = this._dialog.open(AddTaskStatusComponent, {
      width: "50%",
      height: "auto"
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getRecordsFromServer();
    })
  }

  onUpdateRecord(record: TaskStatus) {
    let dialogRef = this._dialog.open(UpdateTaskStatusComponent, {
      width: "50%",
      height: "auto",
      data: {
        recordToUpdate: record,
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getRecordsFromServer();
    })
  }

  onDeleteRecord(record) {
    // this._brokerService.deleteBroker(record.routeId).subscribe(event => {
    //   if (event.type === HttpEventType.Sent) {
    //     this._ngxSpinner.show();
    //   }
    //   if (event.type === HttpEventType.Response) {
    //     this.getRecordsFromServer();
    //     this._ngxSpinner.hide();
    //     this.openSnackBar("Delete Broker", "Success!", 2000);
    //   }
    // });
  }

  private getRecordsFromServer() {
    this._taskService.getAllTasksStatuses().subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this._ngxSpinner.hide();
        this.listOfRecords = event.body as PhaseStatus[];

        this.dataSource = new MatTableDataSource<PhaseStatus>(this.listOfRecords);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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
}
