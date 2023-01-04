import { IEntrepriseChad } from 'app/entities/entreprise-chad/entreprise-chad.model';
import { IPointOfSaleChad } from 'app/entities/point-of-sale-chad/point-of-sale-chad.model';
import { Sexe } from 'app/entities/enumerations/sexe.model';
import { Role } from 'app/entities/enumerations/role.model';

export interface IUserAccountChad {
  id: number;
  nom?: string | null;
  prenom?: string | null;
  sexe?: Sexe | null;
  role?: Role | null;
  telephone?: string | null;
  entreprise?: Pick<IEntrepriseChad, 'id'> | null;
  pointOfSale?: Pick<IPointOfSaleChad, 'id'> | null;
}

export type NewUserAccountChad = Omit<IUserAccountChad, 'id'> & { id: null };
