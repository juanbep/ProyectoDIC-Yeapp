import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideBarComponent } from './componets/side-bar/side-bar.component';
//icons
import { LucideAngularModule, File, Home, Menu, UserCheck,BarChart3,WalletCards } from 'lucide-angular';
import { ValuePayComponent } from './componets/value-pay/value-pay.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    ValuePayComponent
  ],
  imports: [
    BrowserModule,LucideAngularModule.pick({File, Home, Menu, UserCheck,BarChart3,WalletCards}), BrowserAnimationsModule,MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
