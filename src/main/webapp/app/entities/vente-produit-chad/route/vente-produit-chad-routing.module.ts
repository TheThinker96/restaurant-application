import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { VenteProduitChadComponent } from '../list/vente-produit-chad.component';
import { VenteProduitChadDetailComponent } from '../detail/vente-produit-chad-detail.component';
import { VenteProduitChadUpdateComponent } from '../update/vente-produit-chad-update.component';
import { VenteProduitChadRoutingResolveService } from './vente-produit-chad-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const venteProduitRoute: Routes = [
  {
    path: '',
    component: VenteProduitChadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VenteProduitChadDetailComponent,
    resolve: {
      venteProduit: VenteProduitChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VenteProduitChadUpdateComponent,
    resolve: {
      venteProduit: VenteProduitChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VenteProduitChadUpdateComponent,
    resolve: {
      venteProduit: VenteProduitChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(venteProduitRoute)],
  exports: [RouterModule],
})
export class VenteProduitChadRoutingModule {}
