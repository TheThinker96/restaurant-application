import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVenteProduitChad } from '../vente-produit-chad.model';

@Component({
  selector: 'jhi-vente-produit-chad-detail',
  templateUrl: './vente-produit-chad-detail.component.html',
})
export class VenteProduitChadDetailComponent implements OnInit {
  venteProduit: IVenteProduitChad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ venteProduit }) => {
      this.venteProduit = venteProduit;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
