import { Component, OnInit, Input } from '@angular/core';
import { Headers } from '@angular/http';

// Fait des requêtes autres que celles prévuent par l'api
import { WpApiTerms } from 'wp-api-angular';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  /** Articles publiés sur le site */
  categories = [];

  constructor(private wpApiTerms: WpApiTerms) { }

  ngOnInit() {
      
    this.getCategoriestList().then(
      response => {
        // Si la promise réussit, le Json est extait dans l'attribut users
        let json = response.json();
        this.categories = json;
      }
    );

  }

  /**
   * Asynchrone
   * Récupere les catégories depuis le site en utilisant wpApiTerms
   */
   getCategoriestList(): Promise<any> {
    return this.wpApiTerms.getList('categories')
    .toPromise();
  }
  /**
   * Synchrone : 
   * "async" indique que la méthode a un traitement asynchrone
   * "await" permet d'attendre la réponse avant de continuer le script
   * 
   * Récupere les catégories depuis le site en utilisant wpApiTerms
   */
  async getCategoriestListSync(): Promise<any> {
    return await this.wpApiTerms.getList('categories')
    .toPromise();  }
  /**
   * Récupere la catégorie ayant le slug 
   */
  getCategoryBySlug(categorySlug): Promise<any> {
    return this.wpApiTerms.getList('categories',{ search:{slug:categorySlug}})
    .toPromise();
  }

}
