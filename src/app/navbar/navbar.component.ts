import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isActive: boolean;
  currentUser: any;
  userSession = {
    login: 'octocat',
    avatar_url: 'https://github.githubassets.com/images/modules/logos_page/Octocat.png'
  };
  constructor(private service: AuthService, private router: Router) { }

  ngOnInit() {
    this.setCurrentUser();
  }

  logoutUser() {
    this.service.logout();
    this.router.navigate(['/login'])
  }

  isLoggedIn() {
    return this.service.isLoggedIn();
  }

  setCurrentUser() {
    this.currentUser = this.service.getCurrentUser();
  }

}
