import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CreditChadFormService, CreditChadFormGroup } from './credit-chad-form.service';
import { ICreditChad } from '../credit-chad.model';
import { CreditChadService } from '../service/credit-chad.service';
import { IUserAccountChad } from 'app/entities/user-account-chad/user-account-chad.model';
import { UserAccountChadService } from 'app/entities/user-account-chad/service/user-account-chad.service';
import { CreditType } from 'app/entities/enumerations/credit-type.model';
import { CreditStatut } from 'app/entities/enumerations/credit-statut.model';

@Component({
  selector: 'jhi-credit-chad-update',
  templateUrl: './credit-chad-update.component.html',
})
export class CreditChadUpdateComponent implements OnInit {
  isSaving = false;
  credit: ICreditChad | null = null;
  creditTypeValues = Object.keys(CreditType);
  creditStatutValues = Object.keys(CreditStatut);

  userAccountsSharedCollection: IUserAccountChad[] = [];

  editForm: CreditChadFormGroup = this.creditFormService.createCreditChadFormGroup();

  constructor(
    protected creditService: CreditChadService,
    protected creditFormService: CreditChadFormService,
    protected userAccountService: UserAccountChadService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUserAccountChad = (o1: IUserAccountChad | null, o2: IUserAccountChad | null): boolean =>
    this.userAccountService.compareUserAccountChad(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ credit }) => {
      this.credit = credit;
      if (credit) {
        this.updateForm(credit);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const credit = this.creditFormService.getCreditChad(this.editForm);
    if (credit.id !== null) {
      this.subscribeToSaveResponse(this.creditService.update(credit));
    } else {
      this.subscribeToSaveResponse(this.creditService.create(credit));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICreditChad>>): void {
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

  protected updateForm(credit: ICreditChad): void {
    this.credit = credit;
    this.creditFormService.resetForm(this.editForm, credit);

    this.userAccountsSharedCollection = this.userAccountService.addUserAccountChadToCollectionIfMissing<IUserAccountChad>(
      this.userAccountsSharedCollection,
      credit.userAccount
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userAccountService
      .query()
      .pipe(map((res: HttpResponse<IUserAccountChad[]>) => res.body ?? []))
      .pipe(
        map((userAccounts: IUserAccountChad[]) =>
          this.userAccountService.addUserAccountChadToCollectionIfMissing<IUserAccountChad>(userAccounts, this.credit?.userAccount)
        )
      )
      .subscribe((userAccounts: IUserAccountChad[]) => (this.userAccountsSharedCollection = userAccounts));
  }
}
