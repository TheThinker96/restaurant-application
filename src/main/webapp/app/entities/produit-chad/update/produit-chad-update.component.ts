import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ProduitChadFormService, ProduitChadFormGroup } from './produit-chad-form.service';
import { IProduitChad } from '../produit-chad.model';
import { ProduitChadService } from '../service/produit-chad.service';
import { ISectionChad } from 'app/entities/section-chad/section-chad.model';
import { SectionChadService } from 'app/entities/section-chad/service/section-chad.service';
import { IEntrepriseChad } from 'app/entities/entreprise-chad/entreprise-chad.model';
import { EntrepriseChadService } from 'app/entities/entreprise-chad/service/entreprise-chad.service';

@Component({
  selector: 'jhi-produit-chad-update',
  templateUrl: './produit-chad-update.component.html',
})
export class ProduitChadUpdateComponent implements OnInit {
  isSaving = false;
  produit: IProduitChad | null = null;

  sectionsSharedCollection: ISectionChad[] = [];
  entreprisesSharedCollection: IEntrepriseChad[] = [];

  editForm: ProduitChadFormGroup = this.produitFormService.createProduitChadFormGroup();

  constructor(
    protected produitService: ProduitChadService,
    protected produitFormService: ProduitChadFormService,
    protected sectionService: SectionChadService,
    protected entrepriseService: EntrepriseChadService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSectionChad = (o1: ISectionChad | null, o2: ISectionChad | null): boolean => this.sectionService.compareSectionChad(o1, o2);

  compareEntrepriseChad = (o1: IEntrepriseChad | null, o2: IEntrepriseChad | null): boolean =>
    this.entrepriseService.compareEntrepriseChad(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produit }) => {
      this.produit = produit;
      if (produit) {
        this.updateForm(produit);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const produit = this.produitFormService.getProduitChad(this.editForm);
    if (produit.id !== null) {
      this.subscribeToSaveResponse(this.produitService.update(produit));
    } else {
      this.subscribeToSaveResponse(this.produitService.create(produit));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduitChad>>): void {
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

  protected updateForm(produit: IProduitChad): void {
    this.produit = produit;
    this.produitFormService.resetForm(this.editForm, produit);

    this.sectionsSharedCollection = this.sectionService.addSectionChadToCollectionIfMissing<ISectionChad>(
      this.sectionsSharedCollection,
      produit.section
    );
    this.entreprisesSharedCollection = this.entrepriseService.addEntrepriseChadToCollectionIfMissing<IEntrepriseChad>(
      this.entreprisesSharedCollection,
      produit.entreprise
    );
  }

  protected loadRelationshipsOptions(): void {
    this.sectionService
      .query()
      .pipe(map((res: HttpResponse<ISectionChad[]>) => res.body ?? []))
      .pipe(
        map((sections: ISectionChad[]) =>
          this.sectionService.addSectionChadToCollectionIfMissing<ISectionChad>(sections, this.produit?.section)
        )
      )
      .subscribe((sections: ISectionChad[]) => (this.sectionsSharedCollection = sections));

    this.entrepriseService
      .query()
      .pipe(map((res: HttpResponse<IEntrepriseChad[]>) => res.body ?? []))
      .pipe(
        map((entreprises: IEntrepriseChad[]) =>
          this.entrepriseService.addEntrepriseChadToCollectionIfMissing<IEntrepriseChad>(entreprises, this.produit?.entreprise)
        )
      )
      .subscribe((entreprises: IEntrepriseChad[]) => (this.entreprisesSharedCollection = entreprises));
  }
}
