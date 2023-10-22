import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Facturav1Component } from './factura/facturav1/facturav1.component';
import { SideBarComponent } from './side-bar/side-bar.component';


const routes: Routes = [
  {path:'',component:SideBarComponent},
  {path:'factC',component:Facturav1Component},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
