import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IClientChad, NewClientChad } from '../client-chad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IClientChad for edit and NewClientChadFormGroupInput for create.
 */
type ClientChadFormGroupInput = IClientChad | PartialWithRequiredKeyOf<NewClientChad>;

type ClientChadFormDefaults = Pick<NewClientChad, 'id'>;

type ClientChadFormGroupContent = {
  id: FormControl<IClientChad['id'] | NewClientChad['id']>;
  nom: FormControl<IClientChad['nom']>;
  prenom: FormControl<IClientChad['prenom']>;
  sexe: FormControl<IClientChad['sexe']>;
  telephone: FormControl<IClientChad['telephone']>;
};

export type ClientChadFormGroup = FormGroup<ClientChadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ClientChadFormService {
  createClientChadFormGroup(client: ClientChadFormGroupInput = { id: null }): ClientChadFormGroup {
    const clientRawValue = {
      ...this.getFormDefaults(),
      ...client,
    };
    return new FormGroup<ClientChadFormGroupContent>({
      id: new FormControl(
        { value: clientRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nom: new FormControl(clientRawValue.nom, {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(60)],
      }),
      prenom: new FormControl(clientRawValue.prenom, {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(60)],
      }),
      sexe: new FormControl(clientRawValue.sexe),
      telephone: new FormControl(clientRawValue.telephone, {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(30)],
      }),
    });
  }

  getClientChad(form: ClientChadFormGroup): IClientChad | NewClientChad {
    return form.getRawValue() as IClientChad | NewClientChad;
  }

  resetForm(form: ClientChadFormGroup, client: ClientChadFormGroupInput): void {
    const clientRawValue = { ...this.getFormDefaults(), ...client };
    form.reset(
      {
        ...clientRawValue,
        id: { value: clientRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ClientChadFormDefaults {
    return {
      id: null,
    };
  }
}
