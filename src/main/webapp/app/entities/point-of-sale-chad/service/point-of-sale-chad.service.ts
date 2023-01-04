import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPointOfSaleChad, NewPointOfSaleChad } from '../point-of-sale-chad.model';

export type PartialUpdatePointOfSaleChad = Partial<IPointOfSaleChad> & Pick<IPointOfSaleChad, 'id'>;

export type EntityResponseType = HttpResponse<IPointOfSaleChad>;
export type EntityArrayResponseType = HttpResponse<IPointOfSaleChad[]>;

@Injectable({ providedIn: 'root' })
export class PointOfSaleChadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/point-of-sales');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(pointOfSale: NewPointOfSaleChad): Observable<EntityResponseType> {
    return this.http.post<IPointOfSaleChad>(this.resourceUrl, pointOfSale, { observe: 'response' });
  }

  update(pointOfSale: IPointOfSaleChad): Observable<EntityResponseType> {
    return this.http.put<IPointOfSaleChad>(`${this.resourceUrl}/${this.getPointOfSaleChadIdentifier(pointOfSale)}`, pointOfSale, {
      observe: 'response',
    });
  }

  partialUpdate(pointOfSale: PartialUpdatePointOfSaleChad): Observable<EntityResponseType> {
    return this.http.patch<IPointOfSaleChad>(`${this.resourceUrl}/${this.getPointOfSaleChadIdentifier(pointOfSale)}`, pointOfSale, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPointOfSaleChad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPointOfSaleChad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPointOfSaleChadIdentifier(pointOfSale: Pick<IPointOfSaleChad, 'id'>): number {
    return pointOfSale.id;
  }

  comparePointOfSaleChad(o1: Pick<IPointOfSaleChad, 'id'> | null, o2: Pick<IPointOfSaleChad, 'id'> | null): boolean {
    return o1 && o2 ? this.getPointOfSaleChadIdentifier(o1) === this.getPointOfSaleChadIdentifier(o2) : o1 === o2;
  }

  addPointOfSaleChadToCollectionIfMissing<Type extends Pick<IPointOfSaleChad, 'id'>>(
    pointOfSaleCollection: Type[],
    ...pointOfSalesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const pointOfSales: Type[] = pointOfSalesToCheck.filter(isPresent);
    if (pointOfSales.length > 0) {
      const pointOfSaleCollectionIdentifiers = pointOfSaleCollection.map(
        pointOfSaleItem => this.getPointOfSaleChadIdentifier(pointOfSaleItem)!
      );
      const pointOfSalesToAdd = pointOfSales.filter(pointOfSaleItem => {
        const pointOfSaleIdentifier = this.getPointOfSaleChadIdentifier(pointOfSaleItem);
        if (pointOfSaleCollectionIdentifiers.includes(pointOfSaleIdentifier)) {
          return false;
        }
        pointOfSaleCollectionIdentifiers.push(pointOfSaleIdentifier);
        return true;
      });
      return [...pointOfSalesToAdd, ...pointOfSaleCollection];
    }
    return pointOfSaleCollection;
  }
}
