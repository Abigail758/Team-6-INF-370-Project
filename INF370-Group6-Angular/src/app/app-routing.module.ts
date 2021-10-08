import { HomeComponent } from './home/home/home.component';
import { GlobalConfirmDeletionComponent } from './modals/global/global-confirm-deletion/global-confirm-deletion.component';
import { GlobalErrorComponent } from './modals/global/global-error/global-error.component'; 

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './shared/components/authentication/signin/signin.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'admin', loadChildren: () => import('./@layouts/admin/admin.module').then(m => m.AdminModule) },
  // { path: '', redirectTo: 'signin', pathMatch: 'full' },
  // { path: '**', redirectTo: 'signin' },
 
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
  { path: 'confirm-modal', component: GlobalConfirmDeletionComponent },
  { path: 'error-modal', component: GlobalErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
