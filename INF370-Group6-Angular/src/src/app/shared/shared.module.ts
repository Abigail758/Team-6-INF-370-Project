import { SigninComponent } from './components/authentication/signin/signin.component';
import { NgModule } from "@angular/core";
import { ProgressSpinnerComponent } from './loaders/progress-spinner/progress-spinner.component';
import { AppOverlayModule } from './loaders/overlay/overlay.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../@material/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppOverlayModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [
    ProgressSpinnerComponent,
    SigninComponent
  ],
  entryComponents: [
  ],
  exports: [
    CommonModule,
    MaterialModule,
    ProgressSpinnerComponent,
    AppOverlayModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,


    SigninComponent]
})
export class SharedModule { }
