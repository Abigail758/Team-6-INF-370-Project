import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  username = "";
  environmentName = "";

  constructor(private _router: Router, private _authService: AuthService) {
  }

  ngOnInit(): void {
    this.username = this._authService.currentUser.UserName;
  }

  onNavigateToApplicants() {
    this._router.navigate(['/admin/applicants']);
  }

  onNavigateToSentApplications() {
  }

  onNavigateToPlans() {
    this._router.navigate(['/admin/plans']);
  }

  onNavigateToApplicationsNotYetSent() {
    this._router.navigate(['/admin/applications/not-yet-sent']);
  }

  onNavigateToRequestCalls() {
    this._router.navigate(['/admin/request-calls']);
  }

  onNavigateToContactUsMessages() {
    this._router.navigate(['/admin/contact-us-messages']);
  }

  onNavigateToCompanyGroups() {
    this._router.navigate(['/admin/company-groups']);
  }

  onNavigateToBrokers() {
    this._router.navigate(['/admin/brokers']);
  }

  onSignOut() {
    this._authService.signOut();
  }
}

