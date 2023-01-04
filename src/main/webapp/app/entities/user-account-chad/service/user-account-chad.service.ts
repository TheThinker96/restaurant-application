import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUserAccountChad, NewUserAccountChad } from '../user-account-chad.model';

export type PartialUpdateUserAccountChad = Partial<IUserAccountChad> & Pick<IUserAccountChad, 'id'>;

export type EntityResponseType = HttpResponse<IUserAccountChad>;
export type EntityArrayResponseType = HttpResponse<IUserAccountChad[]>;

@Injectable({ providedIn: 'root' })
export class UserAccountChadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/user-accounts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(userAccount: NewUserAccountChad): Observable<EntityResponseType> {
    return this.http.post<IUserAccountChad>(this.resourceUrl, userAccount, { observe: 'response' });
  }

  update(userAccount: IUserAccountChad): Observable<EntityResponseType> {
    return this.http.put<IUserAccountChad>(`${this.resourceUrl}/${this.getUserAccountChadIdentifier(userAccount)}`, userAccount, {
      observe: 'response',
    });
  }

  partialUpdate(userAccount: PartialUpdateUserAccountChad): Observable<EntityResponseType> {
    return this.http.patch<IUserAccountChad>(`${this.resourceUrl}/${this.getUserAccountChadIdentifier(userAccount)}`, userAccount, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserAccountChad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserAccountChad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getUserAccountChadIdentifier(userAccount: Pick<IUserAccountChad, 'id'>): number {
    return userAccount.id;
  }

  compareUserAccountChad(o1: Pick<IUserAccountChad, 'id'> | null, o2: Pick<IUserAccountChad, 'id'> | null): boolean {
    return o1 && o2 ? this.getUserAccountChadIdentifier(o1) === this.getUserAccountChadIdentifier(o2) : o1 === o2;
  }

  addUserAccountChadToCollectionIfMissing<Type extends Pick<IUserAccountChad, 'id'>>(
    userAccountCollection: Type[],
    ...userAccountsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const userAccounts: Type[] = userAccountsToCheck.filter(isPresent);
    if (userAccounts.length > 0) {
      const userAccountCollectionIdentifiers = userAccountCollection.map(
        userAccountItem => this.getUserAccountChadIdentifier(userAccountItem)!
      );
      const userAccountsToAdd = userAccounts.filter(userAccountItem => {
        const userAccountIdentifier = this.getUserAccountChadIdentifier(userAccountItem);
        if (userAccountCollectionIdentifiers.includes(userAccountIdentifier)) {
          return false;
        }
        userAccountCollectionIdentifiers.push(userAccountIdentifier);
        return true;
      });
      return [...userAccountsToAdd, ...userAccountCollection];
    }
    return userAccountCollection;
  }
}
