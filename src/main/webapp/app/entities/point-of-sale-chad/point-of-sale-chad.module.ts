import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PointOfSaleChadComponent } from './list/point-of-sale-chad.component';
import { PointOfSaleChadDetailComponent } from './detail/point-of-sale-chad-detail.component';
import { PointOfSaleChadUpdateComponent } from './update/point-of-sale-chad-update.component';
import { PointOfSaleChadDeleteDialogComponent } from './delete/point-of-sale-chad-delete-dialog.component';
import { PointOfSaleChadRoutingModule } from './route/point-of-sale-chad-routing.module';

@NgModule({
  imports: [SharedModule, PointOfSaleChadRoutingModule],
  declarations: [
    PointOfSaleChadComponent,
    PointOfSaleChadDetailComponent,
    PointOfSaleChadUpdateComponent,
    PointOfSaleChadDeleteDialogComponent,
  ],
})
export class PointOfSaleChadModule {}
