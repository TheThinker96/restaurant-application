import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { VenteProduitChadFormService, VenteProduitChadFormGroup } from './vente-produit-chad-form.service';
import { IVenteProduitChad } from '../vente-produit-chad.model';
import { VenteProduitChadService } from '../service/vente-produit-chad.service';
import { IProduitChad } from 'app/entities/produit-chad/produit-chad.model';
import { ProduitChadService } from 'app/entities/produit-chad/service/produit-chad.service';
import { IStockProduitChad } from 'app/entities/stock-produit-chad/stock-produit-chad.model';
import { StockProduitChadService } from 'app/entities/stock-produit-chad/service/stock-produit-chad.service';
import { IUserAccountChad } from 'app/entities/user-account-chad/user-account-chad.model';
import { UserAccountChadService } from 'app/entities/user-account-chad/service/user-account-chad.service';
import { VenteStatut } from 'app/entities/enumerations/vente-statut.model';

@Component({
  selector: 'jhi-vente-produit-chad-update',
  templateUrl: './vente-produit-chad-update.component.html',
})
export class VenteProduitChadUpdateComponent implements OnInit {
  isSaving = false;
  venteProduit: IVenteProduitChad | null = null;
  venteStatutValues = Object.keys(VenteStatut);

  produitsSharedCollection: IProduitChad[] = [];
  stockProduitsSharedCollection: IStockProduitChad[] = [];
  userAccountsSharedCollection: IUserAccountChad[] = [];

  editForm: VenteProduitChadFormGroup = this.venteProduitFormService.createVenteProduitChadFormGroup();

  constructor(
    protected venteProduitService: VenteProduitChadService,
    protected venteProduitFormService: VenteProduitChadFormService,
    protected produitService: ProduitChadService,
    protected stockProduitService: StockProduitChadService,
    protected userAccountService: UserAccountChadService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareProduitChad = (o1: IProduitChad | null, o2: IProduitChad | null): boolean => this.produitService.compareProduitChad(o1, o2);

  compareStockProduitChad = (o1: IStockProduitChad | null, o2: IStockProduitChad | null): boolean =>
    this.stockProduitService.compareStockProduitChad(o1, o2);

  compareUserAccountChad = (o1: IUserAccountChad | null, o2: IUserAccountChad | null): boolean =>
    this.userAccountService.compareUserAccountChad(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ venteProduit }) => {
      this.venteProduit = venteProduit;
      if (venteProduit) {
        this.updateForm(venteProduit);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const venteProduit = this.venteProduitFormService.getVenteProduitChad(this.editForm);
    if (venteProduit.id !== null) {
      this.subscribeToSaveResponse(this.venteProduitService.update(venteProduit));
    } else {
      this.subscribeToSaveResponse(this.venteProduitService.create(venteProduit));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVenteProduitChad>>): void {
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

  protected updateForm(venteProduit: IVenteProduitChad): void {
    this.venteProduit = venteProduit;
    this.venteProduitFormService.resetForm(this.editForm, venteProduit);

    this.produitsSharedCollection = this.produitService.addProduitChadToCollectionIfMissing<IProduitChad>(
      this.produitsSharedCollection,
      venteProduit.produit
    );
    this.stockProduitsSharedCollection = this.stockProduitService.addStockProduitChadToCollectionIfMissing<IStockProduitChad>(
      this.stockProduitsSharedCollection,
      venteProduit.stockProduit
    );
    this.userAccountsSharedCollection = this.userAccountService.addUserAccountChadToCollectionIfMissing<IUserAccountChad>(
      this.userAccountsSharedCollection,
      venteProduit.userAccount
    );
  }

  protected loadRelationshipsOptions(): void {
    this.produitService
      .query()
      .pipe(map((res: HttpResponse<IProduitChad[]>) => res.body ?? []))
      .pipe(
        map((produits: IProduitChad[]) =>
          this.produitService.addProduitChadToCollectionIfMissing<IProduitChad>(produits, this.venteProduit?.produit)
        )
      )
      .subscribe((produits: IProduitChad[]) => (this.produitsSharedCollection = produits));

    this.stockProduitService
      .query()
      .pipe(map((res: HttpResponse<IStockProduitChad[]>) => res.body ?? []))
      .pipe(
        map((stockProduits: IStockProduitChad[]) =>
          this.stockProduitService.addStockProduitChadToCollectionIfMissing<IStockProduitChad>(
            stockProduits,
            this.venteProduit?.stockProduit
          )
        )
      )
      .subscribe((stockProduits: IStockProduitChad[]) => (this.stockProduitsSharedCollection = stockProduits));

    this.userAccountService
      .query()
      .pipe(map((res: HttpResponse<IUserAccountChad[]>) => res.body ?? []))
      .pipe(
        map((userAccounts: IUserAccountChad[]) =>
          this.userAccountService.addUserAccountChadToCollectionIfMissing<IUserAccountChad>(userAccounts, this.venteProduit?.userAccount)
        )
      )
      .subscribe((userAccounts: IUserAccountChad[]) => (this.userAccountsSharedCollection = userAccounts));
  }
}
