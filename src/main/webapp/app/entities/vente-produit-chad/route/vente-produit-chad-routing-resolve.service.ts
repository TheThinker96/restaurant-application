import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVenteProduitChad } from '../vente-produit-chad.model';
import { VenteProduitChadService } from '../service/vente-produit-chad.service';

@Injectable({ providedIn: 'root' })
export class VenteProduitChadRoutingResolveService implements Resolve<IVenteProduitChad | null> {
  constructor(protected service: VenteProduitChadService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVenteProduitChad | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((venteProduit: HttpResponse<IVenteProduitChad>) => {
          if (venteProduit.body) {
            return of(venteProduit.body);
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
