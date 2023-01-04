import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUserAccountChad, NewUserAccountChad } from '../user-account-chad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUserAccountChad for edit and NewUserAccountChadFormGroupInput for create.
 */
type UserAccountChadFormGroupInput = IUserAccountChad | PartialWithRequiredKeyOf<NewUserAccountChad>;

type UserAccountChadFormDefaults = Pick<NewUserAccountChad, 'id'>;

type UserAccountChadFormGroupContent = {
  id: FormControl<IUserAccountChad['id'] | NewUserAccountChad['id']>;
  nom: FormControl<IUserAccountChad['nom']>;
  prenom: FormControl<IUserAccountChad['prenom']>;
  sexe: FormControl<IUserAccountChad['sexe']>;
  role: FormControl<IUserAccountChad['role']>;
  telephone: FormControl<IUserAccountChad['telephone']>;
  entreprise: FormControl<IUserAccountChad['entreprise']>;
  pointOfSale: FormControl<IUserAccountChad['pointOfSale']>;
};

export type UserAccountChadFormGroup = FormGroup<UserAccountChadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UserAccountChadFormService {
  createUserAccountChadFormGroup(userAccount: UserAccountChadFormGroupInput = { id: null }): UserAccountChadFormGroup {
    const userAccountRawValue = {
      ...this.getFormDefaults(),
      ...userAccount,
    };
    return new FormGroup<UserAccountChadFormGroupContent>({
      id: new FormControl(
        { value: userAccountRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nom: new FormControl(userAccountRawValue.nom, {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(60)],
      }),
      prenom: new FormControl(userAccountRawValue.prenom, {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(60)],
      }),
      sexe: new FormControl(userAccountRawValue.sexe),
      role: new FormControl(userAccountRawValue.role),
      telephone: new FormControl(userAccountRawValue.telephone, {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(30)],
      }),
      entreprise: new FormControl(userAccountRawValue.entreprise),
      pointOfSale: new FormControl(userAccountRawValue.pointOfSale),
    });
  }

  getUserAccountChad(form: UserAccountChadFormGroup): IUserAccountChad | NewUserAccountChad {
    return form.getRawValue() as IUserAccountChad | NewUserAccountChad;
  }

  resetForm(form: UserAccountChadFormGroup, userAccount: UserAccountChadFormGroupInput): void {
    const userAccountRawValue = { ...this.getFormDefaults(), ...userAccount };
    form.reset(
      {
        ...userAccountRawValue,
        id: { value: userAccountRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UserAccountChadFormDefaults {
    return {
      id: null,
    };
  }
}
