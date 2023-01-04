import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEntrepriseChad } from '../entreprise-chad.model';
import { EntrepriseChadService } from '../service/entreprise-chad.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './entreprise-chad-delete-dialog.component.html',
})
export class EntrepriseChadDeleteDialogComponent {
  entreprise?: IEntrepriseChad;

  constructor(protected entrepriseService: EntrepriseChadService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.entrepriseService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
