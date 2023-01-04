import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProduitChad } from '../produit-chad.model';
import { ProduitChadService } from '../service/produit-chad.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './produit-chad-delete-dialog.component.html',
})
export class ProduitChadDeleteDialogComponent {
  produit?: IProduitChad;

  constructor(protected produitService: ProduitChadService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.produitService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
