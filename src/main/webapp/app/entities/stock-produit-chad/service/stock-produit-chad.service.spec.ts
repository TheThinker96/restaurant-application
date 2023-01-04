import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IStockProduitChad } from '../stock-produit-chad.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../stock-produit-chad.test-samples';

import { StockProduitChadService, RestStockProduitChad } from './stock-produit-chad.service';

const requireRestSample: RestStockProduitChad = {
  ...sampleWithRequiredData,
  dateExpiration: sampleWithRequiredData.dateExpiration?.toJSON(),
};

describe('StockProduitChad Service', () => {
  let service: StockProduitChadService;
  let httpMock: HttpTestingController;
  let expectedResult: IStockProduitChad | IStockProduitChad[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(StockProduitChadService);
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

    it('should create a StockProduitChad', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const stockProduit = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(stockProduit).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a StockProduitChad', () => {
      const stockProduit = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(stockProduit).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a StockProduitChad', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of StockProduitChad', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a StockProduitChad', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addStockProduitChadToCollectionIfMissing', () => {
      it('should add a StockProduitChad to an empty array', () => {
        const stockProduit: IStockProduitChad = sampleWithRequiredData;
        expectedResult = service.addStockProduitChadToCollectionIfMissing([], stockProduit);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(stockProduit);
      });

      it('should not add a StockProduitChad to an array that contains it', () => {
        const stockProduit: IStockProduitChad = sampleWithRequiredData;
        const stockProduitCollection: IStockProduitChad[] = [
          {
            ...stockProduit,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addStockProduitChadToCollectionIfMissing(stockProduitCollection, stockProduit);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a StockProduitChad to an array that doesn't contain it", () => {
        const stockProduit: IStockProduitChad = sampleWithRequiredData;
        const stockProduitCollection: IStockProduitChad[] = [sampleWithPartialData];
        expectedResult = service.addStockProduitChadToCollectionIfMissing(stockProduitCollection, stockProduit);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(stockProduit);
      });

      it('should add only unique StockProduitChad to an array', () => {
        const stockProduitArray: IStockProduitChad[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const stockProduitCollection: IStockProduitChad[] = [sampleWithRequiredData];
        expectedResult = service.addStockProduitChadToCollectionIfMissing(stockProduitCollection, ...stockProduitArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const stockProduit: IStockProduitChad = sampleWithRequiredData;
        const stockProduit2: IStockProduitChad = sampleWithPartialData;
        expectedResult = service.addStockProduitChadToCollectionIfMissing([], stockProduit, stockProduit2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(stockProduit);
        expect(expectedResult).toContain(stockProduit2);
      });

      it('should accept null and undefined values', () => {
        const stockProduit: IStockProduitChad = sampleWithRequiredData;
        expectedResult = service.addStockProduitChadToCollectionIfMissing([], null, stockProduit, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(stockProduit);
      });

      it('should return initial array if no StockProduitChad is added', () => {
        const stockProduitCollection: IStockProduitChad[] = [sampleWithRequiredData];
        expectedResult = service.addStockProduitChadToCollectionIfMissing(stockProduitCollection, undefined, null);
        expect(expectedResult).toEqual(stockProduitCollection);
      });
    });

    describe('compareStockProduitChad', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareStockProduitChad(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareStockProduitChad(entity1, entity2);
        const compareResult2 = service.compareStockProduitChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareStockProduitChad(entity1, entity2);
        const compareResult2 = service.compareStockProduitChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareStockProduitChad(entity1, entity2);
        const compareResult2 = service.compareStockProduitChad(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
