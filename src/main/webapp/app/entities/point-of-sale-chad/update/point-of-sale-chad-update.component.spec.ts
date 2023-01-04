import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PointOfSaleChadFormService } from './point-of-sale-chad-form.service';
import { PointOfSaleChadService } from '../service/point-of-sale-chad.service';
import { IPointOfSaleChad } from '../point-of-sale-chad.model';
import { IEntrepriseChad } from 'app/entities/entreprise-chad/entreprise-chad.model';
import { EntrepriseChadService } from 'app/entities/entreprise-chad/service/entreprise-chad.service';

import { PointOfSaleChadUpdateComponent } from './point-of-sale-chad-update.component';

describe('PointOfSaleChad Management Update Component', () => {
  let comp: PointOfSaleChadUpdateComponent;
  let fixture: ComponentFixture<PointOfSaleChadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pointOfSaleFormService: PointOfSaleChadFormService;
  let pointOfSaleService: PointOfSaleChadService;
  let entrepriseService: EntrepriseChadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PointOfSaleChadUpdateComponent],
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
      .overrideTemplate(PointOfSaleChadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PointOfSaleChadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pointOfSaleFormService = TestBed.inject(PointOfSaleChadFormService);
    pointOfSaleService = TestBed.inject(PointOfSaleChadService);
    entrepriseService = TestBed.inject(EntrepriseChadService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call EntrepriseChad query and add missing value', () => {
      const pointOfSale: IPointOfSaleChad = { id: 456 };
      const entreprise: IEntrepriseChad = { id: 65472 };
      pointOfSale.entreprise = entreprise;

      const entrepriseCollection: IEntrepriseChad[] = [{ id: 6608 }];
      jest.spyOn(entrepriseService, 'query').mockReturnValue(of(new HttpResponse({ body: entrepriseCollection })));
      const additionalEntrepriseChads = [entreprise];
      const expectedCollection: IEntrepriseChad[] = [...additionalEntrepriseChads, ...entrepriseCollection];
      jest.spyOn(entrepriseService, 'addEntrepriseChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pointOfSale });
      comp.ngOnInit();

      expect(entrepriseService.query).toHaveBeenCalled();
      expect(entrepriseService.addEntrepriseChadToCollectionIfMissing).toHaveBeenCalledWith(
        entrepriseCollection,
        ...additionalEntrepriseChads.map(expect.objectContaining)
      );
      expect(comp.entreprisesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const pointOfSale: IPointOfSaleChad = { id: 456 };
      const entreprise: IEntrepriseChad = { id: 73297 };
      pointOfSale.entreprise = entreprise;

      activatedRoute.data = of({ pointOfSale });
      comp.ngOnInit();

      expect(comp.entreprisesSharedCollection).toContain(entreprise);
      expect(comp.pointOfSale).toEqual(pointOfSale);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPointOfSaleChad>>();
      const pointOfSale = { id: 123 };
      jest.spyOn(pointOfSaleFormService, 'getPointOfSaleChad').mockReturnValue(pointOfSale);
      jest.spyOn(pointOfSaleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pointOfSale });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pointOfSale }));
      saveSubject.complete();

      // THEN
      expect(pointOfSaleFormService.getPointOfSaleChad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(pointOfSaleService.update).toHaveBeenCalledWith(expect.objectContaining(pointOfSale));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPointOfSaleChad>>();
      const pointOfSale = { id: 123 };
      jest.spyOn(pointOfSaleFormService, 'getPointOfSaleChad').mockReturnValue({ id: null });
      jest.spyOn(pointOfSaleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pointOfSale: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pointOfSale }));
      saveSubject.complete();

      // THEN
      expect(pointOfSaleFormService.getPointOfSaleChad).toHaveBeenCalled();
      expect(pointOfSaleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPointOfSaleChad>>();
      const pointOfSale = { id: 123 };
      jest.spyOn(pointOfSaleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pointOfSale });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pointOfSaleService.update).toHaveBeenCalled();
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
  });
});
