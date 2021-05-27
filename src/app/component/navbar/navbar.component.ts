import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SharingDataService} from "../../services/sharing-data.service";
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  message: any;
  show = true;

  constructor(private route: Router, private data: SharingDataService, private tokenStorage: TokenStorageService) {
  };

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    console.log(this.message);
  }

  switchMenu() {
    this.show = !this.show;
    this.data.changeMessage(this.show);
  }

  isLoggedInf() {
    let jwtHelper = new JwtHelperService();
    let token = sessionStorage.getItem('auth-token');
    if (!token) {
      return false;
    }
    let expirationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);
    return !isExpired;
  }
  getUser(){
    return this.tokenStorage.getUser();

  }
  signOut(){
    return this.tokenStorage.signOut();

  }

}
