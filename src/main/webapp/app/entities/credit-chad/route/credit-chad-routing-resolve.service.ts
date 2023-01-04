import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICreditChad } from '../credit-chad.model';
import { CreditChadService } from '../service/credit-chad.service';

@Injectable({ providedIn: 'root' })
export class CreditChadRoutingResolveService implements Resolve<ICreditChad | null> {
  constructor(protected service: CreditChadService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICreditChad | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((credit: HttpResponse<ICreditChad>) => {
          if (credit.body) {
            return of(credit.body);
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
