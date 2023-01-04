import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IStockProduitChad } from '../stock-produit-chad.model';
import { StockProduitChadService } from '../service/stock-produit-chad.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './stock-produit-chad-delete-dialog.component.html',
})
export class StockProduitChadDeleteDialogComponent {
  stockProduit?: IStockProduitChad;

  constructor(protected stockProduitService: StockProduitChadService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.stockProduitService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
