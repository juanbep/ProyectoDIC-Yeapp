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

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    Facturav1Component,
    ValuePayComponent
  ],
  imports: [
    BrowserModule,LucideAngularModule.pick({File, Home, Menu, UserCheck,BarChart3,WalletCards}), BrowserAnimationsModule,
    MatToolbarModule,MatCardModule, MatButtonModule, MatListModule, MatDividerModule, MatGridListModule,MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
