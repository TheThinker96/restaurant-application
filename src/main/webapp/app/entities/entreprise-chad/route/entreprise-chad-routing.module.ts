import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EntrepriseChadComponent } from '../list/entreprise-chad.component';
import { EntrepriseChadDetailComponent } from '../detail/entreprise-chad-detail.component';
import { EntrepriseChadUpdateComponent } from '../update/entreprise-chad-update.component';
import { EntrepriseChadRoutingResolveService } from './entreprise-chad-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const entrepriseRoute: Routes = [
  {
    path: '',
    component: EntrepriseChadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EntrepriseChadDetailComponent,
    resolve: {
      entreprise: EntrepriseChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EntrepriseChadUpdateComponent,
    resolve: {
      entreprise: EntrepriseChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EntrepriseChadUpdateComponent,
    resolve: {
      entreprise: EntrepriseChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(entrepriseRoute)],
  exports: [RouterModule],
})
export class EntrepriseChadRoutingModule {}
