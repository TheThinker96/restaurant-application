import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { StockProduitChadComponent } from '../list/stock-produit-chad.component';
import { StockProduitChadDetailComponent } from '../detail/stock-produit-chad-detail.component';
import { StockProduitChadUpdateComponent } from '../update/stock-produit-chad-update.component';
import { StockProduitChadRoutingResolveService } from './stock-produit-chad-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const stockProduitRoute: Routes = [
  {
    path: '',
    component: StockProduitChadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StockProduitChadDetailComponent,
    resolve: {
      stockProduit: StockProduitChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StockProduitChadUpdateComponent,
    resolve: {
      stockProduit: StockProduitChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StockProduitChadUpdateComponent,
    resolve: {
      stockProduit: StockProduitChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(stockProduitRoute)],
  exports: [RouterModule],
})
export class StockProduitChadRoutingModule {}
