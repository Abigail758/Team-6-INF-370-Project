import { HomeComponent } from './home/home/home.component';
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
