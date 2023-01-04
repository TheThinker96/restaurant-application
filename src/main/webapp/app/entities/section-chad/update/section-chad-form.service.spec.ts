import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../section-chad.test-samples';

import { SectionChadFormService } from './section-chad-form.service';

describe('SectionChad Form Service', () => {
  let service: SectionChadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionChadFormService);
  });

  describe('Service methods', () => {
    describe('createSectionChadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSectionChadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            statut: expect.any(Object),
            entreprise: expect.any(Object),
          })
        );
      });

      it('passing ISectionChad should create a new form with FormGroup', () => {
        const formGroup = service.createSectionChadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            statut: expect.any(Object),
            entreprise: expect.any(Object),
          })
        );
      });
    });

    describe('getSectionChad', () => {
      it('should return NewSectionChad for default SectionChad initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSectionChadFormGroup(sampleWithNewData);

        const section = service.getSectionChad(formGroup) as any;

        expect(section).toMatchObject(sampleWithNewData);
      });

      it('should return NewSectionChad for empty SectionChad initial value', () => {
        const formGroup = service.createSectionChadFormGroup();

        const section = service.getSectionChad(formGroup) as any;

        expect(section).toMatchObject({});
      });

      it('should return ISectionChad', () => {
        const formGroup = service.createSectionChadFormGroup(sampleWithRequiredData);

        const section = service.getSectionChad(formGroup) as any;

        expect(section).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISectionChad should not enable id FormControl', () => {
        const formGroup = service.createSectionChadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSectionChad should disable id FormControl', () => {
        const formGroup = service.createSectionChadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
