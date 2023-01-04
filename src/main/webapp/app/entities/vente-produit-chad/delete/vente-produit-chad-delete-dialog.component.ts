import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IVenteProduitChad } from '../vente-produit-chad.model';
import { VenteProduitChadService } from '../service/vente-produit-chad.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './vente-produit-chad-delete-dialog.component.html',
})
export class VenteProduitChadDeleteDialogComponent {
  venteProduit?: IVenteProduitChad;

  constructor(protected venteProduitService: VenteProduitChadService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.venteProduitService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
