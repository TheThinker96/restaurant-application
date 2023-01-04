import { Sexe } from 'app/entities/enumerations/sexe.model';
import { Role } from 'app/entities/enumerations/role.model';

import { IUserAccountChad, NewUserAccountChad } from './user-account-chad.model';

export const sampleWithRequiredData: IUserAccountChad = {
  id: 44330,
  nom: 'Berkshire',
  prenom: 'deposit JBOD',
  telephone: '1-344-870-1607 x55489',
};

export const sampleWithPartialData: IUserAccountChad = {
  id: 55576,
  nom: 'Rustic Oklahoma maroon',
  prenom: 'Metal',
  sexe: Sexe['Masculin'],
  role: Role['RESPONSABLE_POINT'],
  telephone: '1-999-484-9057',
};

export const sampleWithFullData: IUserAccountChad = {
  id: 83302,
  nom: 'Towels engineer Advanced',
  prenom: 'Handcrafted Fantastic Specialist',
  sexe: Sexe['Feminin'],
  role: Role['RESPONSABLE_POINT'],
  telephone: '(318) 225-1921 x9096',
};

export const sampleWithNewData: NewUserAccountChad = {
  nom: 'Car Frozen monetize',
  prenom: 'Vision-oriented up SSL',
  telephone: '677-709-0614',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
