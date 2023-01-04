import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICreditChad } from '../credit-chad.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../credit-chad.test-samples';

import { CreditChadService } from './credit-chad.service';

const requireRestSample: ICreditChad = {
  ...sampleWithRequiredData,
};

describe('CreditChad Service', () => {
  let service: CreditChadService;
  let httpMock: HttpTestingController;
  let expectedResult: ICreditChad | ICreditChad[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CreditChadService);
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

    it('should create a CreditChad', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const credit = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(credit).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CreditChad', () => {
      const credit = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(credit).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CreditChad', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CreditChad', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CreditChad', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCreditChadToCollectionIfMissing', () => {
      it('should add a CreditChad to an empty array', () => {
        const credit: ICreditChad = sampleWithRequiredData;
        expectedResult = service.addCreditChadToCollectionIfMissing([], credit);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(credit);
      });

      it('should not add a CreditChad to an array that contains it', () => {
        const credit: ICreditChad = sampleWithRequiredData;
        const creditCollection: ICreditChad[] = [
          {
            ...credit,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCreditChadToCollectionIfMissing(creditCollection, credit);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CreditChad to an array that doesn't contain it", () => {
        const credit: ICreditChad = sampleWithRequiredData;
        const creditCollection: ICreditChad[] = [sampleWithPartialData];
        expectedResult = service.addCreditChadToCollectionIfMissing(creditCollection, credit);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(credit);
      });

      it('should add only unique CreditChad to an array', () => {
        const creditArray: ICreditChad[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const creditCollection: ICreditChad[] = [sampleWithRequiredData];
        expectedResult = service.addCreditChadToCollectionIfMissing(creditCollection, ...creditArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const credit: ICreditChad = sampleWithRequiredData;
        const credit2: ICreditChad = sampleWithPartialData;
        expectedResult = service.addCreditChadToCollectionIfMissing([], credit, credit2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(credit);
        expect(expectedResult).toContain(credit2);
      });

      it('should accept null and undefined values', () => {
        const credit: ICreditChad = sampleWithRequiredData;
        expectedResult = service.addCreditChadToCollectionIfMissing([], null, credit, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(credit);
      });

      it('should return initial array if no CreditChad is added', () => {
        const creditCollection: ICreditChad[] = [sampleWithRequiredData];
        expectedResult = service.addCreditChadToCollectionIfMissing(creditCollection, undefined, null);
        expect(expectedResult).toEqual(creditCollection);
      });
    });

    describe('compareCreditChad', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCreditChad(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCreditChad(entity1, entity2);
        const compareResult2 = service.compareCreditChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCreditChad(entity1, entity2);
        const compareResult2 = service.compareCreditChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCreditChad(entity1, entity2);
        const compareResult2 = service.compareCreditChad(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
