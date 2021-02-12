import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: any;
  repositories: any;
  constructor(
    private _route: ActivatedRoute,
    private _userService: UsersService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.getUser() ;
    this.getUserRepositories();
  }
  get userName() {
    return this._route.snapshot.params.username;
  }
  getUser() {
    this._userService.getUser(this.userName).subscribe((res) => {
      console.log(res);
      this.user = res;
    });
  }
  getUserRepositories() {
    this._userService.getUserRepositories(this.userName).subscribe((res) => {
      this.repositories = res;
    });
  }
  goBack() {
    this._location.back();
  }
}
