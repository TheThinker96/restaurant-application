import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EntrepriseChadDetailComponent } from './entreprise-chad-detail.component';

describe('EntrepriseChad Management Detail Component', () => {
  let comp: EntrepriseChadDetailComponent;
  let fixture: ComponentFixture<EntrepriseChadDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntrepriseChadDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ entreprise: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EntrepriseChadDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EntrepriseChadDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load entreprise on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.entreprise).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
