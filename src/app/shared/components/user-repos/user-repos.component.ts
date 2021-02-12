import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.scss'],
})
export class UserReposComponent implements OnInit {
  @Input() userName: string;
  repositories: Observable<any> | null = null;
  constructor(private _userService: UsersService) {}

  ngOnInit(): void {
    this.getRepos();
  }
  getRepos() {
    this.repositories = this._userService.getUserRepositories(this.userName);
  }
}
