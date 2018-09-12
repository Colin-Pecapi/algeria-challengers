import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from "./blog/blog.component";
import { NavigationComponent } from './navigation/navigation.component';
import { PostListComponent } from './post-list/post-list.component';

// Constante contenant les urls et les composants correspondants.
const routes: Routes = [
  // { path: '', redirectTo:'/dashboard', pathMatch: "full" },
  { path: 'category/:category', component: PostListComponent},
  { path: ':any/:post', component: BlogComponent},
  { path: '', component: BlogComponent},

];

@NgModule({
  // Initialisation du routeur ("for root" indique que le module doit se lancer à la racine de l'application)
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
