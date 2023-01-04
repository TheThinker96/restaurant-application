import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserAccountChad } from '../user-account-chad.model';
import { UserAccountChadService } from '../service/user-account-chad.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './user-account-chad-delete-dialog.component.html',
})
export class UserAccountChadDeleteDialogComponent {
  userAccount?: IUserAccountChad;

  constructor(protected userAccountService: UserAccountChadService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userAccountService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
