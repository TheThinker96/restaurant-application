import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EntrepriseChadFormService } from './entreprise-chad-form.service';
import { EntrepriseChadService } from '../service/entreprise-chad.service';
import { IEntrepriseChad } from '../entreprise-chad.model';

import { EntrepriseChadUpdateComponent } from './entreprise-chad-update.component';

describe('EntrepriseChad Management Update Component', () => {
  let comp: EntrepriseChadUpdateComponent;
  let fixture: ComponentFixture<EntrepriseChadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let entrepriseFormService: EntrepriseChadFormService;
  let entrepriseService: EntrepriseChadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EntrepriseChadUpdateComponent],
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
      .overrideTemplate(EntrepriseChadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EntrepriseChadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    entrepriseFormService = TestBed.inject(EntrepriseChadFormService);
    entrepriseService = TestBed.inject(EntrepriseChadService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const entreprise: IEntrepriseChad = { id: 456 };

      activatedRoute.data = of({ entreprise });
      comp.ngOnInit();

      expect(comp.entreprise).toEqual(entreprise);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntrepriseChad>>();
      const entreprise = { id: 123 };
      jest.spyOn(entrepriseFormService, 'getEntrepriseChad').mockReturnValue(entreprise);
      jest.spyOn(entrepriseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entreprise });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entreprise }));
      saveSubject.complete();

      // THEN
      expect(entrepriseFormService.getEntrepriseChad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(entrepriseService.update).toHaveBeenCalledWith(expect.objectContaining(entreprise));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntrepriseChad>>();
      const entreprise = { id: 123 };
      jest.spyOn(entrepriseFormService, 'getEntrepriseChad').mockReturnValue({ id: null });
      jest.spyOn(entrepriseService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entreprise: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entreprise }));
      saveSubject.complete();

      // THEN
      expect(entrepriseFormService.getEntrepriseChad).toHaveBeenCalled();
      expect(entrepriseService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntrepriseChad>>();
      const entreprise = { id: 123 };
      jest.spyOn(entrepriseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entreprise });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(entrepriseService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
