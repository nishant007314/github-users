import { Http } from '@angular/http';
import { DataService } from './services/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepoService extends DataService {
  constructor(http: Http) {
    super('https://api.github.com/users/octocat/repos', http);
  }
}
