import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISectionChad } from '../section-chad.model';
import { SectionChadService } from '../service/section-chad.service';

@Injectable({ providedIn: 'root' })
export class SectionChadRoutingResolveService implements Resolve<ISectionChad | null> {
  constructor(protected service: SectionChadService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISectionChad | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((section: HttpResponse<ISectionChad>) => {
          if (section.body) {
            return of(section.body);
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
