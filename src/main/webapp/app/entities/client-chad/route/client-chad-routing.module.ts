import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ClientChadComponent } from '../list/client-chad.component';
import { ClientChadDetailComponent } from '../detail/client-chad-detail.component';
import { ClientChadUpdateComponent } from '../update/client-chad-update.component';
import { ClientChadRoutingResolveService } from './client-chad-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const clientRoute: Routes = [
  {
    path: '',
    component: ClientChadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ClientChadDetailComponent,
    resolve: {
      client: ClientChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ClientChadUpdateComponent,
    resolve: {
      client: ClientChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ClientChadUpdateComponent,
    resolve: {
      client: ClientChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(clientRoute)],
  exports: [RouterModule],
})
export class ClientChadRoutingModule {}
