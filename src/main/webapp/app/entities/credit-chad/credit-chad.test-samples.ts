import { CreditType } from 'app/entities/enumerations/credit-type.model';
import { CreditStatut } from 'app/entities/enumerations/credit-statut.model';

import { ICreditChad, NewCreditChad } from './credit-chad.model';

export const sampleWithRequiredData: ICreditChad = {
  id: 10215,
};

export const sampleWithPartialData: ICreditChad = {
  id: 84314,
  type: CreditType['CASHIER'],
};

export const sampleWithFullData: ICreditChad = {
  id: 70124,
  solde: 26862,
  type: CreditType['COMPTABLE'],
  statut: CreditStatut['ACTIVE'],
};

export const sampleWithNewData: NewCreditChad = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
