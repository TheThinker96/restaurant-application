import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStockProduitChad, NewStockProduitChad } from '../stock-produit-chad.model';

export type PartialUpdateStockProduitChad = Partial<IStockProduitChad> & Pick<IStockProduitChad, 'id'>;

type RestOf<T extends IStockProduitChad | NewStockProduitChad> = Omit<T, 'dateExpiration'> & {
  dateExpiration?: string | null;
};

export type RestStockProduitChad = RestOf<IStockProduitChad>;

export type NewRestStockProduitChad = RestOf<NewStockProduitChad>;

export type PartialUpdateRestStockProduitChad = RestOf<PartialUpdateStockProduitChad>;

export type EntityResponseType = HttpResponse<IStockProduitChad>;
export type EntityArrayResponseType = HttpResponse<IStockProduitChad[]>;

@Injectable({ providedIn: 'root' })
export class StockProduitChadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/stock-produits');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(stockProduit: NewStockProduitChad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stockProduit);
    return this.http
      .post<RestStockProduitChad>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(stockProduit: IStockProduitChad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stockProduit);
    return this.http
      .put<RestStockProduitChad>(`${this.resourceUrl}/${this.getStockProduitChadIdentifier(stockProduit)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(stockProduit: PartialUpdateStockProduitChad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stockProduit);
    return this.http
      .patch<RestStockProduitChad>(`${this.resourceUrl}/${this.getStockProduitChadIdentifier(stockProduit)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestStockProduitChad>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestStockProduitChad[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getStockProduitChadIdentifier(stockProduit: Pick<IStockProduitChad, 'id'>): number {
    return stockProduit.id;
  }

  compareStockProduitChad(o1: Pick<IStockProduitChad, 'id'> | null, o2: Pick<IStockProduitChad, 'id'> | null): boolean {
    return o1 && o2 ? this.getStockProduitChadIdentifier(o1) === this.getStockProduitChadIdentifier(o2) : o1 === o2;
  }

  addStockProduitChadToCollectionIfMissing<Type extends Pick<IStockProduitChad, 'id'>>(
    stockProduitCollection: Type[],
    ...stockProduitsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const stockProduits: Type[] = stockProduitsToCheck.filter(isPresent);
    if (stockProduits.length > 0) {
      const stockProduitCollectionIdentifiers = stockProduitCollection.map(
        stockProduitItem => this.getStockProduitChadIdentifier(stockProduitItem)!
      );
      const stockProduitsToAdd = stockProduits.filter(stockProduitItem => {
        const stockProduitIdentifier = this.getStockProduitChadIdentifier(stockProduitItem);
        if (stockProduitCollectionIdentifiers.includes(stockProduitIdentifier)) {
          return false;
        }
        stockProduitCollectionIdentifiers.push(stockProduitIdentifier);
        return true;
      });
      return [...stockProduitsToAdd, ...stockProduitCollection];
    }
    return stockProduitCollection;
  }

  protected convertDateFromClient<T extends IStockProduitChad | NewStockProduitChad | PartialUpdateStockProduitChad>(
    stockProduit: T
  ): RestOf<T> {
    return {
      ...stockProduit,
      dateExpiration: stockProduit.dateExpiration?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restStockProduitChad: RestStockProduitChad): IStockProduitChad {
    return {
      ...restStockProduitChad,
      dateExpiration: restStockProduitChad.dateExpiration ? dayjs(restStockProduitChad.dateExpiration) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestStockProduitChad>): HttpResponse<IStockProduitChad> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestStockProduitChad[]>): HttpResponse<IStockProduitChad[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
