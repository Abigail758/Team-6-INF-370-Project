import { SupplierTypes } from './../../../../../../../@api/supplier/supplier';
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
import { SupplierService } from 'src/app/@api/supplier/supplier.service';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddSupplierTypeComponent } from '../../add-supplier-types/add-supplier-type/add-supplier-type.component';
import { UpdateSupplierTypeComponent } from '../../update-supplier-types/update-supplier-type/update-supplier-type.component';


@Component({
  selector: 'app-list-supplier-type',
  templateUrl: './list-supplier-type.component.html',
  styleUrls: ['./list-supplier-type.component.scss']
})
export class ListSupplierTypeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource: any;
  listOfRecords: SupplierTypes[] = [];
  record:  SupplierTypes;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _authService: AuthService,
    private _supplierService: SupplierService,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _ngxSpinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getRecordsFromServer();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddNew() {
    let dialogRef = this._dialog.open(AddSupplierTypeComponent, {
      width: "50%",
      height: "auto"
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getRecordsFromServer();
    })
  }

  onUpdateRecord(record: SupplierTypes) {
    let dialogRef = this._dialog.open(UpdateSupplierTypeComponent, {
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

  onDeleteRecord(username,id) {
     this._supplierService.deleteSupplierType(username,id).subscribe(event => {
       if (event.type === HttpEventType.Sent) {
         this._ngxSpinner.show();
       }
       if (event.type === HttpEventType.Response) {
         this.getRecordsFromServer();
         this._ngxSpinner.hide();
        this.openSnackBar("Delete Supplier type", "Success!", 2000);
      }
     });
  }

  private getRecordsFromServer() {
    this._supplierService.getAllSupplierTypes().subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this._ngxSpinner.hide();
        this.listOfRecords = event.body as SupplierTypes[];

        this.dataSource = new MatTableDataSource<SupplierTypes>(this.listOfRecords);
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
