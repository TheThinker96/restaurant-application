import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduitChad } from '../produit-chad.model';

@Component({
  selector: 'jhi-produit-chad-detail',
  templateUrl: './produit-chad-detail.component.html',
})
export class ProduitChadDetailComponent implements OnInit {
  produit: IProduitChad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produit }) => {
      this.produit = produit;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
