import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UserAccountChadComponent } from '../list/user-account-chad.component';
import { UserAccountChadDetailComponent } from '../detail/user-account-chad-detail.component';
import { UserAccountChadUpdateComponent } from '../update/user-account-chad-update.component';
import { UserAccountChadRoutingResolveService } from './user-account-chad-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const userAccountRoute: Routes = [
  {
    path: '',
    component: UserAccountChadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserAccountChadDetailComponent,
    resolve: {
      userAccount: UserAccountChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserAccountChadUpdateComponent,
    resolve: {
      userAccount: UserAccountChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserAccountChadUpdateComponent,
    resolve: {
      userAccount: UserAccountChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userAccountRoute)],
  exports: [RouterModule],
})
export class UserAccountChadRoutingModule {}
