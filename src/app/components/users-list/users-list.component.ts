import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  constructor(private _usersService: UsersService, private _router: Router) {}
  users: Observable<any>;
  viewToggler: number = 1;
  searchQuery = new FormControl('');
  lastSearches: any[];

  searchUser: Observable<any>;

  ngOnInit(): void {
    this.getLastSerches();
    this.users = this._usersService.getUsers();
    this.searchUser = this.searchQuery.valueChanges.pipe(
      debounceTime(500),
      switchMap((term: string | any | null) => {
        if (term && typeof term === 'string') {
          return this._usersService.searchUser(term.trim());
        } else {
          if (term && term.login) {
            this.getLastSerches();
            this.saveLastSearches(term);
            this._router.navigate([`${term.login}`]);
          }
          return of([]);
        }
      })
    );
  }
  listView() {
    this.viewToggler = 1;
  }
  gridView() {
    this.viewToggler = 0;
  }
  searchUserSubmit() {
    if (this.searchQuery.value) {
      this._usersService
        .getUser(this.searchQuery.value)
        .subscribe((res: any) => {
          this._router.navigate([res.login]);
        });
    }
  }
  displayFn(user): string | undefined {
    return user ? user.login : '';
  }
  saveLastSearches(term) {
    let lastSearches = JSON.parse(localStorage.getItem('searches'));
    if (!lastSearches) {
      const newSerches = [];
      newSerches.push(term);
      localStorage.setItem('searches', JSON.stringify(newSerches));
    } else if (lastSearches.length === 3) {
      lastSearches.forEach((user, index) => {
        if (user.id === term.id) {
          lastSearches.splice(index, 1);
          lastSearches.push(term);
        } else if (index === lastSearches.length - 1) {
          lastSearches.shift();
          lastSearches.push(term);
        }
        localStorage.setItem('searches', JSON.stringify(lastSearches));
      });
    } else {
      lastSearches.push(term);
      localStorage.setItem('searches', JSON.stringify(lastSearches));
    }
  }
  getLastSerches() {
    this.lastSearches = JSON.parse(localStorage.getItem('searches'));
  }
}
