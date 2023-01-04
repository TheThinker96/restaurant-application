import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEntrepriseChad, NewEntrepriseChad } from '../entreprise-chad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEntrepriseChad for edit and NewEntrepriseChadFormGroupInput for create.
 */
type EntrepriseChadFormGroupInput = IEntrepriseChad | PartialWithRequiredKeyOf<NewEntrepriseChad>;

type EntrepriseChadFormDefaults = Pick<NewEntrepriseChad, 'id'>;

type EntrepriseChadFormGroupContent = {
  id: FormControl<IEntrepriseChad['id'] | NewEntrepriseChad['id']>;
  name: FormControl<IEntrepriseChad['name']>;
  responsable: FormControl<IEntrepriseChad['responsable']>;
  adresse: FormControl<IEntrepriseChad['adresse']>;
  telephones: FormControl<IEntrepriseChad['telephones']>;
  statut: FormControl<IEntrepriseChad['statut']>;
};

export type EntrepriseChadFormGroup = FormGroup<EntrepriseChadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EntrepriseChadFormService {
  createEntrepriseChadFormGroup(entreprise: EntrepriseChadFormGroupInput = { id: null }): EntrepriseChadFormGroup {
    const entrepriseRawValue = {
      ...this.getFormDefaults(),
      ...entreprise,
    };
    return new FormGroup<EntrepriseChadFormGroupContent>({
      id: new FormControl(
        { value: entrepriseRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(entrepriseRawValue.name, {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(60)],
      }),
      responsable: new FormControl(entrepriseRawValue.responsable, {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(60)],
      }),
      adresse: new FormControl(entrepriseRawValue.adresse, {
        validators: [Validators.minLength(4), Validators.maxLength(120)],
      }),
      telephones: new FormControl(entrepriseRawValue.telephones, {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(60)],
      }),
      statut: new FormControl(entrepriseRawValue.statut),
    });
  }

  getEntrepriseChad(form: EntrepriseChadFormGroup): IEntrepriseChad | NewEntrepriseChad {
    return form.getRawValue() as IEntrepriseChad | NewEntrepriseChad;
  }

  resetForm(form: EntrepriseChadFormGroup, entreprise: EntrepriseChadFormGroupInput): void {
    const entrepriseRawValue = { ...this.getFormDefaults(), ...entreprise };
    form.reset(
      {
        ...entrepriseRawValue,
        id: { value: entrepriseRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EntrepriseChadFormDefaults {
    return {
      id: null,
    };
  }
}
