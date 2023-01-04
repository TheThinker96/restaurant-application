import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProduitChadDetailComponent } from './produit-chad-detail.component';

describe('ProduitChad Management Detail Component', () => {
  let comp: ProduitChadDetailComponent;
  let fixture: ComponentFixture<ProduitChadDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitChadDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ produit: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ProduitChadDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ProduitChadDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load produit on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.produit).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
