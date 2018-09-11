import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Compsants essentiels
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Communication HTTP 
// To make HttpClient available everywhere in the app :
import { HttpClientModule, HttpClient} from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

// Composants spécifiques

import { BlogComponent } from './blog/blog.component';

// Imports pour lier à l'api de wordpress
import { Http } from '@angular/http';

import {
  WpApiModule,
  WpApiLoader,
  WpApiStaticLoader
} from 'wp-api-angular';

import { AuthenticationComponent } from './authentication/authentication.component';
import { UserListComponent } from './user-list/user-list.component';
import { PostListComponent } from './post-list/post-list.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    AuthenticationComponent,
    UserListComponent,
    PostListComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    
    BrowserModule,
    FormsModule,
    HttpClientModule, // <---
    WpApiModule.forRoot({ // <---
      provide: WpApiLoader,
      useFactory: (WpApiLoaderFactory),
      deps: [Http]
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
/**
 * Initialisation de la connection avec le WorPress
 * https://www.sitepoint.com/angular-wordpress-wp-api-angular/
 * 
 * @param http 
 */
export function WpApiLoaderFactory(http: Http) {
  // return new WpApiStaticLoader(http, 'https://algerian-challengers.com/wp-json/wp/v2/', '');
  return new WpApiStaticLoader(http, 'https://algerian-challengers.5.colin.engineer/wp-json/wp/v2/', '');

}
