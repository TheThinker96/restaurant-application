import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEntrepriseChad, NewEntrepriseChad } from '../entreprise-chad.model';

export type PartialUpdateEntrepriseChad = Partial<IEntrepriseChad> & Pick<IEntrepriseChad, 'id'>;

export type EntityResponseType = HttpResponse<IEntrepriseChad>;
export type EntityArrayResponseType = HttpResponse<IEntrepriseChad[]>;

@Injectable({ providedIn: 'root' })
export class EntrepriseChadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/entreprises');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(entreprise: NewEntrepriseChad): Observable<EntityResponseType> {
    return this.http.post<IEntrepriseChad>(this.resourceUrl, entreprise, { observe: 'response' });
  }

  update(entreprise: IEntrepriseChad): Observable<EntityResponseType> {
    return this.http.put<IEntrepriseChad>(`${this.resourceUrl}/${this.getEntrepriseChadIdentifier(entreprise)}`, entreprise, {
      observe: 'response',
    });
  }

  partialUpdate(entreprise: PartialUpdateEntrepriseChad): Observable<EntityResponseType> {
    return this.http.patch<IEntrepriseChad>(`${this.resourceUrl}/${this.getEntrepriseChadIdentifier(entreprise)}`, entreprise, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEntrepriseChad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntrepriseChad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEntrepriseChadIdentifier(entreprise: Pick<IEntrepriseChad, 'id'>): number {
    return entreprise.id;
  }

  compareEntrepriseChad(o1: Pick<IEntrepriseChad, 'id'> | null, o2: Pick<IEntrepriseChad, 'id'> | null): boolean {
    return o1 && o2 ? this.getEntrepriseChadIdentifier(o1) === this.getEntrepriseChadIdentifier(o2) : o1 === o2;
  }

  addEntrepriseChadToCollectionIfMissing<Type extends Pick<IEntrepriseChad, 'id'>>(
    entrepriseCollection: Type[],
    ...entreprisesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const entreprises: Type[] = entreprisesToCheck.filter(isPresent);
    if (entreprises.length > 0) {
      const entrepriseCollectionIdentifiers = entrepriseCollection.map(entrepriseItem => this.getEntrepriseChadIdentifier(entrepriseItem)!);
      const entreprisesToAdd = entreprises.filter(entrepriseItem => {
        const entrepriseIdentifier = this.getEntrepriseChadIdentifier(entrepriseItem);
        if (entrepriseCollectionIdentifiers.includes(entrepriseIdentifier)) {
          return false;
        }
        entrepriseCollectionIdentifiers.push(entrepriseIdentifier);
        return true;
      });
      return [...entreprisesToAdd, ...entrepriseCollection];
    }
    return entrepriseCollection;
  }
}
