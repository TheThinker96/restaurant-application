import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISectionChad } from '../section-chad.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../section-chad.test-samples';

import { SectionChadService } from './section-chad.service';

const requireRestSample: ISectionChad = {
  ...sampleWithRequiredData,
};

describe('SectionChad Service', () => {
  let service: SectionChadService;
  let httpMock: HttpTestingController;
  let expectedResult: ISectionChad | ISectionChad[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SectionChadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a SectionChad', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const section = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(section).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SectionChad', () => {
      const section = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(section).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SectionChad', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SectionChad', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SectionChad', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSectionChadToCollectionIfMissing', () => {
      it('should add a SectionChad to an empty array', () => {
        const section: ISectionChad = sampleWithRequiredData;
        expectedResult = service.addSectionChadToCollectionIfMissing([], section);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(section);
      });

      it('should not add a SectionChad to an array that contains it', () => {
        const section: ISectionChad = sampleWithRequiredData;
        const sectionCollection: ISectionChad[] = [
          {
            ...section,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSectionChadToCollectionIfMissing(sectionCollection, section);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SectionChad to an array that doesn't contain it", () => {
        const section: ISectionChad = sampleWithRequiredData;
        const sectionCollection: ISectionChad[] = [sampleWithPartialData];
        expectedResult = service.addSectionChadToCollectionIfMissing(sectionCollection, section);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(section);
      });

      it('should add only unique SectionChad to an array', () => {
        const sectionArray: ISectionChad[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const sectionCollection: ISectionChad[] = [sampleWithRequiredData];
        expectedResult = service.addSectionChadToCollectionIfMissing(sectionCollection, ...sectionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const section: ISectionChad = sampleWithRequiredData;
        const section2: ISectionChad = sampleWithPartialData;
        expectedResult = service.addSectionChadToCollectionIfMissing([], section, section2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(section);
        expect(expectedResult).toContain(section2);
      });

      it('should accept null and undefined values', () => {
        const section: ISectionChad = sampleWithRequiredData;
        expectedResult = service.addSectionChadToCollectionIfMissing([], null, section, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(section);
      });

      it('should return initial array if no SectionChad is added', () => {
        const sectionCollection: ISectionChad[] = [sampleWithRequiredData];
        expectedResult = service.addSectionChadToCollectionIfMissing(sectionCollection, undefined, null);
        expect(expectedResult).toEqual(sectionCollection);
      });
    });

    describe('compareSectionChad', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSectionChad(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSectionChad(entity1, entity2);
        const compareResult2 = service.compareSectionChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSectionChad(entity1, entity2);
        const compareResult2 = service.compareSectionChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSectionChad(entity1, entity2);
        const compareResult2 = service.compareSectionChad(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
