import { Component, OnInit } from '@angular/core';

import { WordpressService } from "../wordpress.service";

import { ActivatedRoute } from '@angular/router';

import { WpApiPosts } from 'wp-api-angular';

import { Post } from "../post";
import { empty } from 'rxjs';


/**
 * Cherche les articles du site wordpress
 * https://algerian-challengers.5.colin.engineer/wp-json/wp/v2/
 */
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

// Inspiré de https://p.w3layouts.com/demos/business_blog/web/#
export class BlogComponent implements OnInit {

  // Article lue actuellement
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private wordpress: WordpressService,
    private wpApiPost: WpApiPosts,
  ) { }

  ngOnInit() {
    const postSlug = this.route.snapshot.paramMap.get('post');
    if (postSlug) {
      this.getPostBySlug(postSlug)
    }else{
      this.getPostBySlug('femmes-algeriennes-entrepreneurs');
      // this.getPostBySlug('a-propos');
      
      // this.getLastPost();
    }
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
          this.post = json[0];
        }
      );
  }
  /**
  * Récupere un article correpondant au slug
  */
  getLastPost() {
    this.wpApiPost.getList({ search: { per_page:1, page:1 } })
      .toPromise().then(
        response => {
          // Si la promise réussit, le Json est extait dans l'attribut users
          let json = response.json();
          this.post = json[0];
        }
      );
  }

}
