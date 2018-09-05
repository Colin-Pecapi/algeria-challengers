import { Component, OnInit } from '@angular/core';
/**
 * Cherche les articles du site wordpress
 * https://algerian-challengers.com/wp-json/wp/v2/
 */
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

// Inspiré de https://p.w3layouts.com/demos/business_blog/web/#
export class BlogComponent implements OnInit {

  article: string;
  constructor() { }

  ngOnInit() {
    this.article = `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
dolore magna aliqua. Ut enim ad minim veniam, quis nostrud eiusmod tempor incididunt ut labore et dolore
magna aliqua exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Ut enim ad minim veniam, quis nostrud eiusmod tempor incididunt ut labore et dolore magna aliqua
exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`;
  }

}
