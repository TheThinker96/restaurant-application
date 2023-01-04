import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPointOfSaleChad, NewPointOfSaleChad } from '../point-of-sale-chad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPointOfSaleChad for edit and NewPointOfSaleChadFormGroupInput for create.
 */
type PointOfSaleChadFormGroupInput = IPointOfSaleChad | PartialWithRequiredKeyOf<NewPointOfSaleChad>;

type PointOfSaleChadFormDefaults = Pick<NewPointOfSaleChad, 'id'>;

type PointOfSaleChadFormGroupContent = {
  id: FormControl<IPointOfSaleChad['id'] | NewPointOfSaleChad['id']>;
  name: FormControl<IPointOfSaleChad['name']>;
  responsable: FormControl<IPointOfSaleChad['responsable']>;
  adresse: FormControl<IPointOfSaleChad['adresse']>;
  entreprise: FormControl<IPointOfSaleChad['entreprise']>;
};

export type PointOfSaleChadFormGroup = FormGroup<PointOfSaleChadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PointOfSaleChadFormService {
  createPointOfSaleChadFormGroup(pointOfSale: PointOfSaleChadFormGroupInput = { id: null }): PointOfSaleChadFormGroup {
    const pointOfSaleRawValue = {
      ...this.getFormDefaults(),
      ...pointOfSale,
    };
    return new FormGroup<PointOfSaleChadFormGroupContent>({
      id: new FormControl(
        { value: pointOfSaleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(pointOfSaleRawValue.name, {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(60)],
      }),
      responsable: new FormControl(pointOfSaleRawValue.responsable, {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(60)],
      }),
      adresse: new FormControl(pointOfSaleRawValue.adresse, {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(60)],
      }),
      entreprise: new FormControl(pointOfSaleRawValue.entreprise),
    });
  }

  getPointOfSaleChad(form: PointOfSaleChadFormGroup): IPointOfSaleChad | NewPointOfSaleChad {
    return form.getRawValue() as IPointOfSaleChad | NewPointOfSaleChad;
  }

  resetForm(form: PointOfSaleChadFormGroup, pointOfSale: PointOfSaleChadFormGroupInput): void {
    const pointOfSaleRawValue = { ...this.getFormDefaults(), ...pointOfSale };
    form.reset(
      {
        ...pointOfSaleRawValue,
        id: { value: pointOfSaleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PointOfSaleChadFormDefaults {
    return {
      id: null,
    };
  }
}
