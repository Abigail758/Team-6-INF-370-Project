import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { PhaseService } from 'src/app/@api/phase/phase.service';
import { AssignEquipment } from 'src/app/@api/equipment/equipment.types';
import { ProjectService } from 'src/app/@api/projects/project.service';
import { Project } from 'src/app/@api/projects/project.types';
import { EquipmentService } from 'src/app/@api/equipment/equipment.service';
import { Equipment } from 'src/app/@api/equipment/equipment.types';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddPhaseTaskComponent } from '../../../tasks/manage-tasks/add-phase-task/add-phase-task.component';
import { ListPhaseTasksComponent } from '../../../tasks/manage-tasks/list-phase-tasks/list-phase-tasks.component';


@Component({
  selector: 'app-list-equipment',
  templateUrl: './list-equipment.component.html',
  styleUrls: ['./list-equipment.component.scss']
})
export class ListEquipmentComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Description', 'condition', 'Quantity'];
  dataSource;

  listOfRecords: Equipment[] = [];
  record: Equipment;
  displayProgressSpinner = false;

  equipment: Equipment;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _snackBar: MatSnackBar,
    private _dialog:MatDialog,
    private _ngxSpinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<ListEquipmentComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _equipmentService: EquipmentService,
    private _projectService:ProjectService,
  ) {
    this.equipment = dataFromParent.recordFromParent as Equipment;
  }

  ngOnInit(): void {
    this.getRecordsFromServer();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getRecordsFromServer() {
    this._equipmentService.getAllEquipment().subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this._ngxSpinner.hide();
        this.listOfRecords = event.body as Equipment[];

        this.dataSource = new MatTableDataSource<Equipment>(this.listOfRecords);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    },
      error => {
        this._ngxSpinner.hide();
        this.openErrorMessageSnackBar(error.error.message);
      });
  }

  //onUpdateRecord(record: Equipment) {
    //let dialogRef = this._dialog.open(UpdateEquipmentComponent, {
     // width: "50%",
     // height: "auto",
     // data: {
        //recordToUpdate: record,
        //recordProject:this.equipment
      //}
    //});

   // dialogRef.afterClosed().subscribe(res => {
      //this.getRecordsFromServer();
   // })
  //}

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