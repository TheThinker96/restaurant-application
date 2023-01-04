import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserAccountChadDetailComponent } from './user-account-chad-detail.component';

describe('UserAccountChad Management Detail Component', () => {
  let comp: UserAccountChadDetailComponent;
  let fixture: ComponentFixture<UserAccountChadDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAccountChadDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ userAccount: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(UserAccountChadDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(UserAccountChadDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load userAccount on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.userAccount).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
