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
import { SystemService } from 'src/app/@api/system/system.service';
import { AppRole } from 'src/app/@api/system/system.types';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddAppRoleComponent } from '../add-app-role/add-app-role.component';
import { UpdateAppRoleComponent } from '../update-app-role/update-app-role.component';

@Component({
  selector: 'app-list-app-roles',
  templateUrl: './list-app-roles.component.html',
  styleUrls: ['./list-app-roles.component.scss']
})
export class ListAppRolesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource: any;
  listOfRecords: AppRole[] = [];
  record: AppRole;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _authService: AuthService,
    private _systemServoce:SystemService,

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
    let dialogRef = this._dialog.open(AddAppRoleComponent, {
      width: "50%",
      height: "auto"
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getRecordsFromServer();
    })
  }

  onUpdateRecord(record:AppRole) {
    let dialogRef = this._dialog.open(UpdateAppRoleComponent, {
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
    this._systemServoce.getAllAppRoles().subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this._ngxSpinner.hide();
        this.listOfRecords = event.body as AppRole[];

        this.dataSource = new MatTableDataSource<AppRole>(this.listOfRecords);
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
