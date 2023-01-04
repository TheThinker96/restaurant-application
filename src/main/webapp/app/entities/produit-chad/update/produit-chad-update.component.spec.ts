import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProduitChadFormService } from './produit-chad-form.service';
import { ProduitChadService } from '../service/produit-chad.service';
import { IProduitChad } from '../produit-chad.model';
import { ISectionChad } from 'app/entities/section-chad/section-chad.model';
import { SectionChadService } from 'app/entities/section-chad/service/section-chad.service';
import { IEntrepriseChad } from 'app/entities/entreprise-chad/entreprise-chad.model';
import { EntrepriseChadService } from 'app/entities/entreprise-chad/service/entreprise-chad.service';

import { ProduitChadUpdateComponent } from './produit-chad-update.component';

describe('ProduitChad Management Update Component', () => {
  let comp: ProduitChadUpdateComponent;
  let fixture: ComponentFixture<ProduitChadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let produitFormService: ProduitChadFormService;
  let produitService: ProduitChadService;
  let sectionService: SectionChadService;
  let entrepriseService: EntrepriseChadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProduitChadUpdateComponent],
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
      .overrideTemplate(ProduitChadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProduitChadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    produitFormService = TestBed.inject(ProduitChadFormService);
    produitService = TestBed.inject(ProduitChadService);
    sectionService = TestBed.inject(SectionChadService);
    entrepriseService = TestBed.inject(EntrepriseChadService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call SectionChad query and add missing value', () => {
      const produit: IProduitChad = { id: 456 };
      const section: ISectionChad = { id: 61558 };
      produit.section = section;

      const sectionCollection: ISectionChad[] = [{ id: 16389 }];
      jest.spyOn(sectionService, 'query').mockReturnValue(of(new HttpResponse({ body: sectionCollection })));
      const additionalSectionChads = [section];
      const expectedCollection: ISectionChad[] = [...additionalSectionChads, ...sectionCollection];
      jest.spyOn(sectionService, 'addSectionChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ produit });
      comp.ngOnInit();

      expect(sectionService.query).toHaveBeenCalled();
      expect(sectionService.addSectionChadToCollectionIfMissing).toHaveBeenCalledWith(
        sectionCollection,
        ...additionalSectionChads.map(expect.objectContaining)
      );
      expect(comp.sectionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call EntrepriseChad query and add missing value', () => {
      const produit: IProduitChad = { id: 456 };
      const entreprise: IEntrepriseChad = { id: 38171 };
      produit.entreprise = entreprise;

      const entrepriseCollection: IEntrepriseChad[] = [{ id: 15448 }];
      jest.spyOn(entrepriseService, 'query').mockReturnValue(of(new HttpResponse({ body: entrepriseCollection })));
      const additionalEntrepriseChads = [entreprise];
      const expectedCollection: IEntrepriseChad[] = [...additionalEntrepriseChads, ...entrepriseCollection];
      jest.spyOn(entrepriseService, 'addEntrepriseChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ produit });
      comp.ngOnInit();

      expect(entrepriseService.query).toHaveBeenCalled();
      expect(entrepriseService.addEntrepriseChadToCollectionIfMissing).toHaveBeenCalledWith(
        entrepriseCollection,
        ...additionalEntrepriseChads.map(expect.objectContaining)
      );
      expect(comp.entreprisesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const produit: IProduitChad = { id: 456 };
      const section: ISectionChad = { id: 10783 };
      produit.section = section;
      const entreprise: IEntrepriseChad = { id: 50210 };
      produit.entreprise = entreprise;

      activatedRoute.data = of({ produit });
      comp.ngOnInit();

      expect(comp.sectionsSharedCollection).toContain(section);
      expect(comp.entreprisesSharedCollection).toContain(entreprise);
      expect(comp.produit).toEqual(produit);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProduitChad>>();
      const produit = { id: 123 };
      jest.spyOn(produitFormService, 'getProduitChad').mockReturnValue(produit);
      jest.spyOn(produitService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ produit });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: produit }));
      saveSubject.complete();

      // THEN
      expect(produitFormService.getProduitChad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(produitService.update).toHaveBeenCalledWith(expect.objectContaining(produit));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProduitChad>>();
      const produit = { id: 123 };
      jest.spyOn(produitFormService, 'getProduitChad').mockReturnValue({ id: null });
      jest.spyOn(produitService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ produit: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: produit }));
      saveSubject.complete();

      // THEN
      expect(produitFormService.getProduitChad).toHaveBeenCalled();
      expect(produitService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProduitChad>>();
      const produit = { id: 123 };
      jest.spyOn(produitService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ produit });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(produitService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSectionChad', () => {
      it('Should forward to sectionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(sectionService, 'compareSectionChad');
        comp.compareSectionChad(entity, entity2);
        expect(sectionService.compareSectionChad).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
