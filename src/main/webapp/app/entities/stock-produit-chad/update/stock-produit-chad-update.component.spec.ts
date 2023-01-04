import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { StockProduitChadFormService } from './stock-produit-chad-form.service';
import { StockProduitChadService } from '../service/stock-produit-chad.service';
import { IStockProduitChad } from '../stock-produit-chad.model';
import { IProduitChad } from 'app/entities/produit-chad/produit-chad.model';
import { ProduitChadService } from 'app/entities/produit-chad/service/produit-chad.service';

import { StockProduitChadUpdateComponent } from './stock-produit-chad-update.component';

describe('StockProduitChad Management Update Component', () => {
  let comp: StockProduitChadUpdateComponent;
  let fixture: ComponentFixture<StockProduitChadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let stockProduitFormService: StockProduitChadFormService;
  let stockProduitService: StockProduitChadService;
  let produitService: ProduitChadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [StockProduitChadUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(StockProduitChadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StockProduitChadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    stockProduitFormService = TestBed.inject(StockProduitChadFormService);
    stockProduitService = TestBed.inject(StockProduitChadService);
    produitService = TestBed.inject(ProduitChadService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ProduitChad query and add missing value', () => {
      const stockProduit: IStockProduitChad = { id: 456 };
      const produit: IProduitChad = { id: 99405 };
      stockProduit.produit = produit;

      const produitCollection: IProduitChad[] = [{ id: 67531 }];
      jest.spyOn(produitService, 'query').mockReturnValue(of(new HttpResponse({ body: produitCollection })));
      const additionalProduitChads = [produit];
      const expectedCollection: IProduitChad[] = [...additionalProduitChads, ...produitCollection];
      jest.spyOn(produitService, 'addProduitChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ stockProduit });
      comp.ngOnInit();

      expect(produitService.query).toHaveBeenCalled();
      expect(produitService.addProduitChadToCollectionIfMissing).toHaveBeenCalledWith(
        produitCollection,
        ...additionalProduitChads.map(expect.objectContaining)
      );
      expect(comp.produitsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const stockProduit: IStockProduitChad = { id: 456 };
      const produit: IProduitChad = { id: 8004 };
      stockProduit.produit = produit;

      activatedRoute.data = of({ stockProduit });
      comp.ngOnInit();

      expect(comp.produitsSharedCollection).toContain(produit);
      expect(comp.stockProduit).toEqual(stockProduit);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStockProduitChad>>();
      const stockProduit = { id: 123 };
      jest.spyOn(stockProduitFormService, 'getStockProduitChad').mockReturnValue(stockProduit);
      jest.spyOn(stockProduitService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ stockProduit });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: stockProduit }));
      saveSubject.complete();

      // THEN
      expect(stockProduitFormService.getStockProduitChad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(stockProduitService.update).toHaveBeenCalledWith(expect.objectContaining(stockProduit));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStockProduitChad>>();
      const stockProduit = { id: 123 };
      jest.spyOn(stockProduitFormService, 'getStockProduitChad').mockReturnValue({ id: null });
      jest.spyOn(stockProduitService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ stockProduit: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: stockProduit }));
      saveSubject.complete();

      // THEN
      expect(stockProduitFormService.getStockProduitChad).toHaveBeenCalled();
      expect(stockProduitService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStockProduitChad>>();
      const stockProduit = { id: 123 };
      jest.spyOn(stockProduitService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ stockProduit });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(stockProduitService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProduitChad', () => {
      it('Should forward to produitService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(produitService, 'compareProduitChad');
        comp.compareProduitChad(entity, entity2);
        expect(produitService.compareProduitChad).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
