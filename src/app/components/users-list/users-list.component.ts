import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  constructor(private _usersService: UsersService) {}
  users: Observable<any>;
  viewToggler: number = 1;
  ngOnInit(): void {
    this.users = this._usersService.getUsers();
  }
  listView() {
    this.viewToggler = 1;
  }
  gridView() {
    this.viewToggler = 0;
  }
}
