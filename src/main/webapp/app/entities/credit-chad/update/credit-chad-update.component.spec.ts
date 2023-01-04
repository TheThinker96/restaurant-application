import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CreditChadFormService } from './credit-chad-form.service';
import { CreditChadService } from '../service/credit-chad.service';
import { ICreditChad } from '../credit-chad.model';
import { IUserAccountChad } from 'app/entities/user-account-chad/user-account-chad.model';
import { UserAccountChadService } from 'app/entities/user-account-chad/service/user-account-chad.service';

import { CreditChadUpdateComponent } from './credit-chad-update.component';

describe('CreditChad Management Update Component', () => {
  let comp: CreditChadUpdateComponent;
  let fixture: ComponentFixture<CreditChadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let creditFormService: CreditChadFormService;
  let creditService: CreditChadService;
  let userAccountService: UserAccountChadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CreditChadUpdateComponent],
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
      .overrideTemplate(CreditChadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CreditChadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    creditFormService = TestBed.inject(CreditChadFormService);
    creditService = TestBed.inject(CreditChadService);
    userAccountService = TestBed.inject(UserAccountChadService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call UserAccountChad query and add missing value', () => {
      const credit: ICreditChad = { id: 456 };
      const userAccount: IUserAccountChad = { id: 5118 };
      credit.userAccount = userAccount;

      const userAccountCollection: IUserAccountChad[] = [{ id: 49270 }];
      jest.spyOn(userAccountService, 'query').mockReturnValue(of(new HttpResponse({ body: userAccountCollection })));
      const additionalUserAccountChads = [userAccount];
      const expectedCollection: IUserAccountChad[] = [...additionalUserAccountChads, ...userAccountCollection];
      jest.spyOn(userAccountService, 'addUserAccountChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ credit });
      comp.ngOnInit();

      expect(userAccountService.query).toHaveBeenCalled();
      expect(userAccountService.addUserAccountChadToCollectionIfMissing).toHaveBeenCalledWith(
        userAccountCollection,
        ...additionalUserAccountChads.map(expect.objectContaining)
      );
      expect(comp.userAccountsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const credit: ICreditChad = { id: 456 };
      const userAccount: IUserAccountChad = { id: 83517 };
      credit.userAccount = userAccount;

      activatedRoute.data = of({ credit });
      comp.ngOnInit();

      expect(comp.userAccountsSharedCollection).toContain(userAccount);
      expect(comp.credit).toEqual(credit);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICreditChad>>();
      const credit = { id: 123 };
      jest.spyOn(creditFormService, 'getCreditChad').mockReturnValue(credit);
      jest.spyOn(creditService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ credit });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: credit }));
      saveSubject.complete();

      // THEN
      expect(creditFormService.getCreditChad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(creditService.update).toHaveBeenCalledWith(expect.objectContaining(credit));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICreditChad>>();
      const credit = { id: 123 };
      jest.spyOn(creditFormService, 'getCreditChad').mockReturnValue({ id: null });
      jest.spyOn(creditService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ credit: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: credit }));
      saveSubject.complete();

      // THEN
      expect(creditFormService.getCreditChad).toHaveBeenCalled();
      expect(creditService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICreditChad>>();
      const credit = { id: 123 };
      jest.spyOn(creditService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ credit });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(creditService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
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
