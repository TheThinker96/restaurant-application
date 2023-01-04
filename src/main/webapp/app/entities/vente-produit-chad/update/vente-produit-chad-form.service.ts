import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IVenteProduitChad, NewVenteProduitChad } from '../vente-produit-chad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IVenteProduitChad for edit and NewVenteProduitChadFormGroupInput for create.
 */
type VenteProduitChadFormGroupInput = IVenteProduitChad | PartialWithRequiredKeyOf<NewVenteProduitChad>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IVenteProduitChad | NewVenteProduitChad> = Omit<T, 'dateVente'> & {
  dateVente?: string | null;
};

type VenteProduitChadFormRawValue = FormValueOf<IVenteProduitChad>;

type NewVenteProduitChadFormRawValue = FormValueOf<NewVenteProduitChad>;

type VenteProduitChadFormDefaults = Pick<NewVenteProduitChad, 'id' | 'dateVente'>;

type VenteProduitChadFormGroupContent = {
  id: FormControl<VenteProduitChadFormRawValue['id'] | NewVenteProduitChad['id']>;
  quantite: FormControl<VenteProduitChadFormRawValue['quantite']>;
  prix: FormControl<VenteProduitChadFormRawValue['prix']>;
  dateVente: FormControl<VenteProduitChadFormRawValue['dateVente']>;
  statut: FormControl<VenteProduitChadFormRawValue['statut']>;
  produit: FormControl<VenteProduitChadFormRawValue['produit']>;
  stockProduit: FormControl<VenteProduitChadFormRawValue['stockProduit']>;
  userAccount: FormControl<VenteProduitChadFormRawValue['userAccount']>;
};

export type VenteProduitChadFormGroup = FormGroup<VenteProduitChadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class VenteProduitChadFormService {
  createVenteProduitChadFormGroup(venteProduit: VenteProduitChadFormGroupInput = { id: null }): VenteProduitChadFormGroup {
    const venteProduitRawValue = this.convertVenteProduitChadToVenteProduitChadRawValue({
      ...this.getFormDefaults(),
      ...venteProduit,
    });
    return new FormGroup<VenteProduitChadFormGroupContent>({
      id: new FormControl(
        { value: venteProduitRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      quantite: new FormControl(venteProduitRawValue.quantite, {
        validators: [Validators.required],
      }),
      prix: new FormControl(venteProduitRawValue.prix, {
        validators: [Validators.required],
      }),
      dateVente: new FormControl(venteProduitRawValue.dateVente),
      statut: new FormControl(venteProduitRawValue.statut),
      produit: new FormControl(venteProduitRawValue.produit),
      stockProduit: new FormControl(venteProduitRawValue.stockProduit),
      userAccount: new FormControl(venteProduitRawValue.userAccount),
    });
  }

  getVenteProduitChad(form: VenteProduitChadFormGroup): IVenteProduitChad | NewVenteProduitChad {
    return this.convertVenteProduitChadRawValueToVenteProduitChad(
      form.getRawValue() as VenteProduitChadFormRawValue | NewVenteProduitChadFormRawValue
    );
  }

  resetForm(form: VenteProduitChadFormGroup, venteProduit: VenteProduitChadFormGroupInput): void {
    const venteProduitRawValue = this.convertVenteProduitChadToVenteProduitChadRawValue({ ...this.getFormDefaults(), ...venteProduit });
    form.reset(
      {
        ...venteProduitRawValue,
        id: { value: venteProduitRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): VenteProduitChadFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dateVente: currentTime,
    };
  }

  private convertVenteProduitChadRawValueToVenteProduitChad(
    rawVenteProduitChad: VenteProduitChadFormRawValue | NewVenteProduitChadFormRawValue
  ): IVenteProduitChad | NewVenteProduitChad {
    return {
      ...rawVenteProduitChad,
      dateVente: dayjs(rawVenteProduitChad.dateVente, DATE_TIME_FORMAT),
    };
  }

  private convertVenteProduitChadToVenteProduitChadRawValue(
    venteProduit: IVenteProduitChad | (Partial<NewVenteProduitChad> & VenteProduitChadFormDefaults)
  ): VenteProduitChadFormRawValue | PartialWithRequiredKeyOf<NewVenteProduitChadFormRawValue> {
    return {
      ...venteProduit,
      dateVente: venteProduit.dateVente ? venteProduit.dateVente.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
