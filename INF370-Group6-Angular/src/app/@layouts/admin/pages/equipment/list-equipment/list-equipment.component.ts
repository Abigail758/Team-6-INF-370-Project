
import { GlobalConfirmDeletionComponent } from './../../../../../modals/global/global-confirm-deletion/global-confirm-deletion.component';
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
import { EquipmentService } from 'src/app/@api/equipment/equipment.service'; 
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddEquipmentComponent } from '../add-equipment/add-equipment.component'; 
import { UpdateEquipmentComponent } from '../update-equipment/update-equipment.component'; 
import { Equipment } from 'src/app/@api/equipment/equipment';


@Component({
  selector: 'app-list-equipment',
  templateUrl: './list-equipment.component.html',
  styleUrls: ['./list-equipment.component.scss']
})
export class ListEquipmentComponent implements OnInit {
  displayedColumns: string[] = ['equipmentName', 'equipmentDescription', 'equipmentCondition', 'quantity', 'actions'];

  dataSource: any;
  listOfRecords: Equipment[] = [];
  record: Equipment;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(    
    private _authService: AuthService,
    private _equipmentService: EquipmentService,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _ngxSpinner: NgxSpinnerService,) { }


  ngOnInit(): void {
    this.getRecordsFromServer();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddEquipment() {
    let dialogRef = this._dialog.open(AddEquipmentComponent, {
      width: "50%",
      height: "auto"
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getRecordsFromServer();
    })
  }

  onUpdateRecord(record: Equipment) {
    let dialogRef = this._dialog.open(UpdateEquipmentComponent, {
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



 
  
  deleteEquipment( id: number) {
    if(confirm('Are you sure you want to delete the equipment record')){     
         this._equipmentService.deleteEquipment( this._authService.currentUser.UserName,id).subscribe(res => {
            this.openSnackBar("Equipment record was successfully deleted!", "", 2000);
            this.getRecordsFromServer();
          }
         )};
      };
 

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
