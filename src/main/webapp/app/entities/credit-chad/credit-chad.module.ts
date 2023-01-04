import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CreditChadComponent } from './list/credit-chad.component';
import { CreditChadDetailComponent } from './detail/credit-chad-detail.component';
import { CreditChadUpdateComponent } from './update/credit-chad-update.component';
import { CreditChadDeleteDialogComponent } from './delete/credit-chad-delete-dialog.component';
import { CreditChadRoutingModule } from './route/credit-chad-routing.module';

@NgModule({
  imports: [SharedModule, CreditChadRoutingModule],
  declarations: [CreditChadComponent, CreditChadDetailComponent, CreditChadUpdateComponent, CreditChadDeleteDialogComponent],
})
export class CreditChadModule {}
