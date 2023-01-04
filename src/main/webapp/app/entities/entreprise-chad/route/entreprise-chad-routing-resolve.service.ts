import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEntrepriseChad } from '../entreprise-chad.model';
import { EntrepriseChadService } from '../service/entreprise-chad.service';

@Injectable({ providedIn: 'root' })
export class EntrepriseChadRoutingResolveService implements Resolve<IEntrepriseChad | null> {
  constructor(protected service: EntrepriseChadService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntrepriseChad | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((entreprise: HttpResponse<IEntrepriseChad>) => {
          if (entreprise.body) {
            return of(entreprise.body);
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
