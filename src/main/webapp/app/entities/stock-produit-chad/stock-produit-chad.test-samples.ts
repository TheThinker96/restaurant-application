import dayjs from 'dayjs/esm';

import { IStockProduitChad, NewStockProduitChad } from './stock-produit-chad.model';

export const sampleWithRequiredData: IStockProduitChad = {
  id: 63103,
};

export const sampleWithPartialData: IStockProduitChad = {
  id: 58933,
  dateExpiration: dayjs('2023-01-04T06:38'),
};

export const sampleWithFullData: IStockProduitChad = {
  id: 66731,
  name: 'Car Gold Communications',
  quantite: 62357,
  dateExpiration: dayjs('2023-01-04T19:09'),
};

export const sampleWithNewData: NewStockProduitChad = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
