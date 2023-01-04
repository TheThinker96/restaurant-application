import dayjs from 'dayjs/esm';
import { IProduitChad } from 'app/entities/produit-chad/produit-chad.model';
import { IStockProduitChad } from 'app/entities/stock-produit-chad/stock-produit-chad.model';
import { IUserAccountChad } from 'app/entities/user-account-chad/user-account-chad.model';
import { VenteStatut } from 'app/entities/enumerations/vente-statut.model';

export interface IVenteProduitChad {
  id: number;
  quantite?: number | null;
  prix?: number | null;
  dateVente?: dayjs.Dayjs | null;
  statut?: VenteStatut | null;
  produit?: Pick<IProduitChad, 'id'> | null;
  stockProduit?: Pick<IStockProduitChad, 'id'> | null;
  userAccount?: Pick<IUserAccountChad, 'id'> | null;
}

export type NewVenteProduitChad = Omit<IVenteProduitChad, 'id'> & { id: null };
