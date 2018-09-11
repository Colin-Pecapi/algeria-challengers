import { Component, OnInit, Input } from '@angular/core';
import { WpApiUsers } from 'wp-api-angular';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  /** Utilisateurs enregistrés sur le site */
  users = [];

/**
 * To get a list of all users we should call the getList method,
 *  convert it to a promise, and assign the users variable with the returned array:
 */
  getUserList() {   
    this.wpApiUsers.getList()
    .toPromise()
    .then( response => {
      // Si la promise réussit, le Json est extait dans l'attribut users
      let json: any = response.json();
      this.users = json;
    })
  }

constructor( private wpApiUsers: WpApiUsers ) {
  this.getUserList();
}

  ngOnInit() {
  }

}
