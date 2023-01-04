import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../user-account-chad.test-samples';

import { UserAccountChadFormService } from './user-account-chad-form.service';

describe('UserAccountChad Form Service', () => {
  let service: UserAccountChadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAccountChadFormService);
  });

  describe('Service methods', () => {
    describe('createUserAccountChadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUserAccountChadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nom: expect.any(Object),
            prenom: expect.any(Object),
            sexe: expect.any(Object),
            role: expect.any(Object),
            telephone: expect.any(Object),
            entreprise: expect.any(Object),
            pointOfSale: expect.any(Object),
          })
        );
      });

      it('passing IUserAccountChad should create a new form with FormGroup', () => {
        const formGroup = service.createUserAccountChadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nom: expect.any(Object),
            prenom: expect.any(Object),
            sexe: expect.any(Object),
            role: expect.any(Object),
            telephone: expect.any(Object),
            entreprise: expect.any(Object),
            pointOfSale: expect.any(Object),
          })
        );
      });
    });

    describe('getUserAccountChad', () => {
      it('should return NewUserAccountChad for default UserAccountChad initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUserAccountChadFormGroup(sampleWithNewData);

        const userAccount = service.getUserAccountChad(formGroup) as any;

        expect(userAccount).toMatchObject(sampleWithNewData);
      });

      it('should return NewUserAccountChad for empty UserAccountChad initial value', () => {
        const formGroup = service.createUserAccountChadFormGroup();

        const userAccount = service.getUserAccountChad(formGroup) as any;

        expect(userAccount).toMatchObject({});
      });

      it('should return IUserAccountChad', () => {
        const formGroup = service.createUserAccountChadFormGroup(sampleWithRequiredData);

        const userAccount = service.getUserAccountChad(formGroup) as any;

        expect(userAccount).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUserAccountChad should not enable id FormControl', () => {
        const formGroup = service.createUserAccountChadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUserAccountChad should disable id FormControl', () => {
        const formGroup = service.createUserAccountChadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
