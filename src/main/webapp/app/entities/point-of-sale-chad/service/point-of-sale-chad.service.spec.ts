import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPointOfSaleChad } from '../point-of-sale-chad.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../point-of-sale-chad.test-samples';

import { PointOfSaleChadService } from './point-of-sale-chad.service';

const requireRestSample: IPointOfSaleChad = {
  ...sampleWithRequiredData,
};

describe('PointOfSaleChad Service', () => {
  let service: PointOfSaleChadService;
  let httpMock: HttpTestingController;
  let expectedResult: IPointOfSaleChad | IPointOfSaleChad[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PointOfSaleChadService);
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

    it('should create a PointOfSaleChad', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const pointOfSale = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(pointOfSale).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PointOfSaleChad', () => {
      const pointOfSale = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(pointOfSale).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PointOfSaleChad', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PointOfSaleChad', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PointOfSaleChad', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPointOfSaleChadToCollectionIfMissing', () => {
      it('should add a PointOfSaleChad to an empty array', () => {
        const pointOfSale: IPointOfSaleChad = sampleWithRequiredData;
        expectedResult = service.addPointOfSaleChadToCollectionIfMissing([], pointOfSale);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pointOfSale);
      });

      it('should not add a PointOfSaleChad to an array that contains it', () => {
        const pointOfSale: IPointOfSaleChad = sampleWithRequiredData;
        const pointOfSaleCollection: IPointOfSaleChad[] = [
          {
            ...pointOfSale,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPointOfSaleChadToCollectionIfMissing(pointOfSaleCollection, pointOfSale);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PointOfSaleChad to an array that doesn't contain it", () => {
        const pointOfSale: IPointOfSaleChad = sampleWithRequiredData;
        const pointOfSaleCollection: IPointOfSaleChad[] = [sampleWithPartialData];
        expectedResult = service.addPointOfSaleChadToCollectionIfMissing(pointOfSaleCollection, pointOfSale);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pointOfSale);
      });

      it('should add only unique PointOfSaleChad to an array', () => {
        const pointOfSaleArray: IPointOfSaleChad[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const pointOfSaleCollection: IPointOfSaleChad[] = [sampleWithRequiredData];
        expectedResult = service.addPointOfSaleChadToCollectionIfMissing(pointOfSaleCollection, ...pointOfSaleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const pointOfSale: IPointOfSaleChad = sampleWithRequiredData;
        const pointOfSale2: IPointOfSaleChad = sampleWithPartialData;
        expectedResult = service.addPointOfSaleChadToCollectionIfMissing([], pointOfSale, pointOfSale2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pointOfSale);
        expect(expectedResult).toContain(pointOfSale2);
      });

      it('should accept null and undefined values', () => {
        const pointOfSale: IPointOfSaleChad = sampleWithRequiredData;
        expectedResult = service.addPointOfSaleChadToCollectionIfMissing([], null, pointOfSale, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pointOfSale);
      });

      it('should return initial array if no PointOfSaleChad is added', () => {
        const pointOfSaleCollection: IPointOfSaleChad[] = [sampleWithRequiredData];
        expectedResult = service.addPointOfSaleChadToCollectionIfMissing(pointOfSaleCollection, undefined, null);
        expect(expectedResult).toEqual(pointOfSaleCollection);
      });
    });

    describe('comparePointOfSaleChad', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePointOfSaleChad(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePointOfSaleChad(entity1, entity2);
        const compareResult2 = service.comparePointOfSaleChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePointOfSaleChad(entity1, entity2);
        const compareResult2 = service.comparePointOfSaleChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePointOfSaleChad(entity1, entity2);
        const compareResult2 = service.comparePointOfSaleChad(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
