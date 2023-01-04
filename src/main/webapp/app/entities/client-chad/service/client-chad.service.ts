import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IClientChad, NewClientChad } from '../client-chad.model';

export type PartialUpdateClientChad = Partial<IClientChad> & Pick<IClientChad, 'id'>;

export type EntityResponseType = HttpResponse<IClientChad>;
export type EntityArrayResponseType = HttpResponse<IClientChad[]>;

@Injectable({ providedIn: 'root' })
export class ClientChadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/clients');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(client: NewClientChad): Observable<EntityResponseType> {
    return this.http.post<IClientChad>(this.resourceUrl, client, { observe: 'response' });
  }

  update(client: IClientChad): Observable<EntityResponseType> {
    return this.http.put<IClientChad>(`${this.resourceUrl}/${this.getClientChadIdentifier(client)}`, client, { observe: 'response' });
  }

  partialUpdate(client: PartialUpdateClientChad): Observable<EntityResponseType> {
    return this.http.patch<IClientChad>(`${this.resourceUrl}/${this.getClientChadIdentifier(client)}`, client, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IClientChad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IClientChad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getClientChadIdentifier(client: Pick<IClientChad, 'id'>): number {
    return client.id;
  }

  compareClientChad(o1: Pick<IClientChad, 'id'> | null, o2: Pick<IClientChad, 'id'> | null): boolean {
    return o1 && o2 ? this.getClientChadIdentifier(o1) === this.getClientChadIdentifier(o2) : o1 === o2;
  }

  addClientChadToCollectionIfMissing<Type extends Pick<IClientChad, 'id'>>(
    clientCollection: Type[],
    ...clientsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const clients: Type[] = clientsToCheck.filter(isPresent);
    if (clients.length > 0) {
      const clientCollectionIdentifiers = clientCollection.map(clientItem => this.getClientChadIdentifier(clientItem)!);
      const clientsToAdd = clients.filter(clientItem => {
        const clientIdentifier = this.getClientChadIdentifier(clientItem);
        if (clientCollectionIdentifiers.includes(clientIdentifier)) {
          return false;
        }
        clientCollectionIdentifiers.push(clientIdentifier);
        return true;
      });
      return [...clientsToAdd, ...clientCollection];
    }
    return clientCollection;
  }
}
