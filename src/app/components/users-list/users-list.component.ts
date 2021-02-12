import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  constructor(private _usersService: UsersService) {}
  users: Observable<any>;
  viewToggler: number = 1;
  searchQuery = new FormControl('');

  ngOnInit(): void {
    this.users = this._usersService.getUsers();
    this.searchQuery.valueChanges.subscribe((res) => {
      console.log(res);
    });
  }
  listView() {
    this.viewToggler = 1;
  }
  gridView() {
    this.viewToggler = 0;
  }
  get listSize() {
    return window.innerWidth > 1200;
  }
  searchBook() {
    console.log(1);
  }
}
