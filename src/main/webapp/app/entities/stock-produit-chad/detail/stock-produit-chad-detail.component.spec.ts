import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockProduitChadDetailComponent } from './stock-produit-chad-detail.component';

describe('StockProduitChad Management Detail Component', () => {
  let comp: StockProduitChadDetailComponent;
  let fixture: ComponentFixture<StockProduitChadDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockProduitChadDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ stockProduit: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(StockProduitChadDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(StockProduitChadDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load stockProduit on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.stockProduit).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
