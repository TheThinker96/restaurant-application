import dayjs from 'dayjs/esm';

import { VenteStatut } from 'app/entities/enumerations/vente-statut.model';

import { IVenteProduitChad, NewVenteProduitChad } from './vente-produit-chad.model';

export const sampleWithRequiredData: IVenteProduitChad = {
  id: 59581,
  quantite: 5614,
  prix: 7958,
};

export const sampleWithPartialData: IVenteProduitChad = {
  id: 7274,
  quantite: 96325,
  prix: 96726,
  dateVente: dayjs('2023-01-03T22:35'),
  statut: VenteStatut['CLOSED'],
};

export const sampleWithFullData: IVenteProduitChad = {
  id: 59358,
  quantite: 26873,
  prix: 92921,
  dateVente: dayjs('2023-01-04T15:42'),
  statut: VenteStatut['CLOSED'],
};

export const sampleWithNewData: NewVenteProduitChad = {
  quantite: 30906,
  prix: 47565,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
