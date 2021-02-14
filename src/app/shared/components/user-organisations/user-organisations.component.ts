import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-organisations',
  templateUrl: './user-organisations.component.html',
  styleUrls: ['./user-organisations.component.scss'],
})
export class UserOrganisationsComponent implements OnInit {
  @Input() userName: string;
  constructor(private _usersService: UsersService) {}
  organisations: Observable<any>;
  ngOnInit(): void {
    this.getOrganisations();
    this._usersService.getOrganisations(this.userName).subscribe((res) => {
      console.log('organisations', res);
    });
  }
  getOrganisations() {
    this.organisations = this._usersService.getOrganisations(this.userName);
  }
}
