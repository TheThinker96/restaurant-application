import { IProduitChad, NewProduitChad } from './produit-chad.model';

export const sampleWithRequiredData: IProduitChad = {
  id: 91013,
  name: 'Garden',
  price: 46320,
};

export const sampleWithPartialData: IProduitChad = {
  id: 55887,
  name: 'client-server invoice',
  price: 2823,
};

export const sampleWithFullData: IProduitChad = {
  id: 93080,
  name: 'Shoes Fresh bandwidth',
  price: 9519,
};

export const sampleWithNewData: NewProduitChad = {
  name: 'quantify purple Union',
  price: 90458,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
