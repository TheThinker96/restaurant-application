import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserAccountChad } from '../user-account-chad.model';

@Component({
  selector: 'jhi-user-account-chad-detail',
  templateUrl: './user-account-chad-detail.component.html',
})
export class UserAccountChadDetailComponent implements OnInit {
  userAccount: IUserAccountChad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userAccount }) => {
      this.userAccount = userAccount;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
