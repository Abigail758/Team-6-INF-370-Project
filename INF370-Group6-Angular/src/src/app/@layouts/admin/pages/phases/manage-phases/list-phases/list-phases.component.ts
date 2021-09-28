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
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddPhaseTaskComponent } from '../../../tasks/manage-tasks/add-phase-task/add-phase-task.component';
import { ListPhaseTasksComponent } from '../../../tasks/manage-tasks/list-phase-tasks/list-phase-tasks.component';
import { UpdatePhaseComponent } from '../update-phase/update-phase.component';

@Component({
  selector: 'app-list-phases',
  templateUrl: './list-phases.component.html',
  styleUrls: ['./list-phases.component.scss']
})
export class ListPhasesComponent implements OnInit {
  displayedColumns: string[] = ['phaseStatusName', 'name', 'startDate', 'endDate', 'actions'];
  dataSource;

  listOfRecords: Phase[] = [];
  record: Phase;
  displayProgressSpinner = false;

  project: Project;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _snackBar: MatSnackBar,
    private _dialog:MatDialog,
    private _ngxSpinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<ListPhasesComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _phaseService: PhaseService,
    private _projectService:ProjectService,
  ) {
    this.project = dataFromParent.recordFromParent as Project;
  }

  ngOnInit(): void {
    this.getRecordsFromServer();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getRecordsFromServer() {
    this._phaseService.getProjectPhases(this.project.id).subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this._ngxSpinner.hide();
        this.listOfRecords = event.body as Phase[];

        this.dataSource = new MatTableDataSource<Phase>(this.listOfRecords);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    },
      error => {
        this._ngxSpinner.hide();
        this.openErrorMessageSnackBar(error.error.message);
      });
  }

  onUpdateRecord(record: Phase) {
    let dialogRef = this._dialog.open(UpdatePhaseComponent, {
      width: "50%",
      height: "auto",
      data: {
        recordToUpdate: record,
        recordProject:this.project
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getRecordsFromServer();
    })
  }

  onManageTasks(record:Phase){
    let dialogRef = this._dialog.open(ListPhaseTasksComponent, {
      width: "80%",
      height: "auto",
      data: {
        recordFromParent: record,
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getRecordsFromServer();
    })
  }

  onAddTask(record:Phase){
    let dialogRef = this._dialog.open(AddPhaseTaskComponent, {
      width: "50%",
      height: "auto",
      data: {
        recordFromParent: record,
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
