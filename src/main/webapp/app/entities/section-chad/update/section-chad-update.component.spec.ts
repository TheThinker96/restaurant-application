import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SectionChadFormService } from './section-chad-form.service';
import { SectionChadService } from '../service/section-chad.service';
import { ISectionChad } from '../section-chad.model';
import { IEntrepriseChad } from 'app/entities/entreprise-chad/entreprise-chad.model';
import { EntrepriseChadService } from 'app/entities/entreprise-chad/service/entreprise-chad.service';

import { SectionChadUpdateComponent } from './section-chad-update.component';

describe('SectionChad Management Update Component', () => {
  let comp: SectionChadUpdateComponent;
  let fixture: ComponentFixture<SectionChadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let sectionFormService: SectionChadFormService;
  let sectionService: SectionChadService;
  let entrepriseService: EntrepriseChadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SectionChadUpdateComponent],
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
      .overrideTemplate(SectionChadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SectionChadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    sectionFormService = TestBed.inject(SectionChadFormService);
    sectionService = TestBed.inject(SectionChadService);
    entrepriseService = TestBed.inject(EntrepriseChadService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call EntrepriseChad query and add missing value', () => {
      const section: ISectionChad = { id: 456 };
      const entreprise: IEntrepriseChad = { id: 26758 };
      section.entreprise = entreprise;

      const entrepriseCollection: IEntrepriseChad[] = [{ id: 48202 }];
      jest.spyOn(entrepriseService, 'query').mockReturnValue(of(new HttpResponse({ body: entrepriseCollection })));
      const additionalEntrepriseChads = [entreprise];
      const expectedCollection: IEntrepriseChad[] = [...additionalEntrepriseChads, ...entrepriseCollection];
      jest.spyOn(entrepriseService, 'addEntrepriseChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ section });
      comp.ngOnInit();

      expect(entrepriseService.query).toHaveBeenCalled();
      expect(entrepriseService.addEntrepriseChadToCollectionIfMissing).toHaveBeenCalledWith(
        entrepriseCollection,
        ...additionalEntrepriseChads.map(expect.objectContaining)
      );
      expect(comp.entreprisesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const section: ISectionChad = { id: 456 };
      const entreprise: IEntrepriseChad = { id: 62981 };
      section.entreprise = entreprise;

      activatedRoute.data = of({ section });
      comp.ngOnInit();

      expect(comp.entreprisesSharedCollection).toContain(entreprise);
      expect(comp.section).toEqual(section);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISectionChad>>();
      const section = { id: 123 };
      jest.spyOn(sectionFormService, 'getSectionChad').mockReturnValue(section);
      jest.spyOn(sectionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ section });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: section }));
      saveSubject.complete();

      // THEN
      expect(sectionFormService.getSectionChad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(sectionService.update).toHaveBeenCalledWith(expect.objectContaining(section));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISectionChad>>();
      const section = { id: 123 };
      jest.spyOn(sectionFormService, 'getSectionChad').mockReturnValue({ id: null });
      jest.spyOn(sectionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ section: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: section }));
      saveSubject.complete();

      // THEN
      expect(sectionFormService.getSectionChad).toHaveBeenCalled();
      expect(sectionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISectionChad>>();
      const section = { id: 123 };
      jest.spyOn(sectionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ section });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(sectionService.update).toHaveBeenCalled();
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
