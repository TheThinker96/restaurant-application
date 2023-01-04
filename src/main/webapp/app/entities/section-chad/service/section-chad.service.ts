import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISectionChad, NewSectionChad } from '../section-chad.model';

export type PartialUpdateSectionChad = Partial<ISectionChad> & Pick<ISectionChad, 'id'>;

export type EntityResponseType = HttpResponse<ISectionChad>;
export type EntityArrayResponseType = HttpResponse<ISectionChad[]>;

@Injectable({ providedIn: 'root' })
export class SectionChadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/sections');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(section: NewSectionChad): Observable<EntityResponseType> {
    return this.http.post<ISectionChad>(this.resourceUrl, section, { observe: 'response' });
  }

  update(section: ISectionChad): Observable<EntityResponseType> {
    return this.http.put<ISectionChad>(`${this.resourceUrl}/${this.getSectionChadIdentifier(section)}`, section, { observe: 'response' });
  }

  partialUpdate(section: PartialUpdateSectionChad): Observable<EntityResponseType> {
    return this.http.patch<ISectionChad>(`${this.resourceUrl}/${this.getSectionChadIdentifier(section)}`, section, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISectionChad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISectionChad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSectionChadIdentifier(section: Pick<ISectionChad, 'id'>): number {
    return section.id;
  }

  compareSectionChad(o1: Pick<ISectionChad, 'id'> | null, o2: Pick<ISectionChad, 'id'> | null): boolean {
    return o1 && o2 ? this.getSectionChadIdentifier(o1) === this.getSectionChadIdentifier(o2) : o1 === o2;
  }

  addSectionChadToCollectionIfMissing<Type extends Pick<ISectionChad, 'id'>>(
    sectionCollection: Type[],
    ...sectionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const sections: Type[] = sectionsToCheck.filter(isPresent);
    if (sections.length > 0) {
      const sectionCollectionIdentifiers = sectionCollection.map(sectionItem => this.getSectionChadIdentifier(sectionItem)!);
      const sectionsToAdd = sections.filter(sectionItem => {
        const sectionIdentifier = this.getSectionChadIdentifier(sectionItem);
        if (sectionCollectionIdentifiers.includes(sectionIdentifier)) {
          return false;
        }
        sectionCollectionIdentifiers.push(sectionIdentifier);
        return true;
      });
      return [...sectionsToAdd, ...sectionCollection];
    }
    return sectionCollection;
  }
}
