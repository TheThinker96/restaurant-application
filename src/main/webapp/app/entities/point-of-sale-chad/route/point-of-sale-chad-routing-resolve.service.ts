import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPointOfSaleChad } from '../point-of-sale-chad.model';
import { PointOfSaleChadService } from '../service/point-of-sale-chad.service';

@Injectable({ providedIn: 'root' })
export class PointOfSaleChadRoutingResolveService implements Resolve<IPointOfSaleChad | null> {
  constructor(protected service: PointOfSaleChadService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPointOfSaleChad | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((pointOfSale: HttpResponse<IPointOfSaleChad>) => {
          if (pointOfSale.body) {
            return of(pointOfSale.body);
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
