import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UserAccountChadFormService } from './user-account-chad-form.service';
import { UserAccountChadService } from '../service/user-account-chad.service';
import { IUserAccountChad } from '../user-account-chad.model';
import { IEntrepriseChad } from 'app/entities/entreprise-chad/entreprise-chad.model';
import { EntrepriseChadService } from 'app/entities/entreprise-chad/service/entreprise-chad.service';
import { IPointOfSaleChad } from 'app/entities/point-of-sale-chad/point-of-sale-chad.model';
import { PointOfSaleChadService } from 'app/entities/point-of-sale-chad/service/point-of-sale-chad.service';

import { UserAccountChadUpdateComponent } from './user-account-chad-update.component';

describe('UserAccountChad Management Update Component', () => {
  let comp: UserAccountChadUpdateComponent;
  let fixture: ComponentFixture<UserAccountChadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let userAccountFormService: UserAccountChadFormService;
  let userAccountService: UserAccountChadService;
  let entrepriseService: EntrepriseChadService;
  let pointOfSaleService: PointOfSaleChadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UserAccountChadUpdateComponent],
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
      .overrideTemplate(UserAccountChadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UserAccountChadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    userAccountFormService = TestBed.inject(UserAccountChadFormService);
    userAccountService = TestBed.inject(UserAccountChadService);
    entrepriseService = TestBed.inject(EntrepriseChadService);
    pointOfSaleService = TestBed.inject(PointOfSaleChadService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call EntrepriseChad query and add missing value', () => {
      const userAccount: IUserAccountChad = { id: 456 };
      const entreprise: IEntrepriseChad = { id: 29863 };
      userAccount.entreprise = entreprise;

      const entrepriseCollection: IEntrepriseChad[] = [{ id: 1065 }];
      jest.spyOn(entrepriseService, 'query').mockReturnValue(of(new HttpResponse({ body: entrepriseCollection })));
      const additionalEntrepriseChads = [entreprise];
      const expectedCollection: IEntrepriseChad[] = [...additionalEntrepriseChads, ...entrepriseCollection];
      jest.spyOn(entrepriseService, 'addEntrepriseChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ userAccount });
      comp.ngOnInit();

      expect(entrepriseService.query).toHaveBeenCalled();
      expect(entrepriseService.addEntrepriseChadToCollectionIfMissing).toHaveBeenCalledWith(
        entrepriseCollection,
        ...additionalEntrepriseChads.map(expect.objectContaining)
      );
      expect(comp.entreprisesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PointOfSaleChad query and add missing value', () => {
      const userAccount: IUserAccountChad = { id: 456 };
      const pointOfSale: IPointOfSaleChad = { id: 79356 };
      userAccount.pointOfSale = pointOfSale;

      const pointOfSaleCollection: IPointOfSaleChad[] = [{ id: 71004 }];
      jest.spyOn(pointOfSaleService, 'query').mockReturnValue(of(new HttpResponse({ body: pointOfSaleCollection })));
      const additionalPointOfSaleChads = [pointOfSale];
      const expectedCollection: IPointOfSaleChad[] = [...additionalPointOfSaleChads, ...pointOfSaleCollection];
      jest.spyOn(pointOfSaleService, 'addPointOfSaleChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ userAccount });
      comp.ngOnInit();

      expect(pointOfSaleService.query).toHaveBeenCalled();
      expect(pointOfSaleService.addPointOfSaleChadToCollectionIfMissing).toHaveBeenCalledWith(
        pointOfSaleCollection,
        ...additionalPointOfSaleChads.map(expect.objectContaining)
      );
      expect(comp.pointOfSalesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const userAccount: IUserAccountChad = { id: 456 };
      const entreprise: IEntrepriseChad = { id: 94638 };
      userAccount.entreprise = entreprise;
      const pointOfSale: IPointOfSaleChad = { id: 39396 };
      userAccount.pointOfSale = pointOfSale;

      activatedRoute.data = of({ userAccount });
      comp.ngOnInit();

      expect(comp.entreprisesSharedCollection).toContain(entreprise);
      expect(comp.pointOfSalesSharedCollection).toContain(pointOfSale);
      expect(comp.userAccount).toEqual(userAccount);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserAccountChad>>();
      const userAccount = { id: 123 };
      jest.spyOn(userAccountFormService, 'getUserAccountChad').mockReturnValue(userAccount);
      jest.spyOn(userAccountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: userAccount }));
      saveSubject.complete();

      // THEN
      expect(userAccountFormService.getUserAccountChad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(userAccountService.update).toHaveBeenCalledWith(expect.objectContaining(userAccount));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserAccountChad>>();
      const userAccount = { id: 123 };
      jest.spyOn(userAccountFormService, 'getUserAccountChad').mockReturnValue({ id: null });
      jest.spyOn(userAccountService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userAccount: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: userAccount }));
      saveSubject.complete();

      // THEN
      expect(userAccountFormService.getUserAccountChad).toHaveBeenCalled();
      expect(userAccountService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserAccountChad>>();
      const userAccount = { id: 123 };
      jest.spyOn(userAccountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(userAccountService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareEntrepriseChad', () => {
      it('Should forward to entrepriseService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(entrepriseService, 'compareEntrepriseChad');
        comp.compareEntrepriseChad(entity, entity2);
        expect(entrepriseService.compareEntrepriseChad).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePointOfSaleChad', () => {
      it('Should forward to pointOfSaleService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(pointOfSaleService, 'comparePointOfSaleChad');
        comp.comparePointOfSaleChad(entity, entity2);
        expect(pointOfSaleService.comparePointOfSaleChad).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
