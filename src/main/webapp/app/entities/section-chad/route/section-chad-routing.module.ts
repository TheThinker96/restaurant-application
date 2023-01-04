import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SectionChadComponent } from '../list/section-chad.component';
import { SectionChadDetailComponent } from '../detail/section-chad-detail.component';
import { SectionChadUpdateComponent } from '../update/section-chad-update.component';
import { SectionChadRoutingResolveService } from './section-chad-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const sectionRoute: Routes = [
  {
    path: '',
    component: SectionChadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SectionChadDetailComponent,
    resolve: {
      section: SectionChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SectionChadUpdateComponent,
    resolve: {
      section: SectionChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SectionChadUpdateComponent,
    resolve: {
      section: SectionChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(sectionRoute)],
  exports: [RouterModule],
})
export class SectionChadRoutingModule {}
