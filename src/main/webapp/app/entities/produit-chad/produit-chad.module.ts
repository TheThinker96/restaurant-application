import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProduitChadComponent } from './list/produit-chad.component';
import { ProduitChadDetailComponent } from './detail/produit-chad-detail.component';
import { ProduitChadUpdateComponent } from './update/produit-chad-update.component';
import { ProduitChadDeleteDialogComponent } from './delete/produit-chad-delete-dialog.component';
import { ProduitChadRoutingModule } from './route/produit-chad-routing.module';

@NgModule({
  imports: [SharedModule, ProduitChadRoutingModule],
  declarations: [ProduitChadComponent, ProduitChadDetailComponent, ProduitChadUpdateComponent, ProduitChadDeleteDialogComponent],
})
export class ProduitChadModule {}
