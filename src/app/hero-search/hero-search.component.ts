import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from "rxjs";

// Opérateurs utiles : 
// - attend en millisecondes, 
// - ensures that a request is sent only if the filter text changed.
// - calls the search service for each search term that makes it through debounce and distinctUntilChanged. 
// It cancels and discards previous search observables, 
// returning only the latest search service observable.
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from "../hero";
import { HeroService } from "../hero.service";


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  // The searchTerms property is declared as an RxJS Subject.
  // A Subject is both a source of observable values and an Observable itself. 
  // You can subscribe to a Subject as you would any Observable.
  private searchTerms = new Subject<string>();


  /**
   * Push a search term into the observable stream.
   * 
   * Every time the user types in the textbox, the binding calls search() with the textbox value, a "search term". 
   * The searchTerms becomes an Observable emitting a steady stream of search terms.
   * @param term 
   */
  search(term: string) {
    this.searchTerms.next(term);
  }

  constructor(private HeroService: HeroService) { }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes.
      // switchMap() preserves the original request order while returning only 
      // the observable from the most recent HTTP method call. 
      // Results from prior calls are canceled and discarded.
      switchMap((term: string) =>
        this.HeroService.searchHeroe(term)
      ),

    );

  }

}
