import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { StockProduitChadComponent } from './list/stock-produit-chad.component';
import { StockProduitChadDetailComponent } from './detail/stock-produit-chad-detail.component';
import { StockProduitChadUpdateComponent } from './update/stock-produit-chad-update.component';
import { StockProduitChadDeleteDialogComponent } from './delete/stock-produit-chad-delete-dialog.component';
import { StockProduitChadRoutingModule } from './route/stock-produit-chad-routing.module';

@NgModule({
  imports: [SharedModule, StockProduitChadRoutingModule],
  declarations: [
    StockProduitChadComponent,
    StockProduitChadDetailComponent,
    StockProduitChadUpdateComponent,
    StockProduitChadDeleteDialogComponent,
  ],
})
export class StockProduitChadModule {}
