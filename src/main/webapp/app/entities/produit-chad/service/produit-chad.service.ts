import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProduitChad, NewProduitChad } from '../produit-chad.model';

export type PartialUpdateProduitChad = Partial<IProduitChad> & Pick<IProduitChad, 'id'>;

export type EntityResponseType = HttpResponse<IProduitChad>;
export type EntityArrayResponseType = HttpResponse<IProduitChad[]>;

@Injectable({ providedIn: 'root' })
export class ProduitChadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/produits');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(produit: NewProduitChad): Observable<EntityResponseType> {
    return this.http.post<IProduitChad>(this.resourceUrl, produit, { observe: 'response' });
  }

  update(produit: IProduitChad): Observable<EntityResponseType> {
    return this.http.put<IProduitChad>(`${this.resourceUrl}/${this.getProduitChadIdentifier(produit)}`, produit, { observe: 'response' });
  }

  partialUpdate(produit: PartialUpdateProduitChad): Observable<EntityResponseType> {
    return this.http.patch<IProduitChad>(`${this.resourceUrl}/${this.getProduitChadIdentifier(produit)}`, produit, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProduitChad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduitChad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getProduitChadIdentifier(produit: Pick<IProduitChad, 'id'>): number {
    return produit.id;
  }

  compareProduitChad(o1: Pick<IProduitChad, 'id'> | null, o2: Pick<IProduitChad, 'id'> | null): boolean {
    return o1 && o2 ? this.getProduitChadIdentifier(o1) === this.getProduitChadIdentifier(o2) : o1 === o2;
  }

  addProduitChadToCollectionIfMissing<Type extends Pick<IProduitChad, 'id'>>(
    produitCollection: Type[],
    ...produitsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const produits: Type[] = produitsToCheck.filter(isPresent);
    if (produits.length > 0) {
      const produitCollectionIdentifiers = produitCollection.map(produitItem => this.getProduitChadIdentifier(produitItem)!);
      const produitsToAdd = produits.filter(produitItem => {
        const produitIdentifier = this.getProduitChadIdentifier(produitItem);
        if (produitCollectionIdentifiers.includes(produitIdentifier)) {
          return false;
        }
        produitCollectionIdentifiers.push(produitIdentifier);
        return true;
      });
      return [...produitsToAdd, ...produitCollection];
    }
    return produitCollection;
  }
}
