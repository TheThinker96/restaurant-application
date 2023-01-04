import { Sexe } from 'app/entities/enumerations/sexe.model';

import { IClientChad, NewClientChad } from './client-chad.model';

export const sampleWithRequiredData: IClientChad = {
  id: 71655,
  nom: 'hacking',
  prenom: 'primary Virginia Concrete',
  telephone: '1-405-689-9241 x24214',
};

export const sampleWithPartialData: IClientChad = {
  id: 92213,
  nom: 'synthesize Electronics copy',
  prenom: 'Cotton silver',
  sexe: Sexe['Feminin'],
  telephone: '(460) 510-7709 x413',
};

export const sampleWithFullData: IClientChad = {
  id: 21604,
  nom: 'input',
  prenom: 'discrete',
  sexe: Sexe['Feminin'],
  telephone: '908-670-8957',
};

export const sampleWithNewData: NewClientChad = {
  nom: 'B2C Creek EXE',
  prenom: 'Upgradable SSL',
  telephone: '989.471.1121 x46521',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
