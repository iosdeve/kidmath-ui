import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarTopComponent } from './mathlist/navbar-top/navbar-top.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ConentComponent } from './mathlist/conent/conent.component';
import {AppRoutingModule} from './app-routing.module';
import { GameComponent } from './game/game.component';
import { MathlistComponent } from './mathlist/mathlist.component';
import {PublicService} from './shared/public.service';
import { StarsComponent } from './stars/stars.component';
import { HomeComponent } from './home/home.component';
import { TimeComponent } from './time/time.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarTopComponent,
    ConentComponent,
    GameComponent,
    MathlistComponent,
    StarsComponent,
    HomeComponent,
    TimeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PublicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
