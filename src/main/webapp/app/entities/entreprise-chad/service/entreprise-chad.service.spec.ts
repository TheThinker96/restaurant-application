import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEntrepriseChad } from '../entreprise-chad.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../entreprise-chad.test-samples';

import { EntrepriseChadService } from './entreprise-chad.service';

const requireRestSample: IEntrepriseChad = {
  ...sampleWithRequiredData,
};

describe('EntrepriseChad Service', () => {
  let service: EntrepriseChadService;
  let httpMock: HttpTestingController;
  let expectedResult: IEntrepriseChad | IEntrepriseChad[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EntrepriseChadService);
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

    it('should create a EntrepriseChad', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const entreprise = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(entreprise).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EntrepriseChad', () => {
      const entreprise = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(entreprise).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EntrepriseChad', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EntrepriseChad', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EntrepriseChad', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEntrepriseChadToCollectionIfMissing', () => {
      it('should add a EntrepriseChad to an empty array', () => {
        const entreprise: IEntrepriseChad = sampleWithRequiredData;
        expectedResult = service.addEntrepriseChadToCollectionIfMissing([], entreprise);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entreprise);
      });

      it('should not add a EntrepriseChad to an array that contains it', () => {
        const entreprise: IEntrepriseChad = sampleWithRequiredData;
        const entrepriseCollection: IEntrepriseChad[] = [
          {
            ...entreprise,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEntrepriseChadToCollectionIfMissing(entrepriseCollection, entreprise);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EntrepriseChad to an array that doesn't contain it", () => {
        const entreprise: IEntrepriseChad = sampleWithRequiredData;
        const entrepriseCollection: IEntrepriseChad[] = [sampleWithPartialData];
        expectedResult = service.addEntrepriseChadToCollectionIfMissing(entrepriseCollection, entreprise);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entreprise);
      });

      it('should add only unique EntrepriseChad to an array', () => {
        const entrepriseArray: IEntrepriseChad[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const entrepriseCollection: IEntrepriseChad[] = [sampleWithRequiredData];
        expectedResult = service.addEntrepriseChadToCollectionIfMissing(entrepriseCollection, ...entrepriseArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const entreprise: IEntrepriseChad = sampleWithRequiredData;
        const entreprise2: IEntrepriseChad = sampleWithPartialData;
        expectedResult = service.addEntrepriseChadToCollectionIfMissing([], entreprise, entreprise2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entreprise);
        expect(expectedResult).toContain(entreprise2);
      });

      it('should accept null and undefined values', () => {
        const entreprise: IEntrepriseChad = sampleWithRequiredData;
        expectedResult = service.addEntrepriseChadToCollectionIfMissing([], null, entreprise, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entreprise);
      });

      it('should return initial array if no EntrepriseChad is added', () => {
        const entrepriseCollection: IEntrepriseChad[] = [sampleWithRequiredData];
        expectedResult = service.addEntrepriseChadToCollectionIfMissing(entrepriseCollection, undefined, null);
        expect(expectedResult).toEqual(entrepriseCollection);
      });
    });

    describe('compareEntrepriseChad', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEntrepriseChad(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEntrepriseChad(entity1, entity2);
        const compareResult2 = service.compareEntrepriseChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEntrepriseChad(entity1, entity2);
        const compareResult2 = service.compareEntrepriseChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEntrepriseChad(entity1, entity2);
        const compareResult2 = service.compareEntrepriseChad(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
