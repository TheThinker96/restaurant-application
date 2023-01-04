import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStockProduitChad } from '../stock-produit-chad.model';

@Component({
  selector: 'jhi-stock-produit-chad-detail',
  templateUrl: './stock-produit-chad-detail.component.html',
})
export class StockProduitChadDetailComponent implements OnInit {
  stockProduit: IStockProduitChad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stockProduit }) => {
      this.stockProduit = stockProduit;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
