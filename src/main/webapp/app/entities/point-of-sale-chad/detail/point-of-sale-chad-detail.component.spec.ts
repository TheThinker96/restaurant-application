import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PointOfSaleChadDetailComponent } from './point-of-sale-chad-detail.component';

describe('PointOfSaleChad Management Detail Component', () => {
  let comp: PointOfSaleChadDetailComponent;
  let fixture: ComponentFixture<PointOfSaleChadDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointOfSaleChadDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ pointOfSale: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PointOfSaleChadDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PointOfSaleChadDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load pointOfSale on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.pointOfSale).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
