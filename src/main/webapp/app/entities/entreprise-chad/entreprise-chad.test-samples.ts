import { EntrepriseStatut } from 'app/entities/enumerations/entreprise-statut.model';

import { IEntrepriseChad, NewEntrepriseChad } from './entreprise-chad.model';

export const sampleWithRequiredData: IEntrepriseChad = {
  id: 29492,
  name: 'teal',
  responsable: 'Tajikistan TCP',
  telephones: 'bus District',
};

export const sampleWithPartialData: IEntrepriseChad = {
  id: 14952,
  name: 'Regional',
  responsable: 'Electronics',
  telephones: 'synergistic array markets',
  statut: EntrepriseStatut['CLOSED'],
};

export const sampleWithFullData: IEntrepriseChad = {
  id: 5335,
  name: 'Devolved',
  responsable: 'Money withdrawal Serbia',
  adresse: 'iterate matrix',
  telephones: 'Jewelery Wisconsin',
  statut: EntrepriseStatut['CLOSED'],
};

export const sampleWithNewData: NewEntrepriseChad = {
  name: 'Licensed',
  responsable: 'Specialist cross-platform empower',
  telephones: 'Pound New',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
