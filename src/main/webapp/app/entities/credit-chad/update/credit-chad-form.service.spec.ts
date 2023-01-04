import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../credit-chad.test-samples';

import { CreditChadFormService } from './credit-chad-form.service';

describe('CreditChad Form Service', () => {
  let service: CreditChadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditChadFormService);
  });

  describe('Service methods', () => {
    describe('createCreditChadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCreditChadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            solde: expect.any(Object),
            type: expect.any(Object),
            statut: expect.any(Object),
            userAccount: expect.any(Object),
          })
        );
      });

      it('passing ICreditChad should create a new form with FormGroup', () => {
        const formGroup = service.createCreditChadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            solde: expect.any(Object),
            type: expect.any(Object),
            statut: expect.any(Object),
            userAccount: expect.any(Object),
          })
        );
      });
    });

    describe('getCreditChad', () => {
      it('should return NewCreditChad for default CreditChad initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCreditChadFormGroup(sampleWithNewData);

        const credit = service.getCreditChad(formGroup) as any;

        expect(credit).toMatchObject(sampleWithNewData);
      });

      it('should return NewCreditChad for empty CreditChad initial value', () => {
        const formGroup = service.createCreditChadFormGroup();

        const credit = service.getCreditChad(formGroup) as any;

        expect(credit).toMatchObject({});
      });

      it('should return ICreditChad', () => {
        const formGroup = service.createCreditChadFormGroup(sampleWithRequiredData);

        const credit = service.getCreditChad(formGroup) as any;

        expect(credit).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICreditChad should not enable id FormControl', () => {
        const formGroup = service.createCreditChadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCreditChad should disable id FormControl', () => {
        const formGroup = service.createCreditChadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
