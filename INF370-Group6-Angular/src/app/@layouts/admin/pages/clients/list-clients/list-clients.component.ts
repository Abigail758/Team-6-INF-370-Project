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
import { ClientService } from 'src/app/@api/client/client.service';
import { Client } from 'src/app/@api/client/client';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddClientComponent } from '../add-client/add-client.component';
import { UpdateClientComponent } from '../update-client/update-client.component';


@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss']
})

export class ListClientsComponent implements OnInit {
  displayedColumns: string[] = ['clientName', 'clientAddress', 'contactPerson', 'emailAddress', 'actions'];
  dataSource: any;
  listOfRecords: Client[] = [];
  record: Client;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private _authService: AuthService,
    private _clientService: ClientService,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _ngxSpinner: NgxSpinnerService,
  ) { }

  

  ngOnInit(): void {
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddClient() {
    let dialogRef = this._dialog.open(AddClientComponent, {
      width: "50%",
      height: "auto"
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getRecordsFromServer();
    })
  }

  onUpdateRecord(record: Client) {
    let dialogRef = this._dialog.open(UpdateClientComponent, {
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

  // onDeleteRecord(record) {
  //    this._clientService.deleteClient(record.routeId,this.record.id).subscribe(event => {
  //      if (event.type === HttpEventType.Sent) {
  //        this._ngxSpinner.show();
  //     }
  //      if (event.type === HttpEventType.Response) {
  //       this.getRecordsFromServer();
  //       this._ngxSpinner.hide();
  //        this.openSnackBar("Delete Client", "Success!", 2000);
  //     }
  //    });
  // }

  deleteClient(id: number ) {
    const confirm = this._dialog.open(GlobalConfirmDeletionComponent, {
        disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if(res) {
        this._clientService.deleteClient( this._authService.currentUser.UserName,this.record.id);
        this.getRecordsFromServer();
      }
    });
  }

 

  private getRecordsFromServer() {
    this._clientService.getAllClients().subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this._ngxSpinner.hide();
        this.listOfRecords = event.body as Client[];

        this.dataSource = new MatTableDataSource<Client>(this.listOfRecords);
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
