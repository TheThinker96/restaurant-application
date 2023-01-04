import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICreditChad } from '../credit-chad.model';

@Component({
  selector: 'jhi-credit-chad-detail',
  templateUrl: './credit-chad-detail.component.html',
})
export class CreditChadDetailComponent implements OnInit {
  credit: ICreditChad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ credit }) => {
      this.credit = credit;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
