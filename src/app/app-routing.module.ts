import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ConentComponent} from './mathlist/conent/conent.component';
import {GameComponent} from './game/game.component';
import {NavbarTopComponent} from './mathlist/navbar-top/navbar-top.component';
import {MathlistComponent} from './mathlist/mathlist.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'list', component: MathlistComponent},
  { path: 'game', component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
