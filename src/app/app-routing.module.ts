import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importation du composant héros, pour le lier avec la route
import { HeroesComponent }      from './heroes/heroes.component';
import { DashboardComponent }      from './dashboard/dashboard.component';
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";
import { BlogComponent } from "./blog/blog.component";

// Constante contenant les urls et les composants correspondants.
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo:'/dashboard', pathMatch: "full" },
  { path: 'detail/:id', component: HeroDetailComponent},
  { path: 'blog', component: BlogComponent}
];

@NgModule({
  // Initialisation du routeur ("for root" indique que le module doit se lancer à la racine de l'application)
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]

})
export class AppRoutingModule { }
