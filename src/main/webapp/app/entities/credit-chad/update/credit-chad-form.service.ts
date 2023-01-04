import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICreditChad, NewCreditChad } from '../credit-chad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICreditChad for edit and NewCreditChadFormGroupInput for create.
 */
type CreditChadFormGroupInput = ICreditChad | PartialWithRequiredKeyOf<NewCreditChad>;

type CreditChadFormDefaults = Pick<NewCreditChad, 'id'>;

type CreditChadFormGroupContent = {
  id: FormControl<ICreditChad['id'] | NewCreditChad['id']>;
  solde: FormControl<ICreditChad['solde']>;
  type: FormControl<ICreditChad['type']>;
  statut: FormControl<ICreditChad['statut']>;
  userAccount: FormControl<ICreditChad['userAccount']>;
};

export type CreditChadFormGroup = FormGroup<CreditChadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CreditChadFormService {
  createCreditChadFormGroup(credit: CreditChadFormGroupInput = { id: null }): CreditChadFormGroup {
    const creditRawValue = {
      ...this.getFormDefaults(),
      ...credit,
    };
    return new FormGroup<CreditChadFormGroupContent>({
      id: new FormControl(
        { value: creditRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      solde: new FormControl(creditRawValue.solde),
      type: new FormControl(creditRawValue.type),
      statut: new FormControl(creditRawValue.statut),
      userAccount: new FormControl(creditRawValue.userAccount),
    });
  }

  getCreditChad(form: CreditChadFormGroup): ICreditChad | NewCreditChad {
    return form.getRawValue() as ICreditChad | NewCreditChad;
  }

  resetForm(form: CreditChadFormGroup, credit: CreditChadFormGroupInput): void {
    const creditRawValue = { ...this.getFormDefaults(), ...credit };
    form.reset(
      {
        ...creditRawValue,
        id: { value: creditRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CreditChadFormDefaults {
    return {
      id: null,
    };
  }
}
