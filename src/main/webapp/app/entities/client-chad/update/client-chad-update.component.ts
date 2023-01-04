import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ClientChadFormService, ClientChadFormGroup } from './client-chad-form.service';
import { IClientChad } from '../client-chad.model';
import { ClientChadService } from '../service/client-chad.service';
import { Sexe } from 'app/entities/enumerations/sexe.model';

@Component({
  selector: 'jhi-client-chad-update',
  templateUrl: './client-chad-update.component.html',
})
export class ClientChadUpdateComponent implements OnInit {
  isSaving = false;
  client: IClientChad | null = null;
  sexeValues = Object.keys(Sexe);

  editForm: ClientChadFormGroup = this.clientFormService.createClientChadFormGroup();

  constructor(
    protected clientService: ClientChadService,
    protected clientFormService: ClientChadFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ client }) => {
      this.client = client;
      if (client) {
        this.updateForm(client);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const client = this.clientFormService.getClientChad(this.editForm);
    if (client.id !== null) {
      this.subscribeToSaveResponse(this.clientService.update(client));
    } else {
      this.subscribeToSaveResponse(this.clientService.create(client));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClientChad>>): void {
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

  protected updateForm(client: IClientChad): void {
    this.client = client;
    this.clientFormService.resetForm(this.editForm, client);
  }
}
