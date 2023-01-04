import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPointOfSaleChad } from '../point-of-sale-chad.model';

@Component({
  selector: 'jhi-point-of-sale-chad-detail',
  templateUrl: './point-of-sale-chad-detail.component.html',
})
export class PointOfSaleChadDetailComponent implements OnInit {
  pointOfSale: IPointOfSaleChad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pointOfSale }) => {
      this.pointOfSale = pointOfSale;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
