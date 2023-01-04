import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CreditChadComponent } from '../list/credit-chad.component';
import { CreditChadDetailComponent } from '../detail/credit-chad-detail.component';
import { CreditChadUpdateComponent } from '../update/credit-chad-update.component';
import { CreditChadRoutingResolveService } from './credit-chad-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const creditRoute: Routes = [
  {
    path: '',
    component: CreditChadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CreditChadDetailComponent,
    resolve: {
      credit: CreditChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CreditChadUpdateComponent,
    resolve: {
      credit: CreditChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CreditChadUpdateComponent,
    resolve: {
      credit: CreditChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(creditRoute)],
  exports: [RouterModule],
})
export class CreditChadRoutingModule {}
