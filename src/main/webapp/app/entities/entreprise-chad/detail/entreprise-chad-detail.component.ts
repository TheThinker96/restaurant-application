import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntrepriseChad } from '../entreprise-chad.model';

@Component({
  selector: 'jhi-entreprise-chad-detail',
  templateUrl: './entreprise-chad-detail.component.html',
})
export class EntrepriseChadDetailComponent implements OnInit {
  entreprise: IEntrepriseChad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entreprise }) => {
      this.entreprise = entreprise;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
