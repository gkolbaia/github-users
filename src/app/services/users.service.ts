import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
