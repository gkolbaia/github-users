import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _httpClient: HttpClient) {}
  getUsers() {
    return this._httpClient.get('https://api.github.com/users', {
      headers: { Authorization: '0b550f5ef37ef0c80bdb8d13b02a0cdd25139814' },
    });
  }
  getUser(userName: string) {
    return this._httpClient.get(`https://api.github.com/users/${userName}`, {
      headers: { Authorization: '0b550f5ef37ef0c80bdb8d13b02a0cdd25139814' },
    });
  }
  getUserRepositories(userName: string) {
    return this._httpClient.get(
      `https://api.github.com/users/${userName}/repos?per_page=3`,
      {
        headers: { Authorization: '0b550f5ef37ef0c80bdb8d13b02a0cdd25139814' },
      }
    );
  }

  searchUser(searchQuery: string) {
    return this._httpClient
      .get(`https://api.github.com/search/users?q=${searchQuery}`, {
        headers: { Authorization: '0b550f5ef37ef0c80bdb8d13b02a0cdd25139814' },
      })
      .pipe(map((res: any) => res.items));
  }
  getOrganisations(login: string) {
    return this._httpClient.get(`https://api.github.com/users/${login}/orgs`, {
      headers: { Authorization: '0b550f5ef37ef0c80bdb8d13b02a0cdd25139814' },
    });
  }
}
