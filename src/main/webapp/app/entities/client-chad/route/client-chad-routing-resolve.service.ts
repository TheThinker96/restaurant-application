import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IClientChad } from '../client-chad.model';
import { ClientChadService } from '../service/client-chad.service';

@Injectable({ providedIn: 'root' })
export class ClientChadRoutingResolveService implements Resolve<IClientChad | null> {
  constructor(protected service: ClientChadService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IClientChad | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((client: HttpResponse<IClientChad>) => {
          if (client.body) {
            return of(client.body);
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
