import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EntrepriseChadComponent } from './list/entreprise-chad.component';
import { EntrepriseChadDetailComponent } from './detail/entreprise-chad-detail.component';
import { EntrepriseChadUpdateComponent } from './update/entreprise-chad-update.component';
import { EntrepriseChadDeleteDialogComponent } from './delete/entreprise-chad-delete-dialog.component';
import { EntrepriseChadRoutingModule } from './route/entreprise-chad-routing.module';

@NgModule({
  imports: [SharedModule, EntrepriseChadRoutingModule],
  declarations: [
    EntrepriseChadComponent,
    EntrepriseChadDetailComponent,
    EntrepriseChadUpdateComponent,
    EntrepriseChadDeleteDialogComponent,
  ],
})
export class EntrepriseChadModule {}
