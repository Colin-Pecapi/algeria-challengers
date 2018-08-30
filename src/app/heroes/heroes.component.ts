import { Component, OnInit } from '@angular/core';
import { Hero} from '../hero'
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
        .subscribe(heroes => this.heroes = heroes);
  }

  add(name : string): void{
    name = name.trim();
    if(!name){
      return;
    }


    let tata = this.heroService.addHero({ name } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
    // Est ce que ça marche aussi ?

    this.selectedHero = {
      id : null,
      name: name
    };

    //let toto = this.heroService.addHero(this.selectedHero);
  }


}
