import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { StockProduitChadFormService, StockProduitChadFormGroup } from './stock-produit-chad-form.service';
import { IStockProduitChad } from '../stock-produit-chad.model';
import { StockProduitChadService } from '../service/stock-produit-chad.service';
import { IProduitChad } from 'app/entities/produit-chad/produit-chad.model';
import { ProduitChadService } from 'app/entities/produit-chad/service/produit-chad.service';

@Component({
  selector: 'jhi-stock-produit-chad-update',
  templateUrl: './stock-produit-chad-update.component.html',
})
export class StockProduitChadUpdateComponent implements OnInit {
  isSaving = false;
  stockProduit: IStockProduitChad | null = null;

  produitsSharedCollection: IProduitChad[] = [];

  editForm: StockProduitChadFormGroup = this.stockProduitFormService.createStockProduitChadFormGroup();

  constructor(
    protected stockProduitService: StockProduitChadService,
    protected stockProduitFormService: StockProduitChadFormService,
    protected produitService: ProduitChadService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareProduitChad = (o1: IProduitChad | null, o2: IProduitChad | null): boolean => this.produitService.compareProduitChad(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stockProduit }) => {
      this.stockProduit = stockProduit;
      if (stockProduit) {
        this.updateForm(stockProduit);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const stockProduit = this.stockProduitFormService.getStockProduitChad(this.editForm);
    if (stockProduit.id !== null) {
      this.subscribeToSaveResponse(this.stockProduitService.update(stockProduit));
    } else {
      this.subscribeToSaveResponse(this.stockProduitService.create(stockProduit));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStockProduitChad>>): void {
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

  protected updateForm(stockProduit: IStockProduitChad): void {
    this.stockProduit = stockProduit;
    this.stockProduitFormService.resetForm(this.editForm, stockProduit);

    this.produitsSharedCollection = this.produitService.addProduitChadToCollectionIfMissing<IProduitChad>(
      this.produitsSharedCollection,
      stockProduit.produit
    );
  }

  protected loadRelationshipsOptions(): void {
    this.produitService
      .query()
      .pipe(map((res: HttpResponse<IProduitChad[]>) => res.body ?? []))
      .pipe(
        map((produits: IProduitChad[]) =>
          this.produitService.addProduitChadToCollectionIfMissing<IProduitChad>(produits, this.stockProduit?.produit)
        )
      )
      .subscribe((produits: IProduitChad[]) => (this.produitsSharedCollection = produits));
  }
}
