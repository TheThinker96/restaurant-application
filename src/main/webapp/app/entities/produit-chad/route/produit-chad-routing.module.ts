import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProduitChadComponent } from '../list/produit-chad.component';
import { ProduitChadDetailComponent } from '../detail/produit-chad-detail.component';
import { ProduitChadUpdateComponent } from '../update/produit-chad-update.component';
import { ProduitChadRoutingResolveService } from './produit-chad-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const produitRoute: Routes = [
  {
    path: '',
    component: ProduitChadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProduitChadDetailComponent,
    resolve: {
      produit: ProduitChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProduitChadUpdateComponent,
    resolve: {
      produit: ProduitChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProduitChadUpdateComponent,
    resolve: {
      produit: ProduitChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(produitRoute)],
  exports: [RouterModule],
})
export class ProduitChadRoutingModule {}
