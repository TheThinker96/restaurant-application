import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISectionChad, NewSectionChad } from '../section-chad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISectionChad for edit and NewSectionChadFormGroupInput for create.
 */
type SectionChadFormGroupInput = ISectionChad | PartialWithRequiredKeyOf<NewSectionChad>;

type SectionChadFormDefaults = Pick<NewSectionChad, 'id'>;

type SectionChadFormGroupContent = {
  id: FormControl<ISectionChad['id'] | NewSectionChad['id']>;
  name: FormControl<ISectionChad['name']>;
  statut: FormControl<ISectionChad['statut']>;
  entreprise: FormControl<ISectionChad['entreprise']>;
};

export type SectionChadFormGroup = FormGroup<SectionChadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SectionChadFormService {
  createSectionChadFormGroup(section: SectionChadFormGroupInput = { id: null }): SectionChadFormGroup {
    const sectionRawValue = {
      ...this.getFormDefaults(),
      ...section,
    };
    return new FormGroup<SectionChadFormGroupContent>({
      id: new FormControl(
        { value: sectionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(sectionRawValue.name, {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(60)],
      }),
      statut: new FormControl(sectionRawValue.statut),
      entreprise: new FormControl(sectionRawValue.entreprise),
    });
  }

  getSectionChad(form: SectionChadFormGroup): ISectionChad | NewSectionChad {
    return form.getRawValue() as ISectionChad | NewSectionChad;
  }

  resetForm(form: SectionChadFormGroup, section: SectionChadFormGroupInput): void {
    const sectionRawValue = { ...this.getFormDefaults(), ...section };
    form.reset(
      {
        ...sectionRawValue,
        id: { value: sectionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SectionChadFormDefaults {
    return {
      id: null,
    };
  }
}
