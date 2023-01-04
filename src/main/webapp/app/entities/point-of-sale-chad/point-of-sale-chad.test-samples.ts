import { IPointOfSaleChad, NewPointOfSaleChad } from './point-of-sale-chad.model';

export const sampleWithRequiredData: IPointOfSaleChad = {
  id: 48332,
  name: 'cyan Michigan drive',
  responsable: 'Mountain Director Plastic',
  adresse: 'content Rustic',
};

export const sampleWithPartialData: IPointOfSaleChad = {
  id: 87448,
  name: 'support Industrial matrix',
  responsable: 'Accounts',
  adresse: 'overriding RSS',
};

export const sampleWithFullData: IPointOfSaleChad = {
  id: 49403,
  name: 'Avon synergize IB',
  responsable: 'Forward customized Representative',
  adresse: 'digital Center',
};

export const sampleWithNewData: NewPointOfSaleChad = {
  name: 'overriding',
  responsable: 'transmitter',
  adresse: 'Sleek',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
