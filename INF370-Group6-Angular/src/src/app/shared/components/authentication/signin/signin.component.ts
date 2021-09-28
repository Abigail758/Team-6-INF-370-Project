import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/@api/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;

  errorMessage = "";
  showLoadingEndicator = false;
  submitButtonText = "Sign In";
  submitButtonDiabled = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    loginFb: FormBuilder,

  ) {
    this.loginForm = loginFb.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  get UserName() {
    return this.loginForm.get('UserName');
  }

  get Password() {
    return this.loginForm.get('Password');
  }

  signIn() {
    this.errorMessage = "";

    if (this.loginForm.valid) {
      this._authService.signIn(this.loginForm.value)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.showLoadingEndicator = true;
          }
          if (event.type === HttpEventType.Response) {
            this.showLoadingEndicator = false;

            localStorage.setItem('token',  event.body['token']);

            let returnUrl = this._route.snapshot.queryParamMap.get('returnUrl');
            if (this._authService.currentUser != null) {

              this._router.navigate([returnUrl || '/admin/projects']);

            }
          }
        },
          error => {
            this.showLoadingEndicator = false;
            this.errorMessage = error.error.message;
          })
    }

  }

  forgotPassword() {
    this._router.navigate([''])
  }
}
