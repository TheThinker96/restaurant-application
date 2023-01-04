import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ClientChadComponent } from './list/client-chad.component';
import { ClientChadDetailComponent } from './detail/client-chad-detail.component';
import { ClientChadUpdateComponent } from './update/client-chad-update.component';
import { ClientChadDeleteDialogComponent } from './delete/client-chad-delete-dialog.component';
import { ClientChadRoutingModule } from './route/client-chad-routing.module';

@NgModule({
  imports: [SharedModule, ClientChadRoutingModule],
  declarations: [ClientChadComponent, ClientChadDetailComponent, ClientChadUpdateComponent, ClientChadDeleteDialogComponent],
})
export class ClientChadModule {}
