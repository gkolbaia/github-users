import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { Organisation } from '../../models/interfaces/Organisation.interface';

@Component({
  selector: 'app-user-organisations',
  templateUrl: './user-organisations.component.html',
  styleUrls: ['./user-organisations.component.scss'],
})
export class UserOrganisationsComponent implements OnInit {
  @Input() userName: string;
  constructor(private _usersService: UsersService) {}
  organisations: Observable<Organisation[]>;
  ngOnInit(): void {
    this.getOrganisations();
  }
  getOrganisations() {
    this.organisations = this._usersService.getOrganisations(this.userName);
  }
}
