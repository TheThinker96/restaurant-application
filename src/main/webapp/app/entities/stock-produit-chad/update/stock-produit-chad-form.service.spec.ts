import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../stock-produit-chad.test-samples';

import { StockProduitChadFormService } from './stock-produit-chad-form.service';

describe('StockProduitChad Form Service', () => {
  let service: StockProduitChadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockProduitChadFormService);
  });

  describe('Service methods', () => {
    describe('createStockProduitChadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createStockProduitChadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            quantite: expect.any(Object),
            dateExpiration: expect.any(Object),
            produit: expect.any(Object),
          })
        );
      });

      it('passing IStockProduitChad should create a new form with FormGroup', () => {
        const formGroup = service.createStockProduitChadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            quantite: expect.any(Object),
            dateExpiration: expect.any(Object),
            produit: expect.any(Object),
          })
        );
      });
    });

    describe('getStockProduitChad', () => {
      it('should return NewStockProduitChad for default StockProduitChad initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createStockProduitChadFormGroup(sampleWithNewData);

        const stockProduit = service.getStockProduitChad(formGroup) as any;

        expect(stockProduit).toMatchObject(sampleWithNewData);
      });

      it('should return NewStockProduitChad for empty StockProduitChad initial value', () => {
        const formGroup = service.createStockProduitChadFormGroup();

        const stockProduit = service.getStockProduitChad(formGroup) as any;

        expect(stockProduit).toMatchObject({});
      });

      it('should return IStockProduitChad', () => {
        const formGroup = service.createStockProduitChadFormGroup(sampleWithRequiredData);

        const stockProduit = service.getStockProduitChad(formGroup) as any;

        expect(stockProduit).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IStockProduitChad should not enable id FormControl', () => {
        const formGroup = service.createStockProduitChadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewStockProduitChad should disable id FormControl', () => {
        const formGroup = service.createStockProduitChadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
