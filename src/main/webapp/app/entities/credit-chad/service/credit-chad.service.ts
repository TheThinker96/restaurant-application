import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICreditChad, NewCreditChad } from '../credit-chad.model';

export type PartialUpdateCreditChad = Partial<ICreditChad> & Pick<ICreditChad, 'id'>;

export type EntityResponseType = HttpResponse<ICreditChad>;
export type EntityArrayResponseType = HttpResponse<ICreditChad[]>;

@Injectable({ providedIn: 'root' })
export class CreditChadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/credits');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(credit: NewCreditChad): Observable<EntityResponseType> {
    return this.http.post<ICreditChad>(this.resourceUrl, credit, { observe: 'response' });
  }

  update(credit: ICreditChad): Observable<EntityResponseType> {
    return this.http.put<ICreditChad>(`${this.resourceUrl}/${this.getCreditChadIdentifier(credit)}`, credit, { observe: 'response' });
  }

  partialUpdate(credit: PartialUpdateCreditChad): Observable<EntityResponseType> {
    return this.http.patch<ICreditChad>(`${this.resourceUrl}/${this.getCreditChadIdentifier(credit)}`, credit, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICreditChad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICreditChad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCreditChadIdentifier(credit: Pick<ICreditChad, 'id'>): number {
    return credit.id;
  }

  compareCreditChad(o1: Pick<ICreditChad, 'id'> | null, o2: Pick<ICreditChad, 'id'> | null): boolean {
    return o1 && o2 ? this.getCreditChadIdentifier(o1) === this.getCreditChadIdentifier(o2) : o1 === o2;
  }

  addCreditChadToCollectionIfMissing<Type extends Pick<ICreditChad, 'id'>>(
    creditCollection: Type[],
    ...creditsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const credits: Type[] = creditsToCheck.filter(isPresent);
    if (credits.length > 0) {
      const creditCollectionIdentifiers = creditCollection.map(creditItem => this.getCreditChadIdentifier(creditItem)!);
      const creditsToAdd = credits.filter(creditItem => {
        const creditIdentifier = this.getCreditChadIdentifier(creditItem);
        if (creditCollectionIdentifiers.includes(creditIdentifier)) {
          return false;
        }
        creditCollectionIdentifiers.push(creditIdentifier);
        return true;
      });
      return [...creditsToAdd, ...creditCollection];
    }
    return creditCollection;
  }
}
