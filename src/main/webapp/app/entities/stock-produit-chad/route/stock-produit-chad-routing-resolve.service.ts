import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStockProduitChad } from '../stock-produit-chad.model';
import { StockProduitChadService } from '../service/stock-produit-chad.service';

@Injectable({ providedIn: 'root' })
export class StockProduitChadRoutingResolveService implements Resolve<IStockProduitChad | null> {
  constructor(protected service: StockProduitChadService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStockProduitChad | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((stockProduit: HttpResponse<IStockProduitChad>) => {
          if (stockProduit.body) {
            return of(stockProduit.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
