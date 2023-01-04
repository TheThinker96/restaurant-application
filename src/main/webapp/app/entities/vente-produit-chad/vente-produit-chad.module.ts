import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VenteProduitChadComponent } from './list/vente-produit-chad.component';
import { VenteProduitChadDetailComponent } from './detail/vente-produit-chad-detail.component';
import { VenteProduitChadUpdateComponent } from './update/vente-produit-chad-update.component';
import { VenteProduitChadDeleteDialogComponent } from './delete/vente-produit-chad-delete-dialog.component';
import { VenteProduitChadRoutingModule } from './route/vente-produit-chad-routing.module';

@NgModule({
  imports: [SharedModule, VenteProduitChadRoutingModule],
  declarations: [
    VenteProduitChadComponent,
    VenteProduitChadDetailComponent,
    VenteProduitChadUpdateComponent,
    VenteProduitChadDeleteDialogComponent,
  ],
})
export class VenteProduitChadModule {}
