import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';
import { User } from 'src/app/shared/models/interfaces/User.interface';
import { Repository } from 'src/app/shared/models/interfaces/Repository.interface';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: User;
  errorMessage = false;
  constructor(
    private _route: ActivatedRoute,
    private _userService: UsersService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  get userName(): string {
    return this._route.snapshot.params.username;
  }
  getUser(): void {
    this._userService.getUser(this.userName).subscribe(
      (res: User) => {
        this.user = res;
      },
      (err) => {
        if (err.status === 404) {
          this.errorMessage = true;
        }
      }
    );
  }
  goBack(): void {
    this._location.back();
  }
}
