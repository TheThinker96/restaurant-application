import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISectionChad } from '../section-chad.model';

@Component({
  selector: 'jhi-section-chad-detail',
  templateUrl: './section-chad-detail.component.html',
})
export class SectionChadDetailComponent implements OnInit {
  section: ISectionChad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ section }) => {
      this.section = section;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
