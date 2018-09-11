import { Injectable } from '@angular/core';
import { Hero } from './hero';
// @deprecated
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

// Permet d'envoyer des requêtes asynchrone
import { Observable, of } from 'rxjs';

// Requête en http
import { HttpClient, HttpHeaders } from "@angular/common/http";

// Gestion des erreurs
import { catchError, map, tap } from "rxjs/operators";

import { Subject, throwError } from 'rxjs';

/** Options http */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


/**
 * Le service permet de récupérer l'information
 * Il permet de entre autre de pouvoir changer la technologie de stockage de données de façon transparente.
 */
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  /*************** Attributs ***************/

  /** Url de l'api http contenant les héros  */
  private heroesUrl = 'api/heroes';
  // private heroesUrl = 'http://factory.devtvornica.org/api/wp-json/wp/v2/posts?slug=hello-world';

  /** Héro sélectionné  */
  private currentHero: Hero;
  /** Liste des héros   */
  private heroes: Hero[];



  /*************** Méthodes ***************/


  /** 
   * GET heroes from the HTTP server
   */
  getHeroes(): Observable<any[]> {
    return this.http.get<any[]>(this.heroesUrl)
      .pipe(
        // The HeroService methods will tap into the flow of observable values 
        // and send a message (via log()) to the message area at the bottom of the page.
        // Tap, quand ça se passe bien :
        tap(
          heroes => this.log(`OK : fetched heroes : ${heroes.length}`)),
        catchError(
          this.handleError('KO : getHeroes', []))
      );
  }


  /** 
   * GET hero by id. Will 404 if id not found
   * 
   * @param id 
   */
  getHero(id: number): Observable<any> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<any>(url).pipe(

      tap(
        _ => this.log(`OK : fetched hero id=${id}`)),

      catchError(
        this.handleError<Hero>(`KO : getHero id=${id}`))
    );
  }

  /**
   * PUT : modifie un héro
   * @param hero 
   */
  updateHeroe(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`Hero ${hero.id} updated`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  /**
   * POST : Ajoute un héro
   * @param hero 
   */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap(
        (hero: Hero) =>
          this.log(`added hero w/ id=${hero.id}`)
      ),
      catchError(
        this.handleError<Hero>('addHero')
      )
    );
  }

  /**
   * DELETE : Ajoute un héro
   * @param hero number 
   */
  deleteHero(hero: Hero | number): Observable<Hero[]> {
    // récupère l'id 
    const id = (typeof hero === 'number') ? (hero) : (hero.id);
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero[]>(url, httpOptions).pipe(
      tap(_ =>
        this.log(`deleted hero id=${id}`)),
      catchError(
        this.handleError<Hero[]>('serchHero', [])
      )
    );
  }
  /**
   * Cherche les héros en fonction des critères
   * @param term Critères de recherche
   */
  searchHeroe(term: string): Observable<Hero[]> {
    // const url = `${this.heroesUrl}/?name=Magneta`;
    const url = `${this.heroesUrl}/?name=${term}`;
    return this.http.get<Hero[]>(url, httpOptions).pipe(
      tap( _ => this.log(`Many heroes matching term : "${term}"`)),
        catchError(
          this.handleError<Hero[]>('searchHeroe')
        )
      );
  }


  /** 
   * Log a HeroService message with the MessageService 
   * 
   * @param message 
   */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.body.error}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * 
   * @param http 
   * @param messageService 
   */
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /**
   * Méthodes qui ne sont plus utilisés
   */

  /**
* Requête tous les héros de façon asynchrone
* @deprecated
*/
  getHeroesMock(): Observable<Hero[]> {
    return of(HEROES);
  }

  /**
   * Recherche un héro dans le mock
   * @deprecated
   * @param id 
   */
  getHeroMock(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  /**
   * Recherche un héro via le serveur http
   * @param id 
   */
  getHeroColin(id: number): Observable<Hero> {

    this.messageService.add(`HeroService: fetched hero id=${id}`);
    this.getHeroes().subscribe(heroes => this.currentHero = heroes.find(hero => hero.id === id));
    return of(this.currentHero);
  }

}
