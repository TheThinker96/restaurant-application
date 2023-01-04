import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClientChad } from '../client-chad.model';

@Component({
  selector: 'jhi-client-chad-detail',
  templateUrl: './client-chad-detail.component.html',
})
export class ClientChadDetailComponent implements OnInit {
  client: IClientChad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ client }) => {
      this.client = client;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
