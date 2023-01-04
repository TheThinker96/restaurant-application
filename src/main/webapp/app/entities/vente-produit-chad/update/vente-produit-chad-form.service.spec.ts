import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../vente-produit-chad.test-samples';

import { VenteProduitChadFormService } from './vente-produit-chad-form.service';

describe('VenteProduitChad Form Service', () => {
  let service: VenteProduitChadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VenteProduitChadFormService);
  });

  describe('Service methods', () => {
    describe('createVenteProduitChadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createVenteProduitChadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quantite: expect.any(Object),
            prix: expect.any(Object),
            dateVente: expect.any(Object),
            statut: expect.any(Object),
            produit: expect.any(Object),
            stockProduit: expect.any(Object),
            userAccount: expect.any(Object),
          })
        );
      });

      it('passing IVenteProduitChad should create a new form with FormGroup', () => {
        const formGroup = service.createVenteProduitChadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quantite: expect.any(Object),
            prix: expect.any(Object),
            dateVente: expect.any(Object),
            statut: expect.any(Object),
            produit: expect.any(Object),
            stockProduit: expect.any(Object),
            userAccount: expect.any(Object),
          })
        );
      });
    });

    describe('getVenteProduitChad', () => {
      it('should return NewVenteProduitChad for default VenteProduitChad initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createVenteProduitChadFormGroup(sampleWithNewData);

        const venteProduit = service.getVenteProduitChad(formGroup) as any;

        expect(venteProduit).toMatchObject(sampleWithNewData);
      });

      it('should return NewVenteProduitChad for empty VenteProduitChad initial value', () => {
        const formGroup = service.createVenteProduitChadFormGroup();

        const venteProduit = service.getVenteProduitChad(formGroup) as any;

        expect(venteProduit).toMatchObject({});
      });

      it('should return IVenteProduitChad', () => {
        const formGroup = service.createVenteProduitChadFormGroup(sampleWithRequiredData);

        const venteProduit = service.getVenteProduitChad(formGroup) as any;

        expect(venteProduit).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IVenteProduitChad should not enable id FormControl', () => {
        const formGroup = service.createVenteProduitChadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewVenteProduitChad should disable id FormControl', () => {
        const formGroup = service.createVenteProduitChadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
