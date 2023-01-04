import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISectionChad } from '../section-chad.model';
import { SectionChadService } from '../service/section-chad.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './section-chad-delete-dialog.component.html',
})
export class SectionChadDeleteDialogComponent {
  section?: ISectionChad;

  constructor(protected sectionService: SectionChadService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sectionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
