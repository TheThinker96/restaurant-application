import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { VenteProduitChadFormService } from './vente-produit-chad-form.service';
import { VenteProduitChadService } from '../service/vente-produit-chad.service';
import { IVenteProduitChad } from '../vente-produit-chad.model';
import { IProduitChad } from 'app/entities/produit-chad/produit-chad.model';
import { ProduitChadService } from 'app/entities/produit-chad/service/produit-chad.service';
import { IStockProduitChad } from 'app/entities/stock-produit-chad/stock-produit-chad.model';
import { StockProduitChadService } from 'app/entities/stock-produit-chad/service/stock-produit-chad.service';
import { IUserAccountChad } from 'app/entities/user-account-chad/user-account-chad.model';
import { UserAccountChadService } from 'app/entities/user-account-chad/service/user-account-chad.service';

import { VenteProduitChadUpdateComponent } from './vente-produit-chad-update.component';

describe('VenteProduitChad Management Update Component', () => {
  let comp: VenteProduitChadUpdateComponent;
  let fixture: ComponentFixture<VenteProduitChadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let venteProduitFormService: VenteProduitChadFormService;
  let venteProduitService: VenteProduitChadService;
  let produitService: ProduitChadService;
  let stockProduitService: StockProduitChadService;
  let userAccountService: UserAccountChadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [VenteProduitChadUpdateComponent],
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
      .overrideTemplate(VenteProduitChadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VenteProduitChadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    venteProduitFormService = TestBed.inject(VenteProduitChadFormService);
    venteProduitService = TestBed.inject(VenteProduitChadService);
    produitService = TestBed.inject(ProduitChadService);
    stockProduitService = TestBed.inject(StockProduitChadService);
    userAccountService = TestBed.inject(UserAccountChadService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ProduitChad query and add missing value', () => {
      const venteProduit: IVenteProduitChad = { id: 456 };
      const produit: IProduitChad = { id: 96657 };
      venteProduit.produit = produit;

      const produitCollection: IProduitChad[] = [{ id: 31597 }];
      jest.spyOn(produitService, 'query').mockReturnValue(of(new HttpResponse({ body: produitCollection })));
      const additionalProduitChads = [produit];
      const expectedCollection: IProduitChad[] = [...additionalProduitChads, ...produitCollection];
      jest.spyOn(produitService, 'addProduitChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ venteProduit });
      comp.ngOnInit();

      expect(produitService.query).toHaveBeenCalled();
      expect(produitService.addProduitChadToCollectionIfMissing).toHaveBeenCalledWith(
        produitCollection,
        ...additionalProduitChads.map(expect.objectContaining)
      );
      expect(comp.produitsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call StockProduitChad query and add missing value', () => {
      const venteProduit: IVenteProduitChad = { id: 456 };
      const stockProduit: IStockProduitChad = { id: 99906 };
      venteProduit.stockProduit = stockProduit;

      const stockProduitCollection: IStockProduitChad[] = [{ id: 60243 }];
      jest.spyOn(stockProduitService, 'query').mockReturnValue(of(new HttpResponse({ body: stockProduitCollection })));
      const additionalStockProduitChads = [stockProduit];
      const expectedCollection: IStockProduitChad[] = [...additionalStockProduitChads, ...stockProduitCollection];
      jest.spyOn(stockProduitService, 'addStockProduitChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ venteProduit });
      comp.ngOnInit();

      expect(stockProduitService.query).toHaveBeenCalled();
      expect(stockProduitService.addStockProduitChadToCollectionIfMissing).toHaveBeenCalledWith(
        stockProduitCollection,
        ...additionalStockProduitChads.map(expect.objectContaining)
      );
      expect(comp.stockProduitsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UserAccountChad query and add missing value', () => {
      const venteProduit: IVenteProduitChad = { id: 456 };
      const userAccount: IUserAccountChad = { id: 35869 };
      venteProduit.userAccount = userAccount;

      const userAccountCollection: IUserAccountChad[] = [{ id: 55552 }];
      jest.spyOn(userAccountService, 'query').mockReturnValue(of(new HttpResponse({ body: userAccountCollection })));
      const additionalUserAccountChads = [userAccount];
      const expectedCollection: IUserAccountChad[] = [...additionalUserAccountChads, ...userAccountCollection];
      jest.spyOn(userAccountService, 'addUserAccountChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ venteProduit });
      comp.ngOnInit();

      expect(userAccountService.query).toHaveBeenCalled();
      expect(userAccountService.addUserAccountChadToCollectionIfMissing).toHaveBeenCalledWith(
        userAccountCollection,
        ...additionalUserAccountChads.map(expect.objectContaining)
      );
      expect(comp.userAccountsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const venteProduit: IVenteProduitChad = { id: 456 };
      const produit: IProduitChad = { id: 6718 };
      venteProduit.produit = produit;
      const stockProduit: IStockProduitChad = { id: 69525 };
      venteProduit.stockProduit = stockProduit;
      const userAccount: IUserAccountChad = { id: 73220 };
      venteProduit.userAccount = userAccount;

      activatedRoute.data = of({ venteProduit });
      comp.ngOnInit();

      expect(comp.produitsSharedCollection).toContain(produit);
      expect(comp.stockProduitsSharedCollection).toContain(stockProduit);
      expect(comp.userAccountsSharedCollection).toContain(userAccount);
      expect(comp.venteProduit).toEqual(venteProduit);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVenteProduitChad>>();
      const venteProduit = { id: 123 };
      jest.spyOn(venteProduitFormService, 'getVenteProduitChad').mockReturnValue(venteProduit);
      jest.spyOn(venteProduitService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ venteProduit });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: venteProduit }));
      saveSubject.complete();

      // THEN
      expect(venteProduitFormService.getVenteProduitChad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(venteProduitService.update).toHaveBeenCalledWith(expect.objectContaining(venteProduit));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVenteProduitChad>>();
      const venteProduit = { id: 123 };
      jest.spyOn(venteProduitFormService, 'getVenteProduitChad').mockReturnValue({ id: null });
      jest.spyOn(venteProduitService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ venteProduit: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: venteProduit }));
      saveSubject.complete();

      // THEN
      expect(venteProduitFormService.getVenteProduitChad).toHaveBeenCalled();
      expect(venteProduitService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVenteProduitChad>>();
      const venteProduit = { id: 123 };
      jest.spyOn(venteProduitService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ venteProduit });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(venteProduitService.update).toHaveBeenCalled();
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

    describe('compareStockProduitChad', () => {
      it('Should forward to stockProduitService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(stockProduitService, 'compareStockProduitChad');
        comp.compareStockProduitChad(entity, entity2);
        expect(stockProduitService.compareStockProduitChad).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareUserAccountChad', () => {
      it('Should forward to userAccountService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userAccountService, 'compareUserAccountChad');
        comp.compareUserAccountChad(entity, entity2);
        expect(userAccountService.compareUserAccountChad).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
