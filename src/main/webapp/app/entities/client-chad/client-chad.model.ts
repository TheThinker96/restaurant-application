import { Sexe } from 'app/entities/enumerations/sexe.model';

export interface IClientChad {
  id: number;
  nom?: string | null;
  prenom?: string | null;
  sexe?: Sexe | null;
  telephone?: string | null;
}

export type NewClientChad = Omit<IClientChad, 'id'> & { id: null };
