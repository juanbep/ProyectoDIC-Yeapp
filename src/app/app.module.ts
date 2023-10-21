import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideBarComponent } from './componets/side-bar/side-bar.component';
//icons
import { LucideAngularModule, File, Home, Menu, UserCheck,BarChart3,WalletCards } from 'lucide-angular';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,LucideAngularModule.pick({File, Home, Menu, UserCheck,BarChart3,WalletCards})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
