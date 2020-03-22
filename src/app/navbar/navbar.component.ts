import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: any;
  env: string;
  showEnv: boolean;

  userSession = {
    login: 'octocat',
    avatar_url: 'https://github.githubassets.com/images/modules/logos_page/Octocat.png'
  };
  constructor(private service: AuthService, private router: Router) { }

  ngOnInit() {
    this.showEnv = true;
    this.env = environment.envName;
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
