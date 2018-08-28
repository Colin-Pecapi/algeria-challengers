import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

// Permet d'envoyer des requêtes asynchrone
import { Observable, of } from 'rxjs';

/**
 * Le service permet de récupérer l'information
 * Il permet de entre autre de pouvoir changer la technologie de stockage de données de façon trensparente.
 */
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  /**
   * Requête tous les héros de façon asynchrone
   */
  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }
  
  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }


  constructor(private messageService: MessageService) { }
}
