import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home/home.component';
import { GlobalConfirmDeletionComponent } from './modals/global/global-confirm-deletion/global-confirm-deletion.component';
import { GlobalErrorComponent } from './modals/global/global-error/global-error.component';
import { GloConfirmAddeditComponent } from './modals/global/glo-confirm-addedit/glo-confirm-addedit.component';


export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GlobalConfirmDeletionComponent,
    GlobalErrorComponent,
    GloConfirmAddeditComponent
   
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
 
    SharedModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.endpointBase.replace("/api/","")],
      },
    }),
  ],
  
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
