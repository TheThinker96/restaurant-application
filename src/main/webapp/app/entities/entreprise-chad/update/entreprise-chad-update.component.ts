import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { EntrepriseChadFormService, EntrepriseChadFormGroup } from './entreprise-chad-form.service';
import { IEntrepriseChad } from '../entreprise-chad.model';
import { EntrepriseChadService } from '../service/entreprise-chad.service';
import { EntrepriseStatut } from 'app/entities/enumerations/entreprise-statut.model';

@Component({
  selector: 'jhi-entreprise-chad-update',
  templateUrl: './entreprise-chad-update.component.html',
})
export class EntrepriseChadUpdateComponent implements OnInit {
  isSaving = false;
  entreprise: IEntrepriseChad | null = null;
  entrepriseStatutValues = Object.keys(EntrepriseStatut);

  editForm: EntrepriseChadFormGroup = this.entrepriseFormService.createEntrepriseChadFormGroup();

  constructor(
    protected entrepriseService: EntrepriseChadService,
    protected entrepriseFormService: EntrepriseChadFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entreprise }) => {
      this.entreprise = entreprise;
      if (entreprise) {
        this.updateForm(entreprise);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entreprise = this.entrepriseFormService.getEntrepriseChad(this.editForm);
    if (entreprise.id !== null) {
      this.subscribeToSaveResponse(this.entrepriseService.update(entreprise));
    } else {
      this.subscribeToSaveResponse(this.entrepriseService.create(entreprise));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntrepriseChad>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(entreprise: IEntrepriseChad): void {
    this.entreprise = entreprise;
    this.entrepriseFormService.resetForm(this.editForm, entreprise);
  }
}
