import { Component, OnInit, Input } from '@angular/core';
import { Headers } from '@angular/http';

import { WpApiPosts } from 'wp-api-angular';
// Fait des requêtes autres que celles prévuent par l'api
import { WpApiTerms } from 'wp-api-angular';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  /** Articles publiés sur le site */
  posts = [];
    /** Articles publiés sur le site */
  post = {};

  /** Slug de la catégorie */
  categorySlug = '';


  constructor(
    private route: ActivatedRoute,
    private wpApiPost: WpApiPosts,
    private wpApiTerms: WpApiTerms,
  ) { }

  ngOnInit() {
    // -The route.snapshot is a static image of the route information 
    // shortly after the component was created.
    // -Route parameters are always strings. 
    // The JavaScript (+) operator converts the string to a number, which is what a hero id should be.

    // const categorySlug = 'angleterre';
    this.categorySlug = this.route.snapshot.paramMap.get('category');

    if (this.categorySlug) {

      this.getPostsByCategorySlug(this.categorySlug);
    } else {
      this.getPostList();
    }
  }

  /**
   * Récupere les articles depuis le site en utilisant wpApiPost
   */
  getPostList() {
    this.wpApiPost.getList()
      .toPromise().then(
        response => {
          // Si la promise réussit, le Json est extait dans l'attribut users
          let json = response.json();
          this.posts = json;
        }
      );
  }

/**
* Récupere un article correpondant au slug
*/
  getPostBySlug(postSlug) {
    this.wpApiPost.getList({ search: { slug: postSlug } })
      .toPromise().then(
        response => {
          // Si la promise réussit, le Json est extait dans l'attribut users
          let json = response.json();
          this.post = json;
        }
      );
  }

  /**
   * Récupere les articles d'une catégorie
   * @param category 
   */
  getPostsByCategorySlug(categorySlug: string) {

    this.getCategoryBySlug(categorySlug).then(
      response => {
        // Si la promise réussit, le Json est extait dans l'attribut users
        let json = response.json();
        let category = json;

        // Todo : possiblement plusieurs catégories
        // Dans ce cas crée un tableau n
        this.getPostsByCategoryId(category[0].id);

      }
    );

  }
  /**
   * Récupere les articles d'une catégorie
   * @param category 
   */
  getPostsByCategoryId(categoryId: number) {
    this.wpApiPost.getList({ search: { 'categories': categoryId } })
      .toPromise().then(
        response => {
          let json = response.json();
          this.posts = json;
        }
      );
  }

  /**
   * Récupere la catégorie ayant le slug 
   */
  getCategoryBySlug(categorySlug): Promise<any> {
    return this.wpApiTerms.getList('categories', { search: { slug: categorySlug } })
      .toPromise();
  }

}
