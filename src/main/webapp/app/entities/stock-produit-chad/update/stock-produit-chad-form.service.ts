import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IStockProduitChad, NewStockProduitChad } from '../stock-produit-chad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStockProduitChad for edit and NewStockProduitChadFormGroupInput for create.
 */
type StockProduitChadFormGroupInput = IStockProduitChad | PartialWithRequiredKeyOf<NewStockProduitChad>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IStockProduitChad | NewStockProduitChad> = Omit<T, 'dateExpiration'> & {
  dateExpiration?: string | null;
};

type StockProduitChadFormRawValue = FormValueOf<IStockProduitChad>;

type NewStockProduitChadFormRawValue = FormValueOf<NewStockProduitChad>;

type StockProduitChadFormDefaults = Pick<NewStockProduitChad, 'id' | 'dateExpiration'>;

type StockProduitChadFormGroupContent = {
  id: FormControl<StockProduitChadFormRawValue['id'] | NewStockProduitChad['id']>;
  name: FormControl<StockProduitChadFormRawValue['name']>;
  quantite: FormControl<StockProduitChadFormRawValue['quantite']>;
  dateExpiration: FormControl<StockProduitChadFormRawValue['dateExpiration']>;
  produit: FormControl<StockProduitChadFormRawValue['produit']>;
};

export type StockProduitChadFormGroup = FormGroup<StockProduitChadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StockProduitChadFormService {
  createStockProduitChadFormGroup(stockProduit: StockProduitChadFormGroupInput = { id: null }): StockProduitChadFormGroup {
    const stockProduitRawValue = this.convertStockProduitChadToStockProduitChadRawValue({
      ...this.getFormDefaults(),
      ...stockProduit,
    });
    return new FormGroup<StockProduitChadFormGroupContent>({
      id: new FormControl(
        { value: stockProduitRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(stockProduitRawValue.name),
      quantite: new FormControl(stockProduitRawValue.quantite),
      dateExpiration: new FormControl(stockProduitRawValue.dateExpiration),
      produit: new FormControl(stockProduitRawValue.produit),
    });
  }

  getStockProduitChad(form: StockProduitChadFormGroup): IStockProduitChad | NewStockProduitChad {
    return this.convertStockProduitChadRawValueToStockProduitChad(
      form.getRawValue() as StockProduitChadFormRawValue | NewStockProduitChadFormRawValue
    );
  }

  resetForm(form: StockProduitChadFormGroup, stockProduit: StockProduitChadFormGroupInput): void {
    const stockProduitRawValue = this.convertStockProduitChadToStockProduitChadRawValue({ ...this.getFormDefaults(), ...stockProduit });
    form.reset(
      {
        ...stockProduitRawValue,
        id: { value: stockProduitRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): StockProduitChadFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dateExpiration: currentTime,
    };
  }

  private convertStockProduitChadRawValueToStockProduitChad(
    rawStockProduitChad: StockProduitChadFormRawValue | NewStockProduitChadFormRawValue
  ): IStockProduitChad | NewStockProduitChad {
    return {
      ...rawStockProduitChad,
      dateExpiration: dayjs(rawStockProduitChad.dateExpiration, DATE_TIME_FORMAT),
    };
  }

  private convertStockProduitChadToStockProduitChadRawValue(
    stockProduit: IStockProduitChad | (Partial<NewStockProduitChad> & StockProduitChadFormDefaults)
  ): StockProduitChadFormRawValue | PartialWithRequiredKeyOf<NewStockProduitChadFormRawValue> {
    return {
      ...stockProduit,
      dateExpiration: stockProduit.dateExpiration ? stockProduit.dateExpiration.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
