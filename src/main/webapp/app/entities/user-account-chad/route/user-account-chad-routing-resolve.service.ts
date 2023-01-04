import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUserAccountChad } from '../user-account-chad.model';
import { UserAccountChadService } from '../service/user-account-chad.service';

@Injectable({ providedIn: 'root' })
export class UserAccountChadRoutingResolveService implements Resolve<IUserAccountChad | null> {
  constructor(protected service: UserAccountChadService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserAccountChad | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((userAccount: HttpResponse<IUserAccountChad>) => {
          if (userAccount.body) {
            return of(userAccount.body);
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
