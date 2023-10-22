import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Facturav1Component } from './factura/facturav1/facturav1.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { StatusCComponent } from './status-c/status-c.component';
import { PayCComponent } from './pay-c/pay-c.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'',component:SideBarComponent},
  {path:'factC',component:Facturav1Component},
  {path:'statC',component:StatusCComponent},
  {path:'payC',component:PayCComponent},
  {path:'login',component:LoginComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
