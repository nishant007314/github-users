import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs/index';
import { GithubFollowersService } from './../services/github-followers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.scss']
})
export class GithubFollowersComponent implements OnInit {
  followers: any[];

  constructor(
    private route: ActivatedRoute,
    private service: GithubFollowersService
  ) { }

  ngOnInit() {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).pipe(
      switchMap(
        combined => {
          let username = combined[0].get('username');
          let page = combined[1].get('page');
          let order = combined[1].get('order');
          let params = {
            page: page,
            order: order
          }
          return this.service.getFollowersForUser(username, params);
        }
      )
    ).subscribe(
      followers => this.followers = followers);
  }
}
