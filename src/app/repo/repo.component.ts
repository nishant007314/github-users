import { RepoService } from './../repo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss']
})
export class RepoComponent implements OnInit {
  repos: any[];

  constructor(private service: RepoService) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(
        repos => this.repos = repos
      )
  }

}
