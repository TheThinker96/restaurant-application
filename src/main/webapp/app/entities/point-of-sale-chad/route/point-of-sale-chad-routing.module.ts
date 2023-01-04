import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PointOfSaleChadComponent } from '../list/point-of-sale-chad.component';
import { PointOfSaleChadDetailComponent } from '../detail/point-of-sale-chad-detail.component';
import { PointOfSaleChadUpdateComponent } from '../update/point-of-sale-chad-update.component';
import { PointOfSaleChadRoutingResolveService } from './point-of-sale-chad-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const pointOfSaleRoute: Routes = [
  {
    path: '',
    component: PointOfSaleChadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PointOfSaleChadDetailComponent,
    resolve: {
      pointOfSale: PointOfSaleChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PointOfSaleChadUpdateComponent,
    resolve: {
      pointOfSale: PointOfSaleChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PointOfSaleChadUpdateComponent,
    resolve: {
      pointOfSale: PointOfSaleChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pointOfSaleRoute)],
  exports: [RouterModule],
})
export class PointOfSaleChadRoutingModule {}
