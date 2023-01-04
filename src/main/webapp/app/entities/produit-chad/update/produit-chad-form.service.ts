import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProduitChad, NewProduitChad } from '../produit-chad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProduitChad for edit and NewProduitChadFormGroupInput for create.
 */
type ProduitChadFormGroupInput = IProduitChad | PartialWithRequiredKeyOf<NewProduitChad>;

type ProduitChadFormDefaults = Pick<NewProduitChad, 'id'>;

type ProduitChadFormGroupContent = {
  id: FormControl<IProduitChad['id'] | NewProduitChad['id']>;
  name: FormControl<IProduitChad['name']>;
  price: FormControl<IProduitChad['price']>;
  section: FormControl<IProduitChad['section']>;
  entreprise: FormControl<IProduitChad['entreprise']>;
};

export type ProduitChadFormGroup = FormGroup<ProduitChadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProduitChadFormService {
  createProduitChadFormGroup(produit: ProduitChadFormGroupInput = { id: null }): ProduitChadFormGroup {
    const produitRawValue = {
      ...this.getFormDefaults(),
      ...produit,
    };
    return new FormGroup<ProduitChadFormGroupContent>({
      id: new FormControl(
        { value: produitRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(produitRawValue.name, {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(60)],
      }),
      price: new FormControl(produitRawValue.price, {
        validators: [Validators.required],
      }),
      section: new FormControl(produitRawValue.section),
      entreprise: new FormControl(produitRawValue.entreprise),
    });
  }

  getProduitChad(form: ProduitChadFormGroup): IProduitChad | NewProduitChad {
    return form.getRawValue() as IProduitChad | NewProduitChad;
  }

  resetForm(form: ProduitChadFormGroup, produit: ProduitChadFormGroupInput): void {
    const produitRawValue = { ...this.getFormDefaults(), ...produit };
    form.reset(
      {
        ...produitRawValue,
        id: { value: produitRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProduitChadFormDefaults {
    return {
      id: null,
    };
  }
}
