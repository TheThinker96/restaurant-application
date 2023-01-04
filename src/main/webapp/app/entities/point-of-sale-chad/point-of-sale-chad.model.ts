import { IEntrepriseChad } from 'app/entities/entreprise-chad/entreprise-chad.model';

export interface IPointOfSaleChad {
  id: number;
  name?: string | null;
  responsable?: string | null;
  adresse?: string | null;
  entreprise?: Pick<IEntrepriseChad, 'id'> | null;
}

export type NewPointOfSaleChad = Omit<IPointOfSaleChad, 'id'> & { id: null };
