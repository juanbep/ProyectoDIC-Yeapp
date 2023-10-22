import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideBarComponent } from './componets/side-bar/side-bar.component';
//icons
import { LucideAngularModule, File, Home, Menu, UserCheck,BarChart3,WalletCards } from 'lucide-angular';
import { ValuePayComponent } from './componets/value-pay/value-pay.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import { Facturav1Component } from './componets/factura/facturav1/facturav1.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProgressComponent } from './componets/progress/progress.component';
import { AppRoutingModule } from './componets/app-routing.module';
import { StatusCComponent } from './componets/status-c/status-c.component';
import {MatTableModule} from '@angular/material/table';
import { PayCComponent } from './componets/pay-c/pay-c.component';
@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    Facturav1Component,
    ValuePayComponent,
    ProgressComponent,
    StatusCComponent,
    PayCComponent
  ],
  imports: [
    BrowserModule,LucideAngularModule.pick({File, Home, Menu, UserCheck,BarChart3,WalletCards}), BrowserAnimationsModule,
    MatToolbarModule,MatCardModule, MatButtonModule, MatListModule, MatDividerModule, 
    MatGridListModule,MatExpansionModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    AppRoutingModule,MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
