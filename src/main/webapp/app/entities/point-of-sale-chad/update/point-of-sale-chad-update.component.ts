import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PointOfSaleChadFormService, PointOfSaleChadFormGroup } from './point-of-sale-chad-form.service';
import { IPointOfSaleChad } from '../point-of-sale-chad.model';
import { PointOfSaleChadService } from '../service/point-of-sale-chad.service';
import { IEntrepriseChad } from 'app/entities/entreprise-chad/entreprise-chad.model';
import { EntrepriseChadService } from 'app/entities/entreprise-chad/service/entreprise-chad.service';

@Component({
  selector: 'jhi-point-of-sale-chad-update',
  templateUrl: './point-of-sale-chad-update.component.html',
})
export class PointOfSaleChadUpdateComponent implements OnInit {
  isSaving = false;
  pointOfSale: IPointOfSaleChad | null = null;

  entreprisesSharedCollection: IEntrepriseChad[] = [];

  editForm: PointOfSaleChadFormGroup = this.pointOfSaleFormService.createPointOfSaleChadFormGroup();

  constructor(
    protected pointOfSaleService: PointOfSaleChadService,
    protected pointOfSaleFormService: PointOfSaleChadFormService,
    protected entrepriseService: EntrepriseChadService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareEntrepriseChad = (o1: IEntrepriseChad | null, o2: IEntrepriseChad | null): boolean =>
    this.entrepriseService.compareEntrepriseChad(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pointOfSale }) => {
      this.pointOfSale = pointOfSale;
      if (pointOfSale) {
        this.updateForm(pointOfSale);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pointOfSale = this.pointOfSaleFormService.getPointOfSaleChad(this.editForm);
    if (pointOfSale.id !== null) {
      this.subscribeToSaveResponse(this.pointOfSaleService.update(pointOfSale));
    } else {
      this.subscribeToSaveResponse(this.pointOfSaleService.create(pointOfSale));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPointOfSaleChad>>): void {
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

  protected updateForm(pointOfSale: IPointOfSaleChad): void {
    this.pointOfSale = pointOfSale;
    this.pointOfSaleFormService.resetForm(this.editForm, pointOfSale);

    this.entreprisesSharedCollection = this.entrepriseService.addEntrepriseChadToCollectionIfMissing<IEntrepriseChad>(
      this.entreprisesSharedCollection,
      pointOfSale.entreprise
    );
  }

  protected loadRelationshipsOptions(): void {
    this.entrepriseService
      .query()
      .pipe(map((res: HttpResponse<IEntrepriseChad[]>) => res.body ?? []))
      .pipe(
        map((entreprises: IEntrepriseChad[]) =>
          this.entrepriseService.addEntrepriseChadToCollectionIfMissing<IEntrepriseChad>(entreprises, this.pointOfSale?.entreprise)
        )
      )
      .subscribe((entreprises: IEntrepriseChad[]) => (this.entreprisesSharedCollection = entreprises));
  }
}
