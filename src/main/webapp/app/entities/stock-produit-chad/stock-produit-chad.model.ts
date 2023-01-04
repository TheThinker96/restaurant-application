import dayjs from 'dayjs/esm';
import { IProduitChad } from 'app/entities/produit-chad/produit-chad.model';

export interface IStockProduitChad {
  id: number;
  name?: string | null;
  quantite?: number | null;
  dateExpiration?: dayjs.Dayjs | null;
  produit?: Pick<IProduitChad, 'id'> | null;
}

export type NewStockProduitChad = Omit<IStockProduitChad, 'id'> & { id: null };
