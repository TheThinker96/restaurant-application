import { ISectionChad } from 'app/entities/section-chad/section-chad.model';
import { IEntrepriseChad } from 'app/entities/entreprise-chad/entreprise-chad.model';

export interface IProduitChad {
  id: number;
  name?: string | null;
  price?: number | null;
  section?: Pick<ISectionChad, 'id'> | null;
  entreprise?: Pick<IEntrepriseChad, 'id'> | null;
}

export type NewProduitChad = Omit<IProduitChad, 'id'> & { id: null };
