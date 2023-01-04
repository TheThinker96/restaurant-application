import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPointOfSaleChad } from '../point-of-sale-chad.model';
import { PointOfSaleChadService } from '../service/point-of-sale-chad.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './point-of-sale-chad-delete-dialog.component.html',
})
export class PointOfSaleChadDeleteDialogComponent {
  pointOfSale?: IPointOfSaleChad;

  constructor(protected pointOfSaleService: PointOfSaleChadService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pointOfSaleService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
