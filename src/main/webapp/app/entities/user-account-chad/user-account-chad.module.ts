import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UserAccountChadComponent } from './list/user-account-chad.component';
import { UserAccountChadDetailComponent } from './detail/user-account-chad-detail.component';
import { UserAccountChadUpdateComponent } from './update/user-account-chad-update.component';
import { UserAccountChadDeleteDialogComponent } from './delete/user-account-chad-delete-dialog.component';
import { UserAccountChadRoutingModule } from './route/user-account-chad-routing.module';

@NgModule({
  imports: [SharedModule, UserAccountChadRoutingModule],
  declarations: [
    UserAccountChadComponent,
    UserAccountChadDetailComponent,
    UserAccountChadUpdateComponent,
    UserAccountChadDeleteDialogComponent,
  ],
})
export class UserAccountChadModule {}
