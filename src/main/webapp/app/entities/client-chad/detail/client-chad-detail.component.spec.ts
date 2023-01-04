import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ClientChadDetailComponent } from './client-chad-detail.component';

describe('ClientChad Management Detail Component', () => {
  let comp: ClientChadDetailComponent;
  let fixture: ComponentFixture<ClientChadDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientChadDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ client: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ClientChadDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ClientChadDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load client on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.client).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
