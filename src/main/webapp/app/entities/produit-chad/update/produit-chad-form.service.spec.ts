import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../produit-chad.test-samples';

import { ProduitChadFormService } from './produit-chad-form.service';

describe('ProduitChad Form Service', () => {
  let service: ProduitChadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitChadFormService);
  });

  describe('Service methods', () => {
    describe('createProduitChadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProduitChadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            price: expect.any(Object),
            section: expect.any(Object),
            entreprise: expect.any(Object),
          })
        );
      });

      it('passing IProduitChad should create a new form with FormGroup', () => {
        const formGroup = service.createProduitChadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            price: expect.any(Object),
            section: expect.any(Object),
            entreprise: expect.any(Object),
          })
        );
      });
    });

    describe('getProduitChad', () => {
      it('should return NewProduitChad for default ProduitChad initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createProduitChadFormGroup(sampleWithNewData);

        const produit = service.getProduitChad(formGroup) as any;

        expect(produit).toMatchObject(sampleWithNewData);
      });

      it('should return NewProduitChad for empty ProduitChad initial value', () => {
        const formGroup = service.createProduitChadFormGroup();

        const produit = service.getProduitChad(formGroup) as any;

        expect(produit).toMatchObject({});
      });

      it('should return IProduitChad', () => {
        const formGroup = service.createProduitChadFormGroup(sampleWithRequiredData);

        const produit = service.getProduitChad(formGroup) as any;

        expect(produit).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProduitChad should not enable id FormControl', () => {
        const formGroup = service.createProduitChadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProduitChad should disable id FormControl', () => {
        const formGroup = service.createProduitChadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
