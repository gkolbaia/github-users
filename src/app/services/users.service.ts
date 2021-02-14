import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../shared/models/interfaces/User.interface';
import { Repository } from '../shared/models/interfaces/Repository.interface';
import { Organisation } from '../shared/models/interfaces/Organisation.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _httpClient: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>('https://api.github.com/users');
  }
  getUser(userName: string): Observable<User> {
    return this._httpClient.get<User>(
      `https://api.github.com/users/${userName}`
    );
  }
  getUserRepositories(userName: string): Observable<Repository[]> {
    return this._httpClient.get<Repository[]>(
      `https://api.github.com/users/${userName}/repos?per_page=3`
    );
  }

  searchUser(searchQuery: string): Observable<User[]> {
    return this._httpClient
      .get(`https://api.github.com/search/users?q=${searchQuery}`)
      .pipe(map((res: any) => res.items));
  }
  getOrganisations(login: string): Observable<Organisation[]> {
    return this._httpClient.get<Organisation[]>(`https://api.github.com/users/${login}/orgs`);
  }
}
