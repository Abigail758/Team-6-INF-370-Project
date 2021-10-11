import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-account-time-out',
  templateUrl: './account-time-out.component.html',
  styleUrls: ['./account-time-out.component.scss']
})
export class AccountTimeOutComponent implements OnInit {

  timer = 10;
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {}

}
