import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CreditChadDetailComponent } from './credit-chad-detail.component';

describe('CreditChad Management Detail Component', () => {
  let comp: CreditChadDetailComponent;
  let fixture: ComponentFixture<CreditChadDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditChadDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ credit: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CreditChadDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CreditChadDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load credit on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.credit).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
