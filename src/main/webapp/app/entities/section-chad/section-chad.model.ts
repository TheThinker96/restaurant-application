import { IEntrepriseChad } from 'app/entities/entreprise-chad/entreprise-chad.model';
import { SectionStatut } from 'app/entities/enumerations/section-statut.model';

export interface ISectionChad {
  id: number;
  name?: string | null;
  statut?: SectionStatut | null;
  entreprise?: Pick<IEntrepriseChad, 'id'> | null;
}

export type NewSectionChad = Omit<ISectionChad, 'id'> & { id: null };
