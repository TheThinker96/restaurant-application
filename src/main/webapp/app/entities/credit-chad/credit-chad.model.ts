import { IUserAccountChad } from 'app/entities/user-account-chad/user-account-chad.model';
import { CreditType } from 'app/entities/enumerations/credit-type.model';
import { CreditStatut } from 'app/entities/enumerations/credit-statut.model';

export interface ICreditChad {
  id: number;
  solde?: number | null;
  type?: CreditType | null;
  statut?: CreditStatut | null;
  userAccount?: Pick<IUserAccountChad, 'id'> | null;
}

export type NewCreditChad = Omit<ICreditChad, 'id'> & { id: null };
