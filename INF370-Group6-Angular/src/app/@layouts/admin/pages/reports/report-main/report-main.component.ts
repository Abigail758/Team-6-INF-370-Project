import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-main',
  templateUrl: './report-main.component.html',
  styleUrls: ['./report-main.component.scss']
})
export class ReportMainComponent implements OnInit {
  router: any;

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }
  
  btnMonthlyReport(){
    this._router.navigateByUrl('admin/monthlyrentalreport');
  }
  btnProgressReport(){
    this._router.navigateByUrl('admin/projectprogressreport');
  }

  btnInventoryTrackingReport(){
    this._router.navigateByUrl('/admin/inventoryreport');
  }

  btnExpenseReport(){
    this._router.navigateByUrl('/admin/expensereport');
  }

  btnSubcontractorReport(){
    this._router.navigateByUrl('/admin/subcontractoreport');
  }



}
