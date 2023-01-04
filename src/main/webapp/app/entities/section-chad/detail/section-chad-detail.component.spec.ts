import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SectionChadDetailComponent } from './section-chad-detail.component';

describe('SectionChad Management Detail Component', () => {
  let comp: SectionChadDetailComponent;
  let fixture: ComponentFixture<SectionChadDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionChadDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ section: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SectionChadDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SectionChadDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load section on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.section).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
