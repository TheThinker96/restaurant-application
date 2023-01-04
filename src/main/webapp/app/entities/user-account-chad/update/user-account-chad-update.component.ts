import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { UserAccountChadFormService, UserAccountChadFormGroup } from './user-account-chad-form.service';
import { IUserAccountChad } from '../user-account-chad.model';
import { UserAccountChadService } from '../service/user-account-chad.service';
import { IEntrepriseChad } from 'app/entities/entreprise-chad/entreprise-chad.model';
import { EntrepriseChadService } from 'app/entities/entreprise-chad/service/entreprise-chad.service';
import { IPointOfSaleChad } from 'app/entities/point-of-sale-chad/point-of-sale-chad.model';
import { PointOfSaleChadService } from 'app/entities/point-of-sale-chad/service/point-of-sale-chad.service';
import { Sexe } from 'app/entities/enumerations/sexe.model';
import { Role } from 'app/entities/enumerations/role.model';

@Component({
  selector: 'jhi-user-account-chad-update',
  templateUrl: './user-account-chad-update.component.html',
})
export class UserAccountChadUpdateComponent implements OnInit {
  isSaving = false;
  userAccount: IUserAccountChad | null = null;
  sexeValues = Object.keys(Sexe);
  roleValues = Object.keys(Role);

  entreprisesSharedCollection: IEntrepriseChad[] = [];
  pointOfSalesSharedCollection: IPointOfSaleChad[] = [];

  editForm: UserAccountChadFormGroup = this.userAccountFormService.createUserAccountChadFormGroup();

  constructor(
    protected userAccountService: UserAccountChadService,
    protected userAccountFormService: UserAccountChadFormService,
    protected entrepriseService: EntrepriseChadService,
    protected pointOfSaleService: PointOfSaleChadService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareEntrepriseChad = (o1: IEntrepriseChad | null, o2: IEntrepriseChad | null): boolean =>
    this.entrepriseService.compareEntrepriseChad(o1, o2);

  comparePointOfSaleChad = (o1: IPointOfSaleChad | null, o2: IPointOfSaleChad | null): boolean =>
    this.pointOfSaleService.comparePointOfSaleChad(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userAccount }) => {
      this.userAccount = userAccount;
      if (userAccount) {
        this.updateForm(userAccount);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userAccount = this.userAccountFormService.getUserAccountChad(this.editForm);
    if (userAccount.id !== null) {
      this.subscribeToSaveResponse(this.userAccountService.update(userAccount));
    } else {
      this.subscribeToSaveResponse(this.userAccountService.create(userAccount));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserAccountChad>>): void {
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

  protected updateForm(userAccount: IUserAccountChad): void {
    this.userAccount = userAccount;
    this.userAccountFormService.resetForm(this.editForm, userAccount);

    this.entreprisesSharedCollection = this.entrepriseService.addEntrepriseChadToCollectionIfMissing<IEntrepriseChad>(
      this.entreprisesSharedCollection,
      userAccount.entreprise
    );
    this.pointOfSalesSharedCollection = this.pointOfSaleService.addPointOfSaleChadToCollectionIfMissing<IPointOfSaleChad>(
      this.pointOfSalesSharedCollection,
      userAccount.pointOfSale
    );
  }

  protected loadRelationshipsOptions(): void {
    this.entrepriseService
      .query()
      .pipe(map((res: HttpResponse<IEntrepriseChad[]>) => res.body ?? []))
      .pipe(
        map((entreprises: IEntrepriseChad[]) =>
          this.entrepriseService.addEntrepriseChadToCollectionIfMissing<IEntrepriseChad>(entreprises, this.userAccount?.entreprise)
        )
      )
      .subscribe((entreprises: IEntrepriseChad[]) => (this.entreprisesSharedCollection = entreprises));

    this.pointOfSaleService
      .query()
      .pipe(map((res: HttpResponse<IPointOfSaleChad[]>) => res.body ?? []))
      .pipe(
        map((pointOfSales: IPointOfSaleChad[]) =>
          this.pointOfSaleService.addPointOfSaleChadToCollectionIfMissing<IPointOfSaleChad>(pointOfSales, this.userAccount?.pointOfSale)
        )
      )
      .subscribe((pointOfSales: IPointOfSaleChad[]) => (this.pointOfSalesSharedCollection = pointOfSales));
  }
}
