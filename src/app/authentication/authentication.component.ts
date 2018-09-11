import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Imports pour se lier à l'api de wordpress
import { HttpClientModule, HttpClient } from '@angular/common/http';

// pwa
// Pw4@ngul4r
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  user = {
    login: '',
    password: ''
  }
  @Input() token;
    @Output() tokenChange = new EventEmitter<string>();

    /**
     * Of course, you may define the user as a model, 
     * but for the purposes of this demo it’s not mandatory. 
     * As for the constructor, pass the HttpClient to it:
     * @param http 
     */
    constructor( private http: HttpClient ) { }

  ngOnInit() {
  }

/**
 * Next code the auth method. 
 * It’s as simple as sending a POST request to the proper URL with the credentials and waiting for the response:
 */
  auth() {
    this.http.post('https://algerian-challengers.5.colin.engineer/wp-json/wp/v2/', {
      username: this.user.login,
      password: this.user.password
    }).subscribe((data) => {
      if (data['token']) { // if token is returned
        this.token = data['token'];
        this.tokenChange.emit(this.token);
      }
    });
  }


}
