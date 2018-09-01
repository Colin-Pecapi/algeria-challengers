import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // Attributs
  // Unused
  selectedHero: Hero;

  heroes: Hero[] = [];

  // Initialiseurs
  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.getHeroes();
  }


  // Méthodes

  /**
   * @Unused
   * @param hero 
   */
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  /**
   * Requête de héros à travers le service.
   * 
   */
  getHeroes(): void {
    // Comme le service est asynchrone, la fonction anonyme est exècuté quand le serveur répond.
    this.heroService.getHeroes()
      .subscribe(
        heroes => 
        this.heroes = heroes
      );
  }

  /**
   * Ajoute un héro
   * @param name 
   */
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }


    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
    // Est ce que ça marche aussi ?

    this.selectedHero = {
      id: null,
      name: name
    };

    //let toto = this.heroService.addHero(this.selectedHero);
  }

  /**
   * Supprime un héro dans la liste et sur le serveur
   * @param id Identifiant du héro
   */
  delete(hero: Hero): void {

    // Supprime le héro dans la liste.
    // Cette fonction retourne tous les occurences qui ne correpondent pas au héro
    this.heroes = this.heroes.filter(h => h.id !== hero.id)

    this.heroService.deleteHero(hero).subscribe();
  }

}