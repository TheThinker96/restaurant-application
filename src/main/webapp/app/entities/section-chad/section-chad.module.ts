import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SectionChadComponent } from './list/section-chad.component';
import { SectionChadDetailComponent } from './detail/section-chad-detail.component';
import { SectionChadUpdateComponent } from './update/section-chad-update.component';
import { SectionChadDeleteDialogComponent } from './delete/section-chad-delete-dialog.component';
import { SectionChadRoutingModule } from './route/section-chad-routing.module';

@NgModule({
  imports: [SharedModule, SectionChadRoutingModule],
  declarations: [SectionChadComponent, SectionChadDetailComponent, SectionChadUpdateComponent, SectionChadDeleteDialogComponent],
})
export class SectionChadModule {}
