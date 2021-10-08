import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-global-confirm-deletion',
  templateUrl: './global-confirm-deletion.component.html',
  styleUrls: ['./global-confirm-deletion.component.scss']
})
export class GlobalConfirmDeletionComponent implements OnInit {

 /**
   * 
   * @param dialogRef {MatDialogRef<GlobalConfirmComponent>} this parameter controls the modal component and can call methods to close the modal
   */
  constructor(private dialogRef: MatDialogRef<GlobalConfirmDeletionComponent>) { }

  ngOnInit(): void {
  }

  /**
   * Once yes is clicked the modal will close with an argument of true to indicate that the deletion was confirmed.
   */
  Confirm(): void {
    this.dialogRef.close(true);
  }

  /**
   * Once no is clicked the modal will close with an argument of false to indicate that the deletion was not confirmed.
   */
  Cancel(): void {
    this.dialogRef.close(false);
  }

}
