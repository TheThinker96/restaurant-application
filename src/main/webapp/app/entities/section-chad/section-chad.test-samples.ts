import { SectionStatut } from 'app/entities/enumerations/section-statut.model';

import { ISectionChad, NewSectionChad } from './section-chad.model';

export const sampleWithRequiredData: ISectionChad = {
  id: 8943,
  name: 'data-warehouse',
};

export const sampleWithPartialData: ISectionChad = {
  id: 66560,
  name: 'productivity Loan',
};

export const sampleWithFullData: ISectionChad = {
  id: 25062,
  name: 'mesh Incredible Networked',
  statut: SectionStatut['ACTIVE'],
};

export const sampleWithNewData: NewSectionChad = {
  name: 'Berkshire platforms compress',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
