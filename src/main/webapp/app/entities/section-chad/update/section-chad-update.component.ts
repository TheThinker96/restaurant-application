import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { SectionChadFormService, SectionChadFormGroup } from './section-chad-form.service';
import { ISectionChad } from '../section-chad.model';
import { SectionChadService } from '../service/section-chad.service';
import { IEntrepriseChad } from 'app/entities/entreprise-chad/entreprise-chad.model';
import { EntrepriseChadService } from 'app/entities/entreprise-chad/service/entreprise-chad.service';
import { SectionStatut } from 'app/entities/enumerations/section-statut.model';

@Component({
  selector: 'jhi-section-chad-update',
  templateUrl: './section-chad-update.component.html',
})
export class SectionChadUpdateComponent implements OnInit {
  isSaving = false;
  section: ISectionChad | null = null;
  sectionStatutValues = Object.keys(SectionStatut);

  entreprisesSharedCollection: IEntrepriseChad[] = [];

  editForm: SectionChadFormGroup = this.sectionFormService.createSectionChadFormGroup();

  constructor(
    protected sectionService: SectionChadService,
    protected sectionFormService: SectionChadFormService,
    protected entrepriseService: EntrepriseChadService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareEntrepriseChad = (o1: IEntrepriseChad | null, o2: IEntrepriseChad | null): boolean =>
    this.entrepriseService.compareEntrepriseChad(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ section }) => {
      this.section = section;
      if (section) {
        this.updateForm(section);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const section = this.sectionFormService.getSectionChad(this.editForm);
    if (section.id !== null) {
      this.subscribeToSaveResponse(this.sectionService.update(section));
    } else {
      this.subscribeToSaveResponse(this.sectionService.create(section));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISectionChad>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(section: ISectionChad): void {
    this.section = section;
    this.sectionFormService.resetForm(this.editForm, section);

    this.entreprisesSharedCollection = this.entrepriseService.addEntrepriseChadToCollectionIfMissing<IEntrepriseChad>(
      this.entreprisesSharedCollection,
      section.entreprise
    );
  }

  protected loadRelationshipsOptions(): void {
    this.entrepriseService
      .query()
      .pipe(map((res: HttpResponse<IEntrepriseChad[]>) => res.body ?? []))
      .pipe(
        map((entreprises: IEntrepriseChad[]) =>
          this.entrepriseService.addEntrepriseChadToCollectionIfMissing<IEntrepriseChad>(entreprises, this.section?.entreprise)
        )
      )
      .subscribe((entreprises: IEntrepriseChad[]) => (this.entreprisesSharedCollection = entreprises));
  }
}
