import { Component, OnInit, Input } from '@angular/core';
import {Hero} from '../hero'

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../hero.service';
import { Services } from '@angular/core/src/view';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  /**
   * Les paramètres du constructeur sont des attributs qui ne sont pas initialisés.
   * @param route   The ActivatedRoute holds information about the route to this instance 
   * of the HeroDetailComponent. This component is interested in the route's bag of parameters extracted 
   * from the URL. The "id" parameter is the id of the hero to display.
   * @param heroService The HeroService gets hero data from the remote server 
   * and this component will use it to get the hero-to-display.
   * @param location The location is an Angular service for interacting with the browser. 
   * You'll use it later to navigate back to the view that navigated here.
   */
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }
/**
 * 
 */
ngOnInit(): void {
  this.getHero();
}

/**
 * Cherche un héro en faisant appel au service
 */
getHero(): void {
  // -The route.snapshot is a static image of the route information 
  // shortly after the component was created.
  // -Route parameters are always strings. 
  // The JavaScript (+) operator converts the string to a number, which is what a hero id should be.
  const id = +this.route.snapshot.paramMap.get('id');
  this.heroService.getHero(id)
  .subscribe(hero => this.hero = hero);
}

/**
 * Retourne à la derniere page.
 */
goBack(){
  this.location.back();
}

}
