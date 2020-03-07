import { GithubProfileService } from './../github-profile.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.scss']
})
export class GithubProfileComponent implements OnInit {
  username: string;
  user = {
    login: '',
    avatar_url: '',
    name: '',
    company: '',
    location: '',

    followers: null,
    following: null,
    followers_url: '',
    following_url: '',

    site_admin: false,

    public_repos: null,
    repos_url: '',

    subscriptions_url: '',
    html_url: '',
  };

  constructor(private router: Router, private route: ActivatedRoute, private service: GithubProfileService) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    // this.service.getProfile(this.username)
    //   .subscribe(
    //     response => this.user = response
    //   );
    this.user = {
      "login": "octacat",
      "avatar_url": "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
      "html_url": "https://github.com/octacat",
      "followers_url": "https://api.github.com/users/octacat/followers",
      "following_url": "https://api.github.com/users/octacat/following{/other_user}",
      "subscriptions_url": "https://api.github.com/users/octacat/subscriptions",
      "repos_url": "https://api.github.com/users/octacat/repos",
      "site_admin": false,
      "name": "octacat",
      "company": "Github World",
      "location": "San Bernadino, CA",
      "public_repos": 5,
      "followers": 7,
      "following": 6,
    }
  }

  updateProfile() {
    this.router.navigate(['/followers'], {
      queryParams: {
        page: 1, order: 'newest'
      }
    });
  }
}
