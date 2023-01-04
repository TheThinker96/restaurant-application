import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../client-chad.test-samples';

import { ClientChadFormService } from './client-chad-form.service';

describe('ClientChad Form Service', () => {
  let service: ClientChadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientChadFormService);
  });

  describe('Service methods', () => {
    describe('createClientChadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createClientChadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nom: expect.any(Object),
            prenom: expect.any(Object),
            sexe: expect.any(Object),
            telephone: expect.any(Object),
          })
        );
      });

      it('passing IClientChad should create a new form with FormGroup', () => {
        const formGroup = service.createClientChadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nom: expect.any(Object),
            prenom: expect.any(Object),
            sexe: expect.any(Object),
            telephone: expect.any(Object),
          })
        );
      });
    });

    describe('getClientChad', () => {
      it('should return NewClientChad for default ClientChad initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createClientChadFormGroup(sampleWithNewData);

        const client = service.getClientChad(formGroup) as any;

        expect(client).toMatchObject(sampleWithNewData);
      });

      it('should return NewClientChad for empty ClientChad initial value', () => {
        const formGroup = service.createClientChadFormGroup();

        const client = service.getClientChad(formGroup) as any;

        expect(client).toMatchObject({});
      });

      it('should return IClientChad', () => {
        const formGroup = service.createClientChadFormGroup(sampleWithRequiredData);

        const client = service.getClientChad(formGroup) as any;

        expect(client).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IClientChad should not enable id FormControl', () => {
        const formGroup = service.createClientChadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewClientChad should disable id FormControl', () => {
        const formGroup = service.createClientChadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
