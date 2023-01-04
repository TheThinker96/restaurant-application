import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VenteProduitChadDetailComponent } from './vente-produit-chad-detail.component';

describe('VenteProduitChad Management Detail Component', () => {
  let comp: VenteProduitChadDetailComponent;
  let fixture: ComponentFixture<VenteProduitChadDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenteProduitChadDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ venteProduit: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(VenteProduitChadDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(VenteProduitChadDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load venteProduit on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.venteProduit).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
