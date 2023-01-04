import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProduitChad } from '../produit-chad.model';
import { ProduitChadService } from '../service/produit-chad.service';

@Injectable({ providedIn: 'root' })
export class ProduitChadRoutingResolveService implements Resolve<IProduitChad | null> {
  constructor(protected service: ProduitChadService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProduitChad | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((produit: HttpResponse<IProduitChad>) => {
          if (produit.body) {
            return of(produit.body);
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
