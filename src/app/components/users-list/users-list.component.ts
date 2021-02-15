import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/interfaces/User.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  constructor(private _usersService: UsersService, private _router: Router) {}
  users: Observable<User[]>;
  viewToggler: number = 1;
  searchQuery = new FormControl('');
  lastSearches: User[];
  errorMessage = false;
  searchUser: Observable<User[]>;

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
  listView(): void {
    this.viewToggler = 1;
  }
  gridView(): void {
    this.viewToggler = 0;
  }
  searchUserSubmit(): void {
    if (this.searchQuery.value) {
      this._usersService.getUser(this.searchQuery.value).subscribe(
        (res: User) => {
          this._router.navigate([res.login]);
        },
        (err) => {
          console.log(err.status);
          if (err.status === 404) {
            this.errorMessage = true;
            setTimeout(() => {
              this.errorMessage = false;
            }, 3000);
          }
        }
      );
    }
  }
  displayFn(user): string | undefined {
    return user ? user.login : '';
  }
  saveLastSearches(term): void {
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
  getLastSerches(): void {
    this.lastSearches = JSON.parse(localStorage.getItem('searches'));
  }
}
