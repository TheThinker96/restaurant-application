import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../point-of-sale-chad.test-samples';

import { PointOfSaleChadFormService } from './point-of-sale-chad-form.service';

describe('PointOfSaleChad Form Service', () => {
  let service: PointOfSaleChadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointOfSaleChadFormService);
  });

  describe('Service methods', () => {
    describe('createPointOfSaleChadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPointOfSaleChadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            responsable: expect.any(Object),
            adresse: expect.any(Object),
            entreprise: expect.any(Object),
          })
        );
      });

      it('passing IPointOfSaleChad should create a new form with FormGroup', () => {
        const formGroup = service.createPointOfSaleChadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            responsable: expect.any(Object),
            adresse: expect.any(Object),
            entreprise: expect.any(Object),
          })
        );
      });
    });

    describe('getPointOfSaleChad', () => {
      it('should return NewPointOfSaleChad for default PointOfSaleChad initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPointOfSaleChadFormGroup(sampleWithNewData);

        const pointOfSale = service.getPointOfSaleChad(formGroup) as any;

        expect(pointOfSale).toMatchObject(sampleWithNewData);
      });

      it('should return NewPointOfSaleChad for empty PointOfSaleChad initial value', () => {
        const formGroup = service.createPointOfSaleChadFormGroup();

        const pointOfSale = service.getPointOfSaleChad(formGroup) as any;

        expect(pointOfSale).toMatchObject({});
      });

      it('should return IPointOfSaleChad', () => {
        const formGroup = service.createPointOfSaleChadFormGroup(sampleWithRequiredData);

        const pointOfSale = service.getPointOfSaleChad(formGroup) as any;

        expect(pointOfSale).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPointOfSaleChad should not enable id FormControl', () => {
        const formGroup = service.createPointOfSaleChadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPointOfSaleChad should disable id FormControl', () => {
        const formGroup = service.createPointOfSaleChadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
