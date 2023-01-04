import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVenteProduitChad, NewVenteProduitChad } from '../vente-produit-chad.model';

export type PartialUpdateVenteProduitChad = Partial<IVenteProduitChad> & Pick<IVenteProduitChad, 'id'>;

type RestOf<T extends IVenteProduitChad | NewVenteProduitChad> = Omit<T, 'dateVente'> & {
  dateVente?: string | null;
};

export type RestVenteProduitChad = RestOf<IVenteProduitChad>;

export type NewRestVenteProduitChad = RestOf<NewVenteProduitChad>;

export type PartialUpdateRestVenteProduitChad = RestOf<PartialUpdateVenteProduitChad>;

export type EntityResponseType = HttpResponse<IVenteProduitChad>;
export type EntityArrayResponseType = HttpResponse<IVenteProduitChad[]>;

@Injectable({ providedIn: 'root' })
export class VenteProduitChadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/vente-produits');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(venteProduit: NewVenteProduitChad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(venteProduit);
    return this.http
      .post<RestVenteProduitChad>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(venteProduit: IVenteProduitChad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(venteProduit);
    return this.http
      .put<RestVenteProduitChad>(`${this.resourceUrl}/${this.getVenteProduitChadIdentifier(venteProduit)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(venteProduit: PartialUpdateVenteProduitChad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(venteProduit);
    return this.http
      .patch<RestVenteProduitChad>(`${this.resourceUrl}/${this.getVenteProduitChadIdentifier(venteProduit)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestVenteProduitChad>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestVenteProduitChad[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getVenteProduitChadIdentifier(venteProduit: Pick<IVenteProduitChad, 'id'>): number {
    return venteProduit.id;
  }

  compareVenteProduitChad(o1: Pick<IVenteProduitChad, 'id'> | null, o2: Pick<IVenteProduitChad, 'id'> | null): boolean {
    return o1 && o2 ? this.getVenteProduitChadIdentifier(o1) === this.getVenteProduitChadIdentifier(o2) : o1 === o2;
  }

  addVenteProduitChadToCollectionIfMissing<Type extends Pick<IVenteProduitChad, 'id'>>(
    venteProduitCollection: Type[],
    ...venteProduitsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const venteProduits: Type[] = venteProduitsToCheck.filter(isPresent);
    if (venteProduits.length > 0) {
      const venteProduitCollectionIdentifiers = venteProduitCollection.map(
        venteProduitItem => this.getVenteProduitChadIdentifier(venteProduitItem)!
      );
      const venteProduitsToAdd = venteProduits.filter(venteProduitItem => {
        const venteProduitIdentifier = this.getVenteProduitChadIdentifier(venteProduitItem);
        if (venteProduitCollectionIdentifiers.includes(venteProduitIdentifier)) {
          return false;
        }
        venteProduitCollectionIdentifiers.push(venteProduitIdentifier);
        return true;
      });
      return [...venteProduitsToAdd, ...venteProduitCollection];
    }
    return venteProduitCollection;
  }

  protected convertDateFromClient<T extends IVenteProduitChad | NewVenteProduitChad | PartialUpdateVenteProduitChad>(
    venteProduit: T
  ): RestOf<T> {
    return {
      ...venteProduit,
      dateVente: venteProduit.dateVente?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restVenteProduitChad: RestVenteProduitChad): IVenteProduitChad {
    return {
      ...restVenteProduitChad,
      dateVente: restVenteProduitChad.dateVente ? dayjs(restVenteProduitChad.dateVente) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestVenteProduitChad>): HttpResponse<IVenteProduitChad> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestVenteProduitChad[]>): HttpResponse<IVenteProduitChad[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
