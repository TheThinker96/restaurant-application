import { EntrepriseStatut } from 'app/entities/enumerations/entreprise-statut.model';

export interface IEntrepriseChad {
  id: number;
  name?: string | null;
  responsable?: string | null;
  adresse?: string | null;
  telephones?: string | null;
  statut?: EntrepriseStatut | null;
}

export type NewEntrepriseChad = Omit<IEntrepriseChad, 'id'> & { id: null };
