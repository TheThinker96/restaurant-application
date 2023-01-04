import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../entreprise-chad.test-samples';

import { EntrepriseChadFormService } from './entreprise-chad-form.service';

describe('EntrepriseChad Form Service', () => {
  let service: EntrepriseChadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrepriseChadFormService);
  });

  describe('Service methods', () => {
    describe('createEntrepriseChadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEntrepriseChadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            responsable: expect.any(Object),
            adresse: expect.any(Object),
            telephones: expect.any(Object),
            statut: expect.any(Object),
          })
        );
      });

      it('passing IEntrepriseChad should create a new form with FormGroup', () => {
        const formGroup = service.createEntrepriseChadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            responsable: expect.any(Object),
            adresse: expect.any(Object),
            telephones: expect.any(Object),
            statut: expect.any(Object),
          })
        );
      });
    });

    describe('getEntrepriseChad', () => {
      it('should return NewEntrepriseChad for default EntrepriseChad initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEntrepriseChadFormGroup(sampleWithNewData);

        const entreprise = service.getEntrepriseChad(formGroup) as any;

        expect(entreprise).toMatchObject(sampleWithNewData);
      });

      it('should return NewEntrepriseChad for empty EntrepriseChad initial value', () => {
        const formGroup = service.createEntrepriseChadFormGroup();

        const entreprise = service.getEntrepriseChad(formGroup) as any;

        expect(entreprise).toMatchObject({});
      });

      it('should return IEntrepriseChad', () => {
        const formGroup = service.createEntrepriseChadFormGroup(sampleWithRequiredData);

        const entreprise = service.getEntrepriseChad(formGroup) as any;

        expect(entreprise).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEntrepriseChad should not enable id FormControl', () => {
        const formGroup = service.createEntrepriseChadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEntrepriseChad should disable id FormControl', () => {
        const formGroup = service.createEntrepriseChadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
