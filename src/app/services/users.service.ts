import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _httpClient: HttpClient) {}
  getUsers() {
    return this._httpClient.get('https://api.github.com/users');
  }
  getUser(userName: string) {
    return this._httpClient.get(`https://api.github.com/users/${userName}`);
  }
  getUserRepositories(userName: string) {
    return this._httpClient.get(
      `https://api.github.com/users/${userName}/repos?per_page=3`
    );
  }

  searchUser(searchQuery: string) {
    return this._httpClient
      .get(`https://api.github.com/search/users?q=${searchQuery}`)
      .pipe(map((res: any) => res.items));
  }
  getOrganisations(login: string) {
    return this._httpClient.get(`https://api.github.com/users/${login}/orgs`);
  }
}
