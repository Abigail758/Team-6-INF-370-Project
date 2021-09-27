import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-side-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.scss']
})
export class AdminSideNavComponent implements OnInit {

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  onNavigateToNotYetSentApplications() {
    this._router.navigate(["/admin/applications/not-yet-sent"]);
  }

  onNavigateToApplicationsSentToBrokers() {
    this._router.navigate(["/admin/applications/sent"]);
  }

  onNavigateToApplicationsReceivedFromBrokers() {
    this._router.navigate(["/admin/applications/broker/received"]);
  }

}
